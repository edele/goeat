<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Event;

class EventsController extends Controller
{
    public function index()
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
        $event = new Event($fields);

        $event->save();

        return ['id' => $event->id];
    }

    public function update(Request $request, $id)
    {
        $fields = $request->all();
        $event = Event::findOrFail($id);

        $event->update($fields);

        return [];
    }
}
