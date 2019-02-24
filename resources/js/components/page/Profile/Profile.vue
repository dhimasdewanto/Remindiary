<template>
    <div id="profile">

        <!-- Header (Desktop) -->
        <Header :title="user.name" />

        <!-- Navbar Mobile Top -->
        <NavbarMobileTop :title="user.name" />

        <div class="row page">

            <!-- Desktop Only -->
            <div class="col s12 l2 desktop">
                
                <!-- Profile Image -->
                <div class="image-profile z-depth-1">
                    <img :src="'/storage/profile_image_mini/' + user.profile_image" 
                    :alt="user.name">
                </div>

                <!-- Follow Button -->
                <a v-if="user.id && user.id != auth_id && checkAuth() && !followNotAllowed"
                @click="clickFollow"
                :class="{ 'color-text-sd': follow.isFollow, 'color-theme': follow.isFollow }"
                class="btn-large waves-effect waves-light btn-follow">
                    <span v-if="follow.isFollow">
                        <i class="material-icons left">check_circle</i>
                        <span>Following</span>
                    </span>
                    <span v-else>
                        <i class="material-icons left">add_circle</i>
                        <span>Follow</span>
                    </span>
                </a>

                <!-- Guest Follow Button -->
                <router-link v-else-if="!checkAuth() && !followNotAllowed"
                :to="{ 'name': 'please-login' }"
                class="btn-large waves-effect waves-light btn-follow">
                    <span>
                        <i class="material-icons left">add_circle</i>
                        <span>Follow</span>
                    </span>
                </router-link>

                <!-- Profile Info -->
                <div class="card profile-information">
                    <div class="card-content color-theme color-text">
                        <p>Follower: </p>
                        <h5 class="center">{{ follow.followerCount }}</h5>
                    </div>
                </div>

            </div>

            <!-- Mobile Only -->
            <div class="col s12 l2 mobile">
                <ul class="collection z-depth-1">
                    <li class="collection-item avatar color-theme color-text">
                        
                        <!-- Profile Image -->
                        <img :src="'/storage/profile_image_micro/' + user.profile_image" 
                        :alt="user.name" 
                        class="circle">

                        <!-- User Name -->
                        <span class="title">{{ user.name }}</span>

                        <!-- Follower Info -->
                        <p class="follower">{{ follow.followerCount }} Follower</p>

                        <!-- Settings Button -->
                        <router-link v-if="user.id == auth_id && checkAuth()"
                        :to="{ name: 'settings' }"
                        class="secondary-content btn color-s">
                            <i class="material-icons">settings</i>
                        </router-link>

                        <!-- Follow Button -->
                        <a v-else-if="checkAuth() && !followNotAllowed"
                        @click="clickFollow"
                        :class="{ 
                            'color-text-sd': follow.isFollow, 
                            'color-theme': follow.isFollow, 
                            'border': follow.isFollow 
                        }"
                        class="secondary-content btn">
                            <span v-if="follow.isFollow">
                                <i class="material-icons">check_circle</i>
                            </span>
                            <span v-else>
                                Follow
                            </span>
                        </a>

                        <!-- Guest Follow Button -->
                        <router-link v-else-if="!checkAuth() && !followNotAllowed"
                        :to="{ 'name': 'please-login' }"
                        class="secondary-content btn">
                            <span>
                                Follow
                            </span>
                        </router-link>

                    </li>
                </ul>
            </div>

            <!-- Profile Post Feed -->
            <div class="feed col s12 l10">
                <PostFeed :feedType="'profile'" />
            </div>

        </div>

    </div>
</template>


<script src="./Profile.js"></script>