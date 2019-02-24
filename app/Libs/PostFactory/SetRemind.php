<?php

namespace App\Libs\PostFactory;

use App\Post;
use DateTime;
use Illuminate\Http\Request;

class SetRemind
{
    private static $timeForRemindDateTime = "08:00:00";

    public static function set(Post $post, Request $request)
    {
        $post->remind_date = self::getDate( $request->input('remind_date') );
        $post->remind_time = self::getTime( $request->input('remind_time') );
        $post->remind_date_end = self::getDate( $request->input('remind_date_end') );
        $post->remind_time_end = self::getTime( $request->input('remind_time_end') );

        $post = self::nullIfSame($post);
        $post = self::replace($post);

        $post->remind_datetime = self::setRemindDateTime($post->remind_date, $post->remind_time);
        $post->remind_datetime_end = self::setRemindDateTime($post->remind_date_end, $post->remind_time_end);
        
        return $post;
    }

    /**
     * Replace remind date/time with remind date/time end
     * if remind_date/time > remind_date_end/time
     * or remind_date/time == null but remind_date/time_end != null
     * 
     * @param Post $post
     * @return Post $post
     */
    private static function replace(Post $post)
    {
        if( $post->remind_date > $post->remind_date_end && $post->remind_date_end != null || 
        ($post->remind_date == null && $post->remind_date_end != null) )
        {
            $temp = $post->remind_date;
            $post->remind_date = $post->remind_date_end;
            $post->remind_date_end = $temp;
        }

        if( $post->remind_time > $post->remind_time_end && $post->remind_time_end != null ||
        ($post->remind_time == null && $post->remind_time_end != null) )
        {
            $temp = $post->remind_time;
            $post->remind_time = $post->remind_time_end;
            $post->remind_time_end = $temp;
        }

        return $post;
    }

    /**
     * Null remind date/time end
     * if remind_date/time == remind_date_end/time
     * 
     * @param Post $post
     * @return Post $post
     */
    private static function nullIfSame(Post $post)
    {
        if($post->remind_date == $post->remind_date_end)
            $post->remind_date_end = null;

        if($post->remind_time == $post->remind_time_end)
            $post->remind_time_end = null;

        return $post;
    }

    /**
     * Set Post Remind Date Time
     * 
     * @param $date
     * @param $time
     * @return Remind Date Time
     */
	private static function setRemindDateTime($date, $time)
	{
		if($date != null && $time != null)
            return $date . " " . $time;

        if($date != null)
            return $date . " " . self::$timeForRemindDateTime;

        if($time != null)
            return self::getTodayOrTomorrow($time);

        return null;
	}

    /**
     * Compare time with today
     * if time < time today --> get tomorrow
     * 
     * @param $time
     * @return $timeWithDate
     */
	private static function getTodayOrTomorrow($time)
    {
        $today = date("Y-m-d H:i:s");
        $timeWithDate = date("Y-m-d") . " " . $time;

        if($today > $timeWithDate)
        {
            $timeWithDate = new DateTime();
            $timeWithDate->modify('+1 day');
            return $timeWithDate->format('Y-m-d') . " " . $time;
        }

        return $timeWithDate;
    }

    /**
     * Give post remind date null 
     * if input has invalid format
     * 
     * @param $date
     * @return $date
     */
    private static function getDate($date)
    {
        if(!self::validateDate($date)) $date = null;
        return $date;
    }

    private static function getTime($time)
    {
        if(!self::validateTime($time)) $time = null;
        return $time;
    }

    private static function validateDate($date, $format = 'Y-m-d')
    {
        return $date == date($format, strtotime($date));
    }

    private static function validateTime($time, $format = 'H:i:s')
    {
        return $time == date($format, strtotime($time));
    }

}