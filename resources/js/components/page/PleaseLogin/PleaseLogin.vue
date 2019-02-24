<template>
    <div id="please-login" class="color-text">

        <div class="row">

            <h5 class="center">
                {{ trans('pleaseLogin.descriptionFollow') }}
            </h5>
            <br>

            <!-- Register Button -->
            <div class="col s6">
                <a href="/register"
                class="btn waves-effect waves-light">
                    {{ trans('auth.register') }}
                </a>
            </div>

            <!-- Login Button -->
            <div class="col s6">
                <a href="/login"
                class="btn waves-effect color-theme color-text">
                    {{ trans('auth.login') }}
                </a>
            </div>

            <!-- Explore Link -->
            <div class="col s12 center">
                <a href="javascript:history.back()"
                class="link-explore color-link-hover-p">
                    <i class="material-icons">arrow_back</i>
                    {{ trans('pleaseLogin.keepExplore') }}
                </a>
            </div>


        </div>

    </div>
</template>

<script src="./PleaseLogin"></script>
