<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Event;

class EventsController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::all();
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
        $user = $request->user;

        $event = new Event($fields);
        $user->events()->save($event);

        return ['id' => $event->id];
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

        return [];
    }
}
