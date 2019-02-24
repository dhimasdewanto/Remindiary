<?php

namespace App\Http\Controllers;

use App\Bookmark;
use App\Libs\Bookmarks\BookmarksSetter;
use Illuminate\Http\Request;

class BookmarkController extends Controller
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

    public function store($post_id)
    {
        if($this->isBookmark($post_id))
            return response()->json([
                'error' => 'user already bookmarked this post'
            ], 401);

        BookmarksSetter::store($post_id);

        return response()->json([
            'success' => 'bookmarked'
        ], 200);
    }

    public function destroy($post_id)
    {
        if(!$this->isBookmark($post_id))
            return response()->json([
                'error' => 'user did not bookmarked this post'
            ], 401);

        BookmarksSetter::destroy($post_id);

        return response()->json([
            'success' => 'bookmark deleted'
        ], 200);
    }

    private function isBookmark($post_id)
    {
        if(Bookmark::where('user_id', auth()->user()->id)
                ->where('post_id', $post_id)->first())
            return true;

        return false;
    }
}
