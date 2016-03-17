<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $visible = [
        'id', 'name'
    ];

    public function eventsAsAuthor()
    {
        return $this->hasMany('App\Event', 'author');
    }

    public function events()
    {
        return $this->belongsToMany('App\Event');
    }

    public function comments()
    {
        return $this->hasMany('App\Comments', 'author');
    }
}
