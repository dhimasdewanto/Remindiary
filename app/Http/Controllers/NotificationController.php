<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Libs\Controllers\Language;
use App\User;
use App\Post;

class NotificationController extends Controller
{
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

    public function index()
    {
        $user = User::find(auth()->user()->id);
        // $user->unreadNotifications->markAsRead();
        
        $notifications = $user->notifications;
        $notifications = $this->getNotificationsWithFollower($notifications);
        $notifications = $this->getNotificationsWithPost($notifications);

        return response()->json([
            'notifications' => $notifications,
        ]);
    }

    public function destroy($notification_id)
    {
        $user = User::find(auth()->user()->id);

        foreach ($user->notifications as $notification) 
        {
            if($notification->id == $notification_id)
                $notification->delete();
        }

        return response()->json([
            'success' => 'notification has been deleted'
        ], 200);
    }

    private function getNotificationsWithFollower($notifications)
    {
        foreach ($notifications as $notification) 
        {
            if($notification->type == "App\Notifications\FollowUser")
            {
                $user_id = $notification->data['user_id'];
                $user = User::find($user_id);
                $notification->follower = $user;
            }
        }

        return $notifications;
    }

    private function getNotificationsWithPost($notifications)
    {
        foreach ($notifications as $notification) 
        {
            if($notification->type == "App\Notifications\PostReminder")
            {
                $post_id = $notification->data['post_id'];
                $post = Post::find($post_id);
                $notification->post = $post;
            }
        }

        return $notifications;
    }
}
