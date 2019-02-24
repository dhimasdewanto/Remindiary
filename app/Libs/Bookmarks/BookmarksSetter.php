<?php

namespace App\Libs\Bookmarks;

use App\Bookmark;
use Sujip\Guid\Guid;

class BookmarksSetter
{
    /**
     * Store post bookmark to database
     * 
     * @param $post_id
     * @return void
     */
    public static function store($post_id)
    {
        $bookmark = new Bookmark;
        $bookmark->id = (new Guid)->create();
        $bookmark->user_id = auth()->user()->id;
        $bookmark->post_id = $post_id;
        $bookmark->save();
    }

    public static function destroy($post_id)
    {
        $bookmark = Bookmark::where('user_id', auth()->user()->id)
                            ->where('post_id', $post_id);
        $bookmark->delete();
    }
}