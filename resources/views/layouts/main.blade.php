<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="{{ __('intro.descriptionOfThisApp') }}"/>
        
        @include('include.auth-data')

        <title>{{ config('app.name', 'Remindiary') }}</title>
        <link rel="manifest" href="{{ asset('manifest.json') }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

        @include('include.icons-apple')
        @include('include.icons-favicon')
        @include('include.icons-ms')
    </head>

    <body id="body" class="theme-light">
        <script src="{{ asset('js/setTheme.js') }}"></script>

        @yield('content')

        <script src="{{ asset('js/lang.js') }}"></script>
        <script src="{{ asset('js/particles.min.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>

        @include('include.check-service-worker')
    </body>
</html>
