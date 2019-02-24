<?php

namespace App\Libs\PostFactory;

use Illuminate\Http\Request;
use App\Post;
use Sujip\Guid\Guid;

class CreatePost extends PostFactory
{
	/**
     * Create posts, format, and save
     *
     * @param Illuminate\Http\Request $request
     */
	public static function save(Request $request)
    {
        $post = new Post;
		$post->id = (new Guid)->create();
        return self::savePost($post, $request);
    }
}
