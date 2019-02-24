@extends('layouts.auth')

@section('content_auth')

@include('include.nav-intro')

<div id="intro">
    <div class="row">

        {{-- Description --}}
        <div class="col l8 s12 col-left">

            <h1 class="color-text">
                {{ config('app.name', 'Remindiary') }}
            </h1>

            <p class="color-text">
                {{ __('intro.descriptionOfThisApp') }}
            </p>

        </div>

        {{-- Login, Register, Explore Buttons --}}
        <div class="col l4 s12 col-right row">

            {{-- Register Button --}}
            <div class="col l12 s6">
                <a href="/register"
                class="btn waves-effect waves-light">
                    {{ __('auth.register') }}
                </a>
            </div>

            {{-- Login Button --}}
            <div class="col l12 s6">
                <a href="/login"
                class="btn waves-effect color-theme color-text">
                    {{ __('auth.login') }}
                </a>
            </div>

            {{-- Explore Link --}}
            <div class="col s12 center">
                <a href="/app/search"
                class="link-explore color-link-hover-p">
                    <i class="material-icons">search</i>
                    {{ __('intro.explore') }}
                </a>
            </div>


        </div>

    </div>
</div>

@include('include.footer')

@endsection