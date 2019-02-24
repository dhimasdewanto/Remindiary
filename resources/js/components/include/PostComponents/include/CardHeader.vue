<template>
    <div class="card-header card-action">

        <!-- Link to Profile Show -->
        <router-link :to="{ name: 'profile', params: { user_id: post.user_id } }"
        class="profile-link">

            <!-- Profile Image -->
            <img class="profile-image circle left"
            :alt="post.profile_image"
            :src="'/storage/profile_image_nano/' + post.profile_image">

            <!-- Profile Name -->
            <span v-if="post.user_id == auth_id" 
            class="profile-name color-link-p">
                {{ trans('navbar.me') }}
            </span>
            <span v-else 
            class="profile-name color-link-p">
                {{ truncate(post.name) }}
            </span>

        </router-link>

        <!-- Show Private or Public Post -->
        <span v-if="post.user_id == auth_id"
        class="color-text-s">
            <i class="material-icons tiny">
                chevron_right
            </i>
            {{ convertVisibility(post.visibility) }}
        </span>

    </div>
</template>

<script src="./CardHeader.js"></script>
