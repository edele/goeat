<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Comment;
use App\Event;
use App\Http\Requests;
use App\User;
use DB;
use Mail;
use Validator;

class EventsController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::with('users', 'author', 'comments')->get();

        return $this->attachCommentAuthors($events);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);

        $event = $event->load('users', 'author', 'comments');

        return $this->attachSingleEventCommensAuthors($event);
    }

    public function store(Request $request)
    {
        $fields = $request->all();
        $validator = $this->createValidator($fields);

        if ($validator->fails()) {
          return response()->json([
            'message' => implode(' ', $validator->messages()->all())
          ], 422);
        }

        $user = $request->user;

        $event = new Event($fields);
        $user->eventsAsAuthor()->save($event);
        $user->events()->attach($event->id, ['status' => 'author']);

        return $event->load('users', 'author', 'comments');
    }

    public function update(Request $request, $id)
    {
        $fields = $request->all();
        $user = $request->user;
        $event = $user->events()->find($id);

        if (!$event) {
            return response()->json(['message' => trans('api.noAccess')], 403);
        } else {
            $event->update($fields);
        }

        // TODO: return current state
        return [];
    }

    public function attend(Request $request, $id)
    {
        $fields = $request->all();
        $user = $request->user;
        $event = Event::findOrFail($id);
        $author = User::findOrFail($event->author);

        $user->events()->attach($id, ['status' => 'attends']);

        Mail::send('emails.attendee',
            [
                'name' => $user->name,
                'time' => $event->happens_at,
                'event' => $event->title
            ],
            function ($m) use ($user, $author, $event) {
                $m->from($user->email, $user->name);
                $m->to($author->email, $author->email)
                ->subject("{$event->title}: {$user->name} присоединился");
            }
        );

        return [];
    }

    public function comment(Request $request, $id)
    {
        $fields = $request->all();
        $validator = $this->commentValidator($fields);

        if ($validator->fails()) {
          return response()->json([
            'message' => implode(' ', $validator->messages()->all())
          ], 422);
        }

        $user = $request->user;
        $event = Event::findOrFail($id);
        $eventAuthor = User::findOrFail($event->author);
        $comment = new Comment($fields);
        $comment->author = $user->id;

        $event->comments()->save($comment);

        if ($eventAuthor->id !== $user->id) {
            Mail::send('emails.comment',
                [
                    'name' => $user->name,
                    'event' => $event->title,
                    'comment' => str_replace("\n", '<br>', $comment->text)
                ],
                function ($m) use ($user, $eventAuthor, $event) {
                    $m->from($user->email, $user->name);
                    $m->to($eventAuthor->email, $eventAuthor->email)
                    ->subject("{$event->title}: новый комментарий");
                }
            );
        }

        $event = $event->load('users', 'author', 'comments');

        return $this->attachSingleEventCommensAuthors($event);
    }

    protected function createValidator(array $data)
    {
        return Validator::make($data, [
            'title' => 'max:255|required',
            'happens_at' => 'required|date|after:now'
        ]);
    }

    protected function commentValidator(array $data)
    {
        return Validator::make($data, [
            'text' => 'required'
        ]);
    }

    public function attachSingleEventCommensAuthors($event, $users=null)
    {
        if (!$users) {
            $users = collect(DB::table('users')->select('name', 'id')->get())->keyBy('id');
        }

        $event = $event->toArray();
        foreach ($event['comments'] as $key => $comment) {
            $event['comments'][$key]['author'] = $users[$comment['author']]->name;
        }

        return $event;
    }

    public function attachCommentAuthors($events)
    {
        $users = collect(DB::table('users')->select('name', 'id')->get())->keyBy('id');

        return $events->map(function($event) use ($users)
        {
            return $this->attachSingleEventCommensAuthors($event, $users);
        });
    }
}
