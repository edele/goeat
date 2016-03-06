<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
    	'title',
    	'happens_at'
    ];

    public function author()
    {
        return $this->belongsTo('App\User', 'author');
    }
}
