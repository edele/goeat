<?php

Route::post('/api/start', ['uses' => 'UserController@start']);

Route::group(['prefix' => '/api', 'middleware' => ['auth']], function () {
    Route::get('account', ['uses' => 'UserController@account']);
    Route::put('account', ['uses' => 'UserController@update']);
    Route::resource('events', 'EventsController', ['only' => ['index', 'show', 'store', 'update']]);
    Route::post('events/{id}/attend', ['uses' => 'EventsController@attend']);
    Route::post('events/{id}/comment', ['uses' => 'EventsController@comment']);
});

Route::get('/{just?}/{wanna?}/{show?}/{front?}/{view?}/{whatever?}/{the?}/{fuck?}/{happens?}', function () {
    return view('welcome');
});
