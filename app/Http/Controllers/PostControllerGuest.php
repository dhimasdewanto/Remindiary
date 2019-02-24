<?php

namespace App\Http\Controllers;

use App\Libs\Bookmarks\BookmarksGetter;
use App\Libs\GetUserIdForGuest\GetUserId;
use App\Libs\PostGetter\GetPostBuilder;
use App\Libs\PostGetter\GetPostById;
use Illuminate\Http\Request;

use App\Bookmark;

class PostControllerGuest extends Controller
{
    private $paginate = 10;
    
    /**
     * Index Post at Profile Page
     * 
     * @param uuid $user_id
     * @return json posts
     */
    public function indexProfile($user_id)
    {
        $getPost = new GetPostBuilder;
        $getPost->selectDefault();
        $getPost->whereUserId($user_id);
        $getPost->order();

        if(!$this->isMyPosts($user_id))
            $getPost->whereVisibility("public");

        $posts = $getPost->getPostsPaginate($this->paginate);
        return response()->json([
            'posts' => $posts
        ]);
    }

    /**
     * Display the specified post.
     *
     * @param   uuid    $post_id
     * @return  json    post
     */
    public function show($post_id)
    {
        $post = GetPostById::get($post_id);

        if($this->isPostInvisible($post))
            return response()->json([
                'error' => "This post ain't yours"
            ], 401);

        return response()->json([
            'post' => $post
        ]);
    }

    /**
     * Check if private post is not belong to others
     * 
     * @param $post
     * @return boolean
     */
    private function isPostInvisible($post)
    {
        $auth_id = GetUserId::get();

        if($post->user_id != $auth_id &&
        $post->visibility == 'private')
            return true;

        return false;
    }

    /**
     * Check if GetUserId::get() == $user_id
     * 
     * @param uuid $user_id
     * @return boolean
     */
    private function isMyPosts($user_id)
    {
        $auth_id = GetUserId::get();
        return $user_id == $auth_id;
    }
}
