<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PinController extends Controller
{
    /**
     * Create a new controller instance.
     * Need auth user.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function pin($post_id)
    {
        $post = Post::find($post_id);

        if(!$this->checkUserId($post))
            return response()->json([
                'error' => 'this post does not belong to auth user id'
            ], 401);

        $post->pin = "pin";
        $post->save();

        return response()->json([
            'success' => 'success to pin this post',
            'pin' => $post->pin
        ], 200);
    }

    public function unpin($post_id)
    {
        $post = Post::find($post_id);

        if(!$this->checkUserId($post))
            return response()->json([
                'error' => 'this post does not belong to auth user id'
            ], 401);

        $post->pin = null;
        $post->save();

        return response()->json([
            'success' => 'success to unpin this post'
        ], 200);
    }

    public function checkPin($post_id)
    {
        return Post::find($post_id)->pin;
    }

    private function checkUserId(Post $post)
    {
        if($post->user_id == auth()->user()->id)
            return true;
        return false;
    }
}
