<template>
    <div class="post-content card color-theme color-text">

        <CardHeader v-if="!isPostShow"
        :post="post" />
        
        <div class="card-content color-text">

            <!-- Post Header -->
            <div class="flex">

                <!-- Pin Button (only for creator this post) -->
                <!-- WHY TOOLTIP DOESN'T SHOW IN POSTSHOW???? -->
                <a v-if="auth_id == post.user_id && checkAuth()"
                @click="clickPin"
                data-position="top" :data-tooltip="trans('post.pinThis')"
                class="btn-pin tooltipped flex-mini">
                    <i :class="{ 
                        'color-text-p': post.pin,
                        'color-text-sl': !post.pin
                    }"
                    class="material-icons">
                        <span v-if="post.pin">bookmark</span>
                        <span v-else>bookmark_border</span>
                    </i>
                </a>

                <!-- Pin Sign (for guest) -->
                <i v-else-if="post.pin"
                data-position="top" :data-tooltip="trans('post.wasPinned')"
                class="material-icons left tooltipped flex-mini color-text-s">
                    bookmark
                </i>

                <!-- Post Title -->
                <span class="card-title flex-max">

                    <!-- Post Title (with link) -->
                    <a v-if="!isPostShow"
                    @click="clickPostLink"
                    class="color-text">
                        {{ post.title }}
                    </a>

                    <!-- Post Title (without link) -->
                    <span v-else>{{ post.title }}</span>

                </span>

                <!-- Bookmark Button -->
                <a v-if="checkAuth()"
                @click="clickBookmark"
                data-position="top" :data-tooltip="trans('post.bookmarkThis')"
                class="btn-bookmark tooltipped flex-mini">
                    <i :class="{ 
                        'color-text-p': post.isBookmark,
                        'color-text-sl': !post.isBookmark
                    }"
                    class="material-icons">
                        <span v-if="post.isBookmark">star</span>
                        <span v-else>star_border</span>
                    </i>
                </a>

            </div>

            <!-- Post Body -->
            <div v-if="post.body">

                <!-- Break Line for Post Show -->
                <br v-if="isPostShow">

                <!-- Post Body (with link) -->
                <a v-if="!isPostShow && !checkDesktopWidth()"
                @click="clickPostLink">
                    <PostBody :post="post" />
                </a>

                <!-- Post Body (without link) -->
                <PostBody v-else :post="post" />

            </div>

        </div>

        <RemindDateTime v-if="!isPostShow"
        :post="post" />
        
    </div>
</template>

<script src="./PostContent.js"></script>
