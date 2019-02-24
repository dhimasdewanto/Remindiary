<?php

namespace App\Http\Controllers;

use App\Libs\Bookmarks\BookmarksGetter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Libs\GetUserIdForGuest\GetUserId;
use App\Libs\PostGetter\GetPostBuilder;
use App\Post;
use App\User;

class SearchController extends Controller
{
    /**
     * Can't use paginate
     */
    private $limit = 10;

    public function users(Request $request)
    {
        $users = User::where('name', 'LIKE', '%'.$request->search.'%')->limit($this->limit);
        return response()->json([
            'users' => $users->get()
        ]);
    }

    public function posts(Request $request)
    {
        $getPost = new GetPostBuilder;
        $getPost->joinFollow();
        $getPost->selectDefault();

        $user_id = GetUserId::get();
        $getPost->whereRaw('title LIKE "%'.$request->search.'%" AND 
                        (visibility="public" OR posts.user_id="'.$user_id.'")');

        $getPost->orderBy('posts.updated_at', 'desc');

        $getPost->limit($this->limit);

        $posts = $getPost->getPostsAll();
        return response()->json([
            'posts' => $posts
        ]);
    }
}
