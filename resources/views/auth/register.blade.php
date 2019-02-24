@extends('layouts.auth')

@section('content_auth')

<div id="auth-page" class="register card color-theme">
    <div class="card-content">

        <span class="card-title color-text">
            {{ __('auth.register') }}
        </span>

        <form method="POST" action="{{ route('register') }}"
        aria-label="{{ __('auth.register') }}">
            @csrf

            <div class="input-field">
                <input id="name" type="text"
                data-position="right" data-tooltip="3-100 characters"
                class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }} tooltipped"
                name="name" value="{{ old('name') }}" required autofocus>

                <label for="name">
                    <i class="material-icons left">person</i>
                    {{ __('auth.name') }}
                </label>

                @if ($errors->has('name'))
                    <span class="invalid-feedback color-text-alert" role="alert">
                        <strong>{{ $errors->first('name') }}</strong>
                    </span>
                @endif
            </div>

            <div class="input-field">
                <input id="email" type="email"
                data-position="right" data-tooltip="Your valid email address"
                class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }} tooltipped"
                name="email" value="{{ old('email') }}" required>

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
                data-position="right" data-tooltip="Min. 6 characters"
                class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }} tooltipped"
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

            <div class="input-field">
                <input id="password-confirm" type="password"
                class="form-control" name="password_confirmation" required>

                <label for="password-confirm">
                    <i class="material-icons left">lock_outline</i>
                    {{ __('auth.confirmPassword') }}
                </label>
            </div>

            <button type="submit" class="btn waves-effect waves-light">
                {{ __('auth.register') }}
                <i class="material-icons right">send</i>
            </button>

        </form>

    </div>

    <div class="card-action right-align">
        <a class="color-link-s" href="{{ route('login') }}">
            {{ __('auth.alreadyRegistered') }}
        </a>
    </div>
</div>

@endsection
