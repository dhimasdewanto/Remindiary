<template>
    <div id="navigation-mobile" class="mobile">
        <div class="row z-depth-1 color-theme border">
            
            <!-- Bookmarks / All Feeds -->
            <div class="col s5">

                <!-- Bookmarks -->
                <router-link v-if="!isBookmarks" 
                :to="{ name: 'bookmarks' }"
                class="btn-large waves-effect truncate color-theme color-text-sd">
                    <i class="material-icons">star</i>
                    {{ trans('post.bookmarks') }}
                </router-link>

                <!-- All Feeds -->
                <router-link v-else 
                :to="{ name: 'home' }"
                class="btn-large waves-effect truncate color-theme color-text-sd">
                    <i class="material-icons">view_day</i>
                    {{ trans('navbar.allFeeds') }}
                </router-link>

            </div>


            <div class="col s2"></div>

            <!-- New Post -->
            <div class="col s5">
                <router-link :to="{ name: 'post-create' }"
                class="btn-large waves-effect truncate color-theme color-text-pd">
                    <i class="material-icons">add</i>
                    {{ trans('post.newPost') }}
                </router-link>
            </div>

        </div>
    </div>
</template>

<script src="./NavigationMobile.js"></script>
