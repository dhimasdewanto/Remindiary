<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Sujip\Guid\Guid;
use App\Notifications\FollowUser;
use App\User;
use App\Follow;

class FollowController extends Controller
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

    public function follow($user_id)
    {
        if($user_id == auth()->user()->id)
            return response()->json([
                'error' => 'same follow id'
            ], 401);
            

        if($this->isFollow($user_id))
            return response()->json([
                'error' => 'already followed'
            ], 401);

        $follow = new Follow;
        $follow->id = (new Guid)->create();
        $follow->user_id = auth()->user()->id;
        $follow->follow_id = $user_id;
        $follow->save();

        $this->createNotification($user_id);

        return response()->json([
            'success' => 'followed'
        ], 200);
    }

    public function unfollow($user_id)
    {
        $follow = Follow::where('user_id', auth()->user()->id)
                        ->where('follow_id', $user_id);

        if(!$this->isFollow($user_id))
            return response()->json([
                'error' => 'already not follow'
            ], 401);
        
        $follow->delete();

        $this->deleteNotification($user_id);

        return response()->json([
            'success' => 'unfollowed'
        ], 200);
    }

    private function isFollow($user_id)
    {
        if(Follow::where('user_id', auth()->user()->id)
                ->where('follow_id', $user_id)->first())
            return true;

        return false;
    }

    private function createNotification($user_id)
    {
        $user = User::find($user_id);
        $user->notify(new FollowUser);
    }

    private function deleteNotification($user_id)
    {
        $user = User::find($user_id);

        foreach ($user->notifications as $notification) 
        {
            if($notification->type == "App\Notifications\FollowUser")
                if($notification->data['user_id'] == auth()->user()->id)
                    $notification->delete();
        }
    }
}
