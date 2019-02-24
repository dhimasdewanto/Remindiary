<template>
    <div id="post-create-edit">

        <!-- Navbar Mobile Top -->
        <NavbarMobileTop v-if="isUpdate"
        :title="trans('post.editPost')" />
        <NavbarMobileTop v-else
        :title="trans('post.createPost')" />

        <!-- Header (Desktop) -->
        <Header v-if="isUpdate"
        :title="trans('post.editPost')" />
        <Header v-else
        :title="trans('post.createPost')" />

        <div class="row form-row">

            <!-- Left Panel -->
            <div class="col l8 s12 left-panel">
                
                <div class="left-top-panel flex">

                    <!-- Title -->
                    <div class="card post-title flex-max">

                        <div class="card-content color-theme">
                            <input v-model="post.title"
                            type="text" 
                            :placeholder="trans('post.title') + '...'"
                            class="color-text"
                            autofocus>
                        </div>

                        <!-- Visibility Switch (Mobile Only) -->
                        <div class="switch center mobile color-theme color-text">
                            <label>
                                <!-- Private Label -->
                                <i class="material-icons">person</i>
                                {{ trans('post.private') }}
                                <!-- Lever -->
                                <input v-model="isPublic"
                                @change="setVisibility"
                                type="checkbox">
                                <span class="lever"></span>
                                <!-- Public Label -->
                                <i class="material-icons">public</i>
                                {{ trans('post.public') }}
                            </label>
                        </div>

                    </div>

                    <!-- Bookmark Button (Desktop Only) -->
                    <a @click="onClickBookmark"
                    data-position="top" :data-tooltip="trans('post.bookmarkThis')"
                    class="btn waves-effect btn-box flex-mini tooltipped color-text-p color-theme desktop">
                        <i class="material-icons">{{ bookmarkIcon }}</i>
                    </a>

                    <!-- Pin Button (Desktop Only)  -->
                    <a @click="onClickPin"
                    data-position="top" :data-tooltip="trans('post.pinThis')"
                    class="btn waves-effect btn-box flex-mini tooltipped color-text-p color-theme desktop">
                        <i class="material-icons">{{ pinIcon }}</i>
                    </a>

                </div>

                <div class="card left-bottom-panel">
                    <!-- Body or Description -->
                    <PostBodyEditor 
                    @changedPost="onChangePost" 
                    :post="post" />
                </div>

            </div>

            <!-- Right Panel -->
            <div class="col l4 s12 right-panel">

                <div class="flex">

                    <!-- Send Button (Desktop Only) -->
                    <a @click="sendPost"
                    class="btn waves-effect waves-light btn-box send flex-max desktop">
                        <span v-if="!isUpload">
                            <span v-if="isUpdate">{{ trans('post.edit') }}</span>
                            <span v-else>{{ trans('post.create') }}</span>
                            <i class="material-icons right">send</i>
                        </span>
                        <span v-else>
                            {{ trans('post.loading') + " (" + uploadProgress + "%)" }}
                            <i class="material-icons right">cloud_upload</i>
                        </span>
                    </a>

                    <!-- Delete Modal Trigger (Desktop Only) (Update Post Only) -->
                    <a v-if="isUpdate"
                    href="#modal-delete"
                    class="btn waves-effect waves-light btn-box flex-mini modal-trigger color-alert desktop">
                        <i class="material-icons">delete</i>
                    </a>

                </div>
                

                <!-- Private or Public (Desktop Only) -->
                <div class="card desktop color-theme color-text">
                    <div class="switch center">
                        <label>
                            <!-- Private Label -->
                            <i class="material-icons">person</i>
                            {{ trans('post.private') }}
                            <!-- Lever -->
                            <input v-model="isPublic"
                            @change="setVisibility"
                            type="checkbox">
                            <span class="lever"></span>
                            <!-- Public Label -->
                            <i class="material-icons">public</i>
                            {{ trans('post.public') }}
                        </label>
                    </div>
                </div>

                <!-- Reminder -->
                <RemindDateTime 
                @changedPost="onChangePost" 
                :post="post" />

            </div>

        </div>

        <NavigationMobile 
        @changedPost="onChangePost" 
        @sendPost="onClickSendPost"
        :post="post"
        :isUpload="isUpload"
        :isUpdate="isUpdate"
        :uploadProgress="uploadProgress" />

        <!-- Delete Post Modal -->
        <DeletePost :post="post" />

    </div>
</template>

<script src="./PostCreateEdit.js"></script>
