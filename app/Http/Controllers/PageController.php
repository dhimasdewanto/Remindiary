<?php

namespace App\Http\Controllers;

use App\Libs\Controllers\Language;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function __construct()
    {
        Language::set();
    }

    public function app()
    {
        return view('layouts.app');
    }

    public function intro()
    {
        if(auth()->user())
            return redirect('app');
            
        return view('pages.intro');
    }

    public function home()
    {
        if(auth()->user())
            return redirect('app');
            
        return redirect('intro');
    }

    public function portofolio()
    {
        return view('pages.portofolio');
    }

    public function about()
    {
        return view('pages.about');
    }
}
