<?php

Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/start', ['uses' => 'UserController@start']);

Route::group(['prefix' => '/api', 'middleware' => ['auth']], function () {
    Route::get('account', ['uses' => 'UserController@account']);
    Route::resource('events', 'EventsController', ['only' => ['index', 'show', 'store', 'update']]);
});
