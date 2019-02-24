<template>
    <div id="navbar-mobile-top" class="navbar-fixed mobile">
        <nav class="color-theme border-bottom">
            <div class="nav-wrapper container">

                <!-- Back Button -->
                <a v-if="btn_back"
                @click="onClickBack"
                class="left color-text-s">
                    <i class="material-icons">arrow_back</i>
                </a>

                <!-- Title of Navbar -->
                <span class="brand-logo color-text">
                    {{ truncate(title) }}
                </span>

                <!-- Notifications Button -->
                <a v-if="checkAuth()"
                @click="onClickNotifications"
                data-target="slide-out" 
                class="right sidenav-trigger">
                    <i :class="notificationsColorIcon"
                    class="material-icons">
                        {{ notificationsIcon }}
                    </i>
                </a>
                
            </div>
        </nav>
    </div>
</template>

<script src="./NavbarMobileTop.js"></script>

