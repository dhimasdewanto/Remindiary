<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    // Table
    protected $table = 'follows';
    public $primaryKey = 'id';
    public $timestamps = true;

    // Disable error when use string as id
    public $incrementing = false;
}
