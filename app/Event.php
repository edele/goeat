<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
    	'title',
    	'happens_at'
    ];

    protected $visible = [
        'author',
        'comments',
        'users',
        'happens_at',
        'id',
        'title'
    ];

    public function author()
    {
        return $this->belongsTo('App\User', 'author');
    }

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
}
