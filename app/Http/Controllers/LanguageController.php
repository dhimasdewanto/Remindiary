<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Cache;

class LanguageController extends Controller
{
    private $cookieLang;

    public function __construct()
    {
        $this->cookieLang = Cookie::get('lang');
        $this->defaultCookieLang();
    }

    public function lang()
    {
        Cache::forget('lang.js');

        $strings = Cache::rememberForever('lang.js', function () {
            $lang = $this->cookieLang;

            $files   = glob(resource_path('lang/' . $lang . '/*.php'));
            $strings = [];

            foreach ($files as $file) {
                $name           = basename($file, '.php');
                $strings[$name] = require $file;
            }

            return $strings;
        });

        header('Content-Type: text/javascript');
        echo('window.i18n = ' . json_encode($strings) . ';');
        exit();
    }

    /**
     * Set default cookie lang
     * Run if lang cookie not available
     */
    private function defaultCookieLang()
    {
        if(!Cookie::get('lang'))
        {
            $this->cookieLang = app()->getLocale();
        }
    }
}
