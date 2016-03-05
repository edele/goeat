<?php

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => '/api'], function () {
    Route::resource('events', 'EventsController', ['only' => ['index', 'show', 'store', 'update']]);
});
