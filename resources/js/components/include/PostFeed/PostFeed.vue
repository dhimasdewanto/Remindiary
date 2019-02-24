<template>
    <div id="post-feed">

        <!-- Enable Notifications -->
        <div v-show="isNotificationAsk"
        class="full-card">
            <a @click="askNotification">
                <div class="card color-theme color-text">
                    <div class="card-content">
                        <p>{{ trans('notifications.clickToEnable') }}</p>
                    </div>
                </div>
            </a>
        </div>

        <!-- Not Found -->
        <div v-if="not_found"
        class="full-card">
            <div class="card color-theme color-text">
                <div class="card-content">
                    <p>{{ trans('post.noPost') }}</p>
                </div>
            </div>
        </div>

        <!-- Desktop Post Feed -->
        <div v-if="!not_found" class="row desktop">

            <!-- Left Post -->
            <div class="col s12 l6 left-post">
                <div v-for="(post, index) in posts" :key="post.id">
                    <!-- Even Post Validation -->
                    <div v-if="index % 2 == 0 || index == 0">
                        <PostContent :post="post" />
                    </div>
                </div>
            </div>

            <!-- Right Post -->
            <div class="col s12 l6 right-post">
                <div v-for="(post, index) in posts" :key="post.id">
                    <!-- Odd Post Validation -->
                    <div v-if="index % 2 == 1">
                        <PostContent :post="post" />
                    </div>
                </div>
            </div>

        </div>

        <!-- Mobile Tablet Post Feed -->
        <div v-show="!not_found" class="mobile">
            <div v-for="post in posts" :key="post.id">
                <PostContent :post="post" />
            </div>
        </div>

        <!-- Infinite Loading -->
        <infinite-loading @infinite="infiniteHandler"
        spinner="spiral" 
        @distance="1">
            <span slot="no-more"></span>
            <span slot="no-results"></span>
        </infinite-loading>

    </div>
</template>

<script src="./PostFeed.js"></script>