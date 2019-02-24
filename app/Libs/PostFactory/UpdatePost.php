<?php

namespace App\Libs\PostFactory;

use Illuminate\Http\Request;
use App\Post;

class UpdatePost extends PostFactory
{
	/**
     * Update posts, format, and save
     *
     * @param Illuminate\Http\Request $request
     * @param $post_id
     */
    public static function save(Request $request, $post_id)
    {
        $post = Post::find($post_id);
        return self::savePost($post, $request);
    }
}
