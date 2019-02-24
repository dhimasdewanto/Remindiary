<template>
    <ul class="profile-creator collection z-depth-1">
        <li class="collection-item avatar color-theme color-text">

            <router-link :to="{ name: 'profile', params: { user_id: post.user_id } }"
            class="color-text-p">
                
                <img :src="'/storage/profile_image_nano/' + post.profile_image" 
                :alt="post.name" 
                class="circle">

                <span class="title">{{ post.name }}</span>

            </router-link>

            <p class="visibility">{{ getVisibility(post.visibility) }}</p>
            <p class="timestamp">
                <span>{{ trans('post.createdAt') + ": " }}</span>
                {{ convertDateTime(post.created_at) }}
            </p>
            <p class="timestamp">
                <span>{{ trans('post.updatedAt') + ": " }}</span>
                {{ convertDateTime(post.updated_at) }}
            </p>
        </li>
    </ul>
</template>


<script src="./PostProfileCreator.js"></script>