<template>
    <div id="navbar" class="desktop">

        <!-- Navbar -->
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper color-theme">
                    <router-link v-if="checkAuth()"
                    :to="{ name: 'home' }" 
                    class="brand-logo color-text-p">
                        Remindiary
                    </router-link>

                    <!-- For Guest -->
                    <a v-else
                    href="/intro"
                    class="brand-logo color-text-p">
                        Remindiary
                    </a>

                    <ul class="right hide-on-med-and-down">
                        <li id="desktop-li-home">
                            <router-link :to="{ name: 'home' }" 
                            class="color-text">
                                <i class="material-icons left color-text-s">home</i>
                                {{ trans('navbar.home') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'search' }"
                            class="color-text">
                                <i class="material-icons left color-text-s">search</i>
                                {{ trans('navbar.search') }}
                            </router-link>
                        </li>

                        <!-- For Guest -->
                        <li id="desktop-li-login">
                            <a href="/login"
                            class="color-text">
                                <i class="material-icons left color-text-s">arrow_forward</i>
                                {{ trans('auth.login') }}
                            </a>
                        </li>
                        <li id="desktop-li-register">
                            <a href="/register"
                            class="color-p color-text-1">
                                <i class="material-icons left">person_add</i>
                                {{ trans('auth.register') }}
                            </a>
                        </li>

                        <li id="desktop-li-notifications">
                            <a @click="onClickNotifications"
                            data-target="slide-out"
                            class="sidenav-trigger">
                                <i :class="notificationsColorIcon"
                                class="material-icons">
                                    {{ notificationsIcon }}
                                </i>
                            </a>
                        </li>
                        <li id="desktop-li-profile">
                            <a data-target="dropdown-user"
                            class="color-text dropdown-trigger">
                                <img class="circle left"
                                v-bind:src="'/storage/profile_image_nano/' + auth_image">
                                {{ truncate(auth_name) }}
                                <i class="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        <Dropdown />

    </div>
</template>

<script src="./Navbar.js"></script>

