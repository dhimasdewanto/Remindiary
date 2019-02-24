<template>
    <ul id="dropdown-user" class="dropdown-content color-theme">
        <li>
            <router-link :to="{ name: 'my-profile' }"
            class="color-text">
                <i class="material-icons left color-text-s">person</i>
                {{ trans('navbar.myProfile') }}
            </router-link>
        </li>
        <li>
            <router-link :to="{ name: 'settings' }"
            class="color-text">
                <i class="material-icons left color-text-s">settings</i>
                {{ trans('navbar.settings') }}
            </router-link>
        </li>
        <li class="divider"></li>
        <li>
            <a @click="logoutEvent"
            class="color-text">
                <i class="material-icons left color-text-s">exit_to_app</i>
                {{ trans('navbar.logout') }}
            </a>
            <form id="logout-form" action="/logout" method="POST" hidden>
                <input type="hidden" name="_token" :value="csrf">
            </form>
        </li>
    </ul>
</template>

<script src="./Dropdown.js"></script>
