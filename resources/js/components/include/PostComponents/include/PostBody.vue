<template>
    <div v-if="post.body"
    class="post-body color-theme color-text">
        <vue-editor :id="'quill-' + post.id"
        v-model="post.body"
        :editorToolbar="editorToolbar"
        :disabled="true">
        </vue-editor>
    </div>
</template>

<script src="./PostBody.js"></script>