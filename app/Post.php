<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    // Table
    protected $table = 'posts';
    public $primaryKey = 'id';
    public $timestamps = true;

    // Disable error when use string as id
    public $incrementing = false;

    public function user() {
    	return $this->belongsTo('App\User');
    }

    public function follows() {
        return $this->hasMany('App\Follow', 'follow_id', 'user_id');
    }
}
