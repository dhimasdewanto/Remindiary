<template>
    <div id="settings-page">

        <!-- Header (Desktop) -->
        <Header :title="trans('settings.settings')" />

        <!-- Navbar Mobile Top -->
        <NavbarMobileTop :title="trans('settings.settings')" />

        <div class="container settings">
            <div class="card color-theme color-text">

                <!-- Main Settings -->
                <div class="card-content row">

                    <!-- Language -->
                    <div class="col l8 s12">
                        <p>Language - {{ trans('settings.language') }}</p>
                    </div>
                    <div class="col l4 s12">
                        <select v-model="language" 
                        @change="changeLanguage">
                            <option value="id">Bahasa Indonesia</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    <!-- Theme -->
                    <div class="col s8">
                        <p>{{ trans('settings.dark') }}</p>
                    </div>
                    <div class="col s4">
                        <div class="switch right-align">
                            <label>
                                <input v-model="checkTheme" 
                                @click="changeTheme" 
                                type="checkbox">
                                <span class="lever"></span>
                            </label>
                        </div>
                    </div>

                </div>

                <!-- User Settings -->
                <div class="card-content row user-settings">

                    <!-- Change Profile Image -->
                    <div class="col l4 s12">
                        <router-link :to="{ name: 'settings-changeprofileimage' }"
                        class="btn-flat waves-effect truncate color-text-p">
                            <i class="material-icons left">image</i>
                            {{ trans('settings.changeProfileImage') }}
                        </router-link>
                    </div>

                    <!-- Change Name -->
                    <div class="col l4 s12">
                        <router-link :to="{ name: 'settings-changename' }"
                        class="btn-flat waves-effect truncate color-text-p">
                            <i class="material-icons left">person</i>
                            {{ trans('settings.changeName') }}
                        </router-link>
                    </div>

                    <!-- Change Password -->
                    <div class="col l4 s12">
                        <router-link :to="{ name: 'settings-resetpassword' }"
                        class="btn-flat waves-effect truncate color-text-p">
                            <i class="material-icons left">lock</i>
                            {{ trans('settings.resetPassword') }}
                        </router-link>
                    </div>

                </div>

                <!-- Set to Default and Logout -->
                <div class="card-action">

                    <!-- Set To Default -->
                    <a @click="changeToDefault"
                    class="btn-flat waves-effect truncate color-text-s">
                        <i class="material-icons left">settings_backup_restore</i>
                        {{ trans('settings.restore') }}
                    </a>
                    <br>

                    <!-- About Button -->
                    <a href="/about"
                    class="btn-flat waves-effect truncate color-text-s">
                        <i class="material-icons left">help_outline</i>
                        {{ trans('settings.about') }}
                    </a>
                    <br>

                    <!-- Logout Button -->
                    <a @click="logoutEvent"
                    class="btn-flat waves-effect color-text-alert">
                        <i class="material-icons left">exit_to_app</i>
                        {{ trans('navbar.logout') }}
                    </a>

                </div>

            </div>
        </div>

        <!-- Logout Form -->
        <form id="logout-form" action="/logout" method="POST" hidden>
            <input type="hidden" name="_token" :value="token">
        </form>
    
    </div>
</template>

<!-- Main Script -->
<script src="./Settings.js"></script>
