<?php

namespace App\Http\Controllers;

use App\Follow;
use App\Libs\GetUserIdForGuest\GetUserId;
use App\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show($user_id)
    {
        $user = User::find($user_id);

        $follow = [
            'isFollow' => $this->isFollow($user_id),
            'followerCount' => $this->followerCount($user_id)
        ];

        return response()->json([
            'user' => $user,
            'follow' => $follow
        ]);
    }

    private function followerCount($user_id)
    {
        return Follow::where('follow_id', $user_id)->count();
    }

    private function isFollow($user_id)
    {
        $auth_id = GetUserId::get();

        if(Follow::where('user_id', $auth_id)
                ->where('follow_id', $user_id)->first())
            return true;

        return false;
    }
}
