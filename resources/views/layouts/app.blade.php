@extends('layouts.main')

@section('content')

    {{-- If Javasript was disabled --}}
    <noscript>
        <div class="center">
            <h1 class="color-text">
                {{ __('app.pleaseEnableJavascript') }}
            </h1>
            <a href="https://www.enable-javascript.com/"
            target="_blank"
            class="color-link-p">
                {{ __('app.how') }}?
            </a>
        </div>
    </noscript>

    <div id="app">
        <App></App>
    </div>
@endsection
