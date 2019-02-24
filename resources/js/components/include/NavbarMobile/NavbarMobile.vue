<template>
    <div id="navbar-mobile" class="card mobile z-depth-2">
        <div class="card-content row border-top color-theme color-text">

            <!-- Home -->
            <div v-if="checkAuth()" 
            class="col s4 center">
                <router-link :to="{ name: 'home' }" 
                :class="[ color.home ? 'color-text-p' : 'color-text-s' ]">
                    <i class="material-icons">home</i>
                    <p>{{ trans('navbar.home') }}</p>
                </router-link>
            </div>

            <!-- Search -->
            <div class="col s4 center">
                <router-link :to="{ name: 'search' }"
                :class="[ color.search ? 'color-text-p' : 'color-text-s' ]">
                    <i class="material-icons">search</i>
                    <p>{{ trans('navbar.search') }}</p>
                </router-link>
            </div>

            <!-- Profile -->
            <div v-if="checkAuth()" 
            class="col s4 center">
                <router-link :to="{ name: 'my-profile' }"
                :class="[ color.profile ? 'color-text-p' : 'color-text-s' ]">
                    <i class="material-icons">person</i>
                    <p>{{ trans('navbar.myProfile') }}</p>
                </router-link>
            </div>

            <!-- Guest Login -->
            <div v-if="!checkAuth()"
            class="col s4 center">
                <a href="/login" class="color-text-s">
                    <i class="material-icons">arrow_forward</i>
                    <p>{{ trans('auth.login') }}</p>
                </a>
            </div>

            <!-- Guest Register -->
            <div v-if="!checkAuth()"
            class="col s4 center">
                <a href="/register" class="color-text-s">
                    <i class="material-icons">person_add</i>
                    <p>{{ trans('auth.register') }}</p>
                </a>
            </div>

        </div>
    </div>
</template>

<script src="./NavbarMobile.js"></script>
