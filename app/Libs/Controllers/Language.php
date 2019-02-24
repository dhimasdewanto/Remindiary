<?php

namespace App\Libs\Controllers;

use App;
use Illuminate\Support\Facades\Cookie;

class Language
{
	public static function get()
	{
		$lang = Cookie::get('lang');

		if(!$lang)
			return 'en';

		return $lang;
	}

	public static function set()
	{
		$lang = Cookie::get('lang');
        self::setLanguage($lang);
	}

	private static function setLanguage($language)
    {
        if($language != "id")
			$language = "en";

		App::setLocale($language);
    }
}
