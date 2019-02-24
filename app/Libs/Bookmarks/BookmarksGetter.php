<?php

namespace App\Libs\Bookmarks;

use App\Bookmark;
use App\Libs\GetUserIdForGuest\GetUserId;

class BookmarksGetter
{
    /**
     * Add isBookmark to post->paginate()
     * 
     * @param $post->paginate()
     * @return $post->paginate()
     */
    public static function getBookmarkList($postPaginate)
    {
        foreach ($postPaginate as $postFirst) {
            $postFirst = self::getBookmark($postFirst);
        }

        return $postPaginate;
    }

    /**
     * Add isBookmark to post->first()
     * 
     * @param $post->first()
     * @return $post->first()
     */
    public static function getBookmark($postFirst)
    {
        $postFirst->isBookmark = self::isBookmark($postFirst);
        return $postFirst;
    }

    private static function isBookmark($postFirst)
    {
        $bookmarks = Bookmark::where('post_id', $postFirst->id)->get();

        // Purpose: Not Error
        if(!$bookmarks)
            return false;

        foreach ($bookmarks as $bookmark) {
            $user_id = GetUserId::get();

            if($bookmark->user_id == $user_id)
                return true;
        }

        return false;
    }
}