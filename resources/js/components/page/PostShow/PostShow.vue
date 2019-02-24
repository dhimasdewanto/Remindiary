<template>
    <div id="post-show">

        <!-- Header (Desktop) -->
        <Header v-if="post.visibility == 'public' || !checkAuth()"
        :title="trans('post.publicPost')" />
        <Header v-else
        :title="trans('post.yourPost')" />

        <!-- Navbar Mobile Top -->
        <NavbarMobileTop v-if="post.visibility == 'public' || !checkAuth()"
        :title="trans('post.publicPost')" />
        <NavbarMobileTop v-else
        :title="trans('post.yourPost')" />

        <div class="row">
            <div class="col s12 l8 col-left">
                <PostContent :isPostShow="true"
                :post="post" />
            </div>

            <div class="col s12 l4 col-right">

                <!-- Desktop Only (Load post first) 
                Delete and Edit Post (only for creator of this post) -->
                <div v-if="post.id && auth_id == post.user_id"
                class="flex desktop">

                    <!-- Edit Button -->
                    <a @click="clickEditButton"
                    class="flex-max btn waves-effect waves-light">
                        <i class="material-icons left">edit</i>
                        {{ trans('post.editPost') }}
                    </a>

                    <!-- Delete Button (Modal Trigger) -->
                    <a href="#modal-delete"
                    class="flex-mini btn waves-effect waves-light modal-trigger color-alert">
                        <i class="material-icons">delete</i>
                    </a>

                </div>

                <!-- Remind Date and Time -->
                <RemindDateTime v-if="post.remind_date || post.remind_time"
                :post="post" />

                <!-- Profile Creator -->
                <PostProfileCreator :post="post" />
                
            </div>
        </div>

        <!-- Navigation Mobile (edit and delete post) only for this post creator -->
        <div v-if="auth_id == post.user_id">
            <NavigationMobile :post="post"
            :pageName="pageName" />
        </div>

        <!-- Delete Post Modal -->
        <DeletePost :post="post" />

    </div>
</template>

<script src="./PostShow.js"></script>

