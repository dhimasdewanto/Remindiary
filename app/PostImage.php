<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostImage extends Model
{
    protected $table = 'post_images';

    // UUID
    use HasBinaryUuid;
    public $incrementing = false;
    public function getKeyName()
    {
        return 'id';
    }
}
