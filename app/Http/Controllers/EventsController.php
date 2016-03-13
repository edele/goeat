<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Comment;
use App\Event;
use App\Http\Requests;
use Validator;

class EventsController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::with('users', 'author', 'comments')->get();
        return $events;
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);

        return $event;
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

        $user->events()->attach($id, ['status' => 'attends']);

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
        $comment = new Comment($fields);
        $comment->author = $user->id;

        $event->comments()->save($comment);

        return $event->load('users', 'author', 'comments');
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
}
