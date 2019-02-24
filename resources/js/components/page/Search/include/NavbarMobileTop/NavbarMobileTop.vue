<template>
    <div id="navbar-mobile-top" class="navbar-fixed mobile">
        <nav class="color-theme border-bottom">
            <div class="nav-wrapper container">

                <input v-model="tempSearch"
                @keyup="onChangeSearch"
                type="text" 
                :placeholder="trans('search.search') + '...'"
                class="color-text"
                autofocus>
                
            </div>
        </nav>
    </div>
</template>

<script src="./NavbarMobileTop.js"></script>