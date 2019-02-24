<template>
    <div id="search-page">

        <!-- Mobile Search Field -->
        <NavbarMobileTop @changedSearch="onChangeSearch"  />

        <!-- Desktop Search Field -->
        <div class="input-field container desktop">
            <!-- Input -->
            <input v-model="search" 
            @keyup="onKeySearch" 
            id="search" 
            class="color-text"
            type="text"
            autocomplete="off"
            autofocus>
            <!-- Label -->
            <label for="search">
                <i class="material-icons left">search</i>
                {{ trans('search.search') }}
            </label>
        </div>

        <!-- Search Not Found -->
        <div v-show="posts.length == 0 && users.length == 0" 
        class="container">
            <div class="card center">
                <div class="card-content color-theme">
                    <span class="card-title color-text">
                        {{ trans('search.notFound') }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Search Result -->
        <div v-show="posts.length != 0 || users.length != 0"
        class="row">

            <!-- User Result -->
            <ul class="col s12 l7 col-left">
                <div class="collection z-depth-1">
                    
                    <!-- Link to user profile -->
                    <router-link v-show="users.length != 0"
                    v-for="user in users" :key="user.id"
                    :to="{ name: 'profile', params: { user_id: user.id } }">

                        <li class="collection-item avatar color-theme color-text">

                            <!-- User Profile Image -->
                            <img :src="'/storage/profile_image_micro/' + user.profile_image" 
                            :alt="user.name"
                            class="circle">

                            <!-- User name -->
                            <span class="title truncate">{{ user.name }}</span>

                        </li>

                    </router-link>

                </div>
            </ul>

            <!-- Post Result -->
            <div v-show="posts.length != 0"
            class="col s12 l5 col-right">
                <div v-for="post in posts" :key="post.id">
                    <PostContent :post="post" />
                </div>
            </div>

        </div>

    </div>
</template>

<script src="./Search.js"></script>
