<?php

namespace App\Libs\PostGetter;

use App\Libs\Bookmarks\BookmarksGetter;
use Illuminate\Support\Facades\DB;

class GetPostBuilder
{
    private $posts;

    /**
     * Initiate posts table, join to users and bookmarks
     */
    public function __construct()
    {
        $this->posts = DB::table('posts')
                ->distinct()
                ->join('users', 'posts.user_id', '=', 'users.id')
                ->leftJoin('bookmarks', 'posts.id', '=', 'bookmarks.post_id');
    }



    public function getPostsFirst()
    {
        $post = $this->posts->first();
        $post = BookmarksGetter::getBookmark($post);
        return $post;
    }

    public function getPostsAll()
    {
        $posts = $this->posts->get();
        return $this->processPosts($posts);
    }

    public function getPostsPaginate($paginate) 
    {
        $posts = $this->posts->paginate($paginate);
        return $this->processPosts($posts);
    }

    private function processPosts($posts)
    {
        $posts = BookmarksGetter::getBookmarkList($posts);
        return $posts;
    }



    /**
     * Join $posts to follows table
     */
    public function joinFollow()
    {
        $this->posts = 
            $this->posts->leftJoin('follows', 'posts.user_id', '=', 'follows.follow_id');
    }



    /**
     * Select default column
     * posts.*, users.name, users.profile, etc
     */
    public function selectDefault()
    {
        $this->posts = 
            $this->posts->select(
                            'posts.*', 
                            'users.name', 
                            'users.profile_image'
                        );
    }
    


    /**
     * Where function for index controller
     */
    public function whereIndex()
    {
        $this->posts = 
            $this->posts->whereRaw("posts.user_id=?
                OR (follows.user_id=? AND users.id=follows.follow_id AND posts.visibility='public')", 
                [auth()->user()->id, auth()->user()->id]);
    }

    /**
     * Where function to get posts by specific creator
     * 
     * @param uuid $user_id
     */
    public function whereUserId($user_id)
    {
        $this->posts = 
            $this->posts->where('posts.user_id', '=', $user_id);
    }

    /**
     * Where function to show post details
     * 
     * @param uuid $post_id
     */
    public function wherePostId($post_id)
    {
        $this->posts = 
            $this->posts->where('posts.id', '=', $post_id);
    }

    /**
     * Where function to show bookmark from auth_user_id
     */
    public function whereMyBookmark()
    {
        $this->posts = 
            $this->posts->where('bookmarks.user_id', '=', auth()->user()->id);
    }

    /**
     * Where function to only show by visibility
     * 
     * @param String $visibility
     */
    public function whereVisibility($visibility)
    {
        $this->posts = 
            $this->posts->where('visibility', '=', $visibility);
    }

    /**
     * Where raw function for this builder
     * 
     * @param String $condition
     */
    public function whereRaw($condition)
    {
        $this->posts = 
            $this->posts->whereRaw($condition);
    }



    /**
     * Sort the posts order
     */
    public function order()
    {
        $this->posts = 
            $this->posts->orderBy('posts.pin', 'desc')
                ->orderBy('posts.updated_at', 'desc');
    }

    /**
     * Sort the posts by custom order
     * 
     * @param $column
     * @param $direction asc|desc
     */
    public function orderBy($column, $direction)
    {
        $this->posts = 
            $this->posts->orderBy($column, $direction);
    }



    /**
     * Use limit function
     */
    public function limit($limit)
    {
        $this->posts = 
            $this->posts->limit($limit);
    }
}