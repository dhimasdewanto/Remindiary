<template>
    <div id="post-body-editor" class="card-content color-theme color-text">
        <vue-editor v-model="post.body"
        @keyup="onChangePost"
        :placeholder="trans('post.description') + '...'"
        :editorToolbar="editorToolbar">
        </vue-editor>
    </div>
</template>

<script src="./PostBodyEditor.js"></script>
