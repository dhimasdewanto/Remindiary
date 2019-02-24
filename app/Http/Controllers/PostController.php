<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Libs\Bookmarks\BookmarksSetter;
use App\Libs\PostFactory\CreatePost;
use App\Libs\PostFactory\UpdatePost;
use App\Libs\PostGetter\GetPostBuilder;
use App\Libs\PostGetter\GetPostById;
use App\Libs\PostNotification\PostNotifCreate;
use App\Libs\PostNotification\PostNotifDelete;
use App\Post;
use App\User;
use App\Bookmark;

class PostController extends Controller
{
    private $paginate = 10;

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

    /**
     * Display a listing of the posts.
     *
     * @return json
     */
    public function index()
    {
        $getPost = new GetPostBuilder;
        $getPost->joinFollow();
        $getPost->selectDefault();
        $getPost->whereIndex();
        $getPost->order();

        $posts = $getPost->getPostsPaginate($this->paginate);
        return response()->json([
            'posts' => $posts
        ]);
    }

    /**
     * Display a listing of the bookmarked posts.
     *
     * @return json
     */
    public function indexBookmarks()
    {
        $getPost = new GetPostBuilder;
        $getPost->selectDefault();
        $getPost->whereMyBookmark();
        $getPost->order();
        
        $posts = $getPost->getPostsPaginate($this->paginate);
        return response()->json([
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validatePost($request);

        $post = CreatePost::save($request);

        PostNotifCreate::create($post);

        $post = $this->pinUnpinPost($request, $post);

        $post->save();

        $this->addDeleteBookmark($request, $post);

        return response()->json([
            'success' => 'created',
            'post_id' => $post->id
        ], 201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  uuid  $post_id
     * @return json
     */
    public function edit($post_id)
    {
        $post = GetPostById::get($post_id);

        if($post->user_id != auth()->user()->id)
            return null;

        return response()->json([
            'post' => $post
        ]);
    }

    /**
     * Update the specified post in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  $post_id
     * @return json
     */
    public function update(Request $request, $post_id)
    {
        $this->validatePost($request);

        $post = Post::find($post_id);

        if($post->user_id != auth()->user()->id)
            return response()->json(
                ['error' => 'unauthorized']
            , 401);

        $post = UpdatePost::save($request, $post_id);

        PostNotifDelete::delete($post);
        PostNotifCreate::create($post);

        $post = $this->pinUnpinPost($request, $post);
        
        $post->save();

        $this->addDeleteBookmark($request, $post);

        return response()->json([
            'success' => 'updated',
            'post_id' => $post->id
        ], 201);
    }

    /**
     * Remove the specified post from storage.
     *
     * @param  int  $id
     * @return json
     */
    public function destroy($post_id)
    {
        $post = Post::find($post_id);

        if($post->user_id != auth()->user()->id)
            return response()->json(
                ['error' => 'unauthorized']
            , 401);

        PostNotifDelete::delete($post);
        BookmarksSetter::destroy($post->id);

        $post->delete();

        return response()->json(
            ['success' => 'deleted']
        , 201);
    }

    /**
     * Pin post if isPinned == true
     * Unpin post if isPinned == false
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param App\Post $post
     * @return App\Post $post
     */
    private function pinUnpinPost(Request $request, Post $post)
    {
        if($request->isPinned)
            $post->pin = "pin";
        else
            $post->pin = null;
        
        return $post;
    }

    /**
     * Bookmark post if isBookmark == true
     * Remove Bookmark post if isBookmark == false
     * NOTE: Set this after save post
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param App\Post $post
     * @return void
     */
    private function addDeleteBookmark(Request $request, Post $post)
    {
        if($request->isBookmark)
            BookmarksSetter::store($post->id);
        else
            BookmarksSetter::destroy($post->id);
    }

    /**
     * Validate post data with Laravel Validation
     * 
     * @param  \Illuminate\Http\Request  $request
     */
    private function validatePost(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|min:3|max:200'
            , 'post_image' => 'image|nullable|max:1999'
        ]);
    }
}
