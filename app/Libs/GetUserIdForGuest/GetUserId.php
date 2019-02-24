<?php

namespace App\Libs\GetUserIdForGuest;

class GetUserId
{
    /**
     * Get user id for guest
     * 
     * @return uuid user_id
     */
    public static function get()
    {
        if(auth()->user()) 
            return auth()->user()->id;
        return '0';
    }
}