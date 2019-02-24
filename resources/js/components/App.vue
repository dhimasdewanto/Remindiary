<template>
    <div id="vue-app">
        <Navbar />

        <Notifications />

        <transition :name="transitionName" mode="out-in">
            <router-view class="view" />
        </transition>

        <NavbarMobile />
    </div>
</template>

<script src="./App.js"></script>
