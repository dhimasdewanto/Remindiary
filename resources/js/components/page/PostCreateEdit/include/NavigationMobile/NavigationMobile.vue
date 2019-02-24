<template>
    <div id="navigation-mobile" class="mobile">
        <div class="row z-depth-1 color-theme border">
            
            <!-- Bookmark -->
            <div class="col s2">
                <a @click="onClickBookmark"
                data-position="top" data-tooltip="Bookmark this post"
                class="btn-large waves-effect tooltipped color-theme color-text-pd">
                    <i v-if="tempIsBookmark" class="material-icons notext">star</i>
                    <i v-else-if="post.isBookmark" class="material-icons notext">star</i> <!-- Can't set in mounted() -->
                    <i v-else class="material-icons notext">star_border</i>
                </a>
            </div>

            <!-- Pin -->
            <div class="col s2">
                <a @click="onClickPin"
                data-position="top" data-tooltip="Pin this post"
                class="btn-large waves-effect tooltipped color-theme color-text-pd">
                    <i v-if="tempIsPinned" class="material-icons notext">bookmark</i>
                    <i v-else-if="post.isPinned" class="material-icons notext">bookmark</i> <!-- Can't set in mounted() -->
                    <i v-else class="material-icons notext">bookmark_border</i>
                </a>
            </div>

            <!-- Delete Modal Trigger -->
            <div class="col s2">
                <a href="#modal-delete"
                class="btn-large waves-effect modal-trigger color-theme color-text-alert">
                    <i class="material-icons notext">delete</i>
                </a>
            </div>

            <div class="col s1"></div>

            <!-- New Post -->
            <div class="col s5">
                <a @click="onClickSendPost"
                class="btn-large waves-effect truncate color-theme color-text-pd">
                    <span v-if="!isUpload">
                        <span v-if="isUpdate">{{ trans('post.edit') }}</span>
                        <span v-else>{{ trans('post.create') }}</span>
                        <i class="material-icons on-right">send</i>
                    </span>
                    <span v-else>
                        {{ "(" + uploadProgress + "%)" }}
                        <i class="material-icons on-right">cloud_upload</i>
                    </span>
                </a>
            </div>

        </div>
    </div>
</template>

<script src="./NavigationMobile.js"></script>
