<template>
    <div id="navigation" class="desktop">

        <router-link :to="{ name: 'post-create' }"
        class="btn-newpost waves-effect waves-light btn-large">
            <i class="material-icons left">add</i>
            {{ trans('post.newPost') }}
        </router-link>

        <br><br>

        <div class="menu row center">

            <!-- Home Link -->
            <router-link :to="{ name: 'home' }">
                <div class="menu-item col s12 l6 color-bglink-darken color-text" 
                :class="{ 'color-text-pd': isAllFeeds }">
                    <i class="material-icons">view_day</i>
                    <br>
                    <span class="truncate">
                        {{ trans('navbar.allFeeds') }}
                    </span>
                </div>
            </router-link>

            <!-- Bookmarks Link -->
            <router-link :to="{ name: 'bookmarks' }">
                <div class="menu-item col s12 l6 color-bglink-darken color-text"
                :class="{ 'color-text-pd': isBookmarks }">
                    <i class="material-icons">star</i>
                    <br>
                    <span class="truncate">{{ trans('post.bookmarks') }}</span>
                </div>
            </router-link>

        </div>

    </div>
</template>

<script src="./Navigation.js"></script>
