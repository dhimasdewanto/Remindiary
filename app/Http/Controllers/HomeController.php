<?php

namespace App\Http\Controllers;

use App\Libs\Controllers\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
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
        Language::set();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('layouts.app');
    }
}
