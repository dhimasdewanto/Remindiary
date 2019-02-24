<?php

namespace App\Libs\PostNotification;

use Illuminate\Support\Facades\DB;
use App\Post;
use App\User;
use App\Follow;

class PostNotifDelete
{
    /**
     * Delete Notification from database table
     * 
     * @param App\Post $post
     * @return boolean
     */
    public static function delete(Post $post)
    {
        // if($post->remind_datetime == null)
        //     return false;

        self::deleteFollowNotification($post);
        self::deleteJob($post);
        return true;
    }

    /**
     * Delete notification from this user and the follower
     * 
     * @param Post $post
     */
    private static function deleteFollowNotification(Post $post)
    {
        $user = User::find($post->user_id);
        self::deleteNotification($user, $post);

        $follows = Follow::where('follow_id', $post->user_id)->get();
        foreach ($follows as $follow) {
            $user = User::find($follow->user_id);
            self::deleteNotification($user, $post);
        }
    }

    /**
     * Remove the specified notification from storage
     * 
     * @param User $user
     * @param Post $post
     */
    private static function deleteNotification(User $user, Post $post)
    {
        foreach ($user->notifications as $notification) 
        {
            if($notification->type == "App\Notifications\PostReminder")
                if($notification->data['post_id'] == $post->id)
                    $notification->delete();
        }
    }

    /**
     * Remove the specified job from storage
     * Job ----> Queue
     * 
     * @param Post $post
     */
    private static function deleteJob(Post $post)
    {
        $jobs = DB::table('jobs')->get();

        foreach($jobs as $job)
        {
            if(self::isFindString($post->id, $job->payload))
            {
                DB::table('jobs')->where('id', '=', $job->id)->delete();
            }
        }
    }

    /**
     * Check if text contain specific string
     * Note: !== is not typo (typographical error)
     * 
     * @param string $find
     * @param string $text
     * @return boolean
     */
    private static function isFindString(string $find, string $text)
    {
        if( strpos( $text, $find ) !== false )
            return true;
        return false;
    }
}
