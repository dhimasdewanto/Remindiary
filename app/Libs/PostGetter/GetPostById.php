<?php

namespace App\Libs\PostGetter;

use App\Libs\Bookmarks\BookmarksGetter;

class GetPostById
{
    /**
     * Get post by post id
     * 
     * @param uuid $post_id
     * @return $post->first()
     */
    public static function get($post_id)
    {
        $getPost = new GetPostBuilder;
        $getPost->selectDefault();
        $getPost->wherePostId($post_id);
        $getPost->order();
        $post = $getPost->getPostsFirst();
        return $post;
    }
}