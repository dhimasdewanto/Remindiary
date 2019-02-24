@extends('layouts.auth')

@section('content_auth')

<div id="auth-page" class="email card color-theme color-text">
    <div class="card-content">

        <span class="card-title">
            {{ __('auth.resetPassword') }}
        </span>

        @if (session('status'))
            <div class="alert alert-success color-text-p" role="alert">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" 
        action="{{ route('password.email') }}" 
        aria-label="{{ __('Reset Password') }}">
            @csrf

            <div class="input-field">
                <input id="email" type="email"
                class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }} color-text"
                name="email" value="{{ old('email') }}" required autofocus>

                <label for="email">
                    <i class="material-icons left">email</i>
                    {{ __('auth.email') }}
                </label>

                @if ($errors->has('email'))
                    <span class="invalid-feedback color-text-alert" role="alert">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif
            </div>

            <button type="submit"
            class="btn waves-effect waves-light">
                {{ __('auth.sendResetPassword') }}
                <i class="material-icons right">send</i>
            </button>

        </form>

    </div>

    <div class="card-action right-align">
        <a class="color-link-s" href="{{ route('login') }}">
            {{ __('auth.login') }}
        </a>
        <a class="color-link-s" href="{{ route('register') }}">
            {{ __('auth.register') }}
        </a>
    </div>
</div>

@endsection
