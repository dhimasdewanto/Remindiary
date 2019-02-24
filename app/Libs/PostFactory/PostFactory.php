<?php

namespace App\Libs\PostFactory;

use App\Libs\PostFactory\SetRemind;
use App\Post;
use Illuminate\Http\Request;

abstract class PostFactory
{
    /**
     * Insert input data to post
     * Save post to storage
     *
     * @param App\Post $post
     * @param Illuminate\Http\Request $request
     * @return App\Post $post
     */
	protected static function savePost(Post $post, Request $request)
    {
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->user_id = auth()->user()->id;
        $post->visibility = $request->input('visibility');
		$post = SetRemind::set($post, $request);

        return $post;
    }
}
