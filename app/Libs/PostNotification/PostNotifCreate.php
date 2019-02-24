<?php

namespace App\Libs\PostNotification;

use App\Notifications\PostReminder;
use App\Post;
use App\User;
use App\Follow;

class PostNotifCreate
{
    /**
     * Create Post Reminder Notification
     * 
     * @param App\Post $post
     * @return void
     */
    public static function create(Post $post)
    {
        if(!self::validateRemindDate($post))
            return;

        self::notifyUser($post->user_id, $post);

        if($post->visibility == "public")
            self::notifyFollower($post);
    }

    /**
     * Notify follower of this post creator
     * 
     * @param App\Post $post
     * @return void
     */
    private static function notifyFollower(Post $post)
    {
        $follows = Follow::where('follow_id', $post->user_id)->get();
        
        foreach ($follows as $follow) {
            self::notifyUser($follow->user_id, $post);
        }
    }

    /**
     * Notify this post creator
     * Used again in notifyFollower
     * 
     * @param $user_id
     * @param App\Post $post
     * @return void
     */
    private static function notifyUser($user_id, Post $post)
    {
        $user = User::find($user_id);
        $user->notify(new PostReminder($post));
    }

    /**
     * Validate Post Remind Date
     * Return true if post remind date can create notification
     * 
     * @param Post $post
     * @return boolean
     */
    private static function validateRemindDate(Post $post)
    {
        if($post->remind_datetime == null)
            return false;

        $now = date("Y-m-d h:m:s");
        if($post->remind_datetime < $now)
            return false;

        return true;
    }
}
