@extends('layouts.auth')

@section('content_auth')

<div id="auth-page" class="login card color-theme color-text">
    <div class="card-content">

        <span class="card-title">
            {{ __('auth.login') }}
        </span>

        <form method="POST"
        action="{{ route('login') }}"
        aria-label="{{ __('auth.login') }}">
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

            <div class="input-field">
                <input id="password" type="password"
                class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }} color-text"
                name="password" required>

                <label for="password">
                    <i class="material-icons left">lock</i>
                    {{ __('auth.password') }}
                </label>

                @if ($errors->has('password'))
                    <span class="invalid-feedback color-text-alert" role="alert">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>

            <p class="remember_me"><label>
                <input class="form-check-input filled-in"
                type="checkbox" name="remember" id="remember" checked>

                <span>{{ __('auth.rememberMe') }}</span>
            </label></p>

            <button type="submit"
            class="btn waves-effect waves-light">
                {{ __('auth.login') }}
                <i class="material-icons right">send</i>
            </button>

        </form>

    </div>

    <div class="card-action right-align">
        <a class="color-link-s" href="{{ route('password.request') }}">
            {{ __('auth.forgotPassword') }}
        </a>
        <a class="color-link-s" href="{{ route('register') }}">
            {{ __('auth.register') }}
        </a>
    </div>
</div>

@endsection
