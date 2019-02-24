@extends('layouts.auth')

@section('content_auth')

<div id="about-page" class="card color-theme color-text">
    <div class="card-content">

        <span class="card-title">
            {{ config('app.name', 'Remindiary') }}
        </span>

        <span>© {{ date("Y") }} Dhimas Dewanto</span>
        <br>
        <br>

        <strong>Framework</strong>
        <p>Laravel</p>
        <br>

        <strong>Front-End</strong>
        <ul>
            <li>Materialize</li>
            <li>Vue.js</li>
            <li>Vue-infinite-loading</li>
            <li>Moment.js</li>
            <li>Particles.js</li>
        </ul>
        <br>

        <strong>Back-End</strong>
        <ul>
            <li>Sudiptpa/guid</li>
            <li>Intervention Image</li>
        </ul>

    </div>

    <div class="card-action right-align">
        <a class="color-link-s" href="javascript:history.back()">
            {{ config('app.name', 'Remindiary') }}
        </a>
    </div>
</div>

@endsection