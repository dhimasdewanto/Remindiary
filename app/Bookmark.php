<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    // Table
    protected $table = 'bookmarks';
    public $primaryKey = 'id';
    public $timestamps = true;

    // Disable error when use string as id
    public $incrementing = false;
}
