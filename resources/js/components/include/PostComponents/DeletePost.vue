<template>
    <div id="modal-delete" class="modal">

        <div class="modal-content color-theme color-text">
            <h4>{{ trans('post.delete') }} {{ post.title }}</h4>
        </div>

        <div class="modal-footer color-theme">
            <a @click="deletePost(post.id)"
            class="modal-close waves-effect btn-flat color-link-alert">
                {{ trans('post.delete') }}
            </a>

            <a class="modal-close waves-effect btn-flat color-link">
                {{ trans('post.cancel') }}
            </a>
        </div>

    </div>
</template>

<script src="./DeletePost.js"></script>
