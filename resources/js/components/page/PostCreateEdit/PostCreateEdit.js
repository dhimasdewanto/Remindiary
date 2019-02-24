import RemindDateTime from './include/RemindDateTime/RemindDateTime.vue';
import PostBodyEditor from './include/PostBodyEditor/PostBodyEditor.vue';
import NavigationMobile from './include/NavigationMobile/NavigationMobile.vue';

import formatPostDateTime from './include/js/formatPostDateTime.js';

import Header from '../../include/Header/Header.vue';
import NavbarMobileTop from '../../include/NavbarMobileTop/NavbarMobileTop.vue';
import DeletePost from '../../include/PostComponents/DeletePost.vue';

import axios from 'axios';

import auth from '../../include/js/auth.js';
import materialize from '../../include/js/materialize.js';
import postStorage from '../../include/js/postStorage.js';

export default {

    components: {
        RemindDateTime,
        PostBodyEditor,
        NavigationMobile,
        Header,
        NavbarMobileTop,
        DeletePost,
    },

    props: {
        isUpdate: {
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            pageName: 'CREATE/EDIT',

            post: {
                id: this.$route.params.post_id,
                title: '',
                body: '',
                visibility: 'private',
                remind_date: '',
                remind_date_end: '',
                remind_time: '',
                remind_time_end: '',
                isBookmark: false,
                isPinned: false
            },

            postRaw: {}, // For post template (unformat post) and to send post

            // can't use v-show or v-if for bookmark and pin
            bookmarkIcon: 'star_border',
            pinIcon: 'bookmark_border',

            isPublic: false,
            isUpload: false,
            uploadProgress: 0,
        }
    },

    created() {
        auth.methods.redirectIfGuest();
    },

    mounted() {
        materialize.tooltips();

        if(this.isUpdate) {
            this.setPostFromLocal();
            postStorage.setPage(this.pageName);
        }
    },

    methods: {

        setPostFromLocal: function() {
            if( postStorage.check(this.post.id, this.pageName) )
                this.setPost( postStorage.get(this.post.id, this.pageName) );
            else
                this.setPostFromNetwork();
        },

        setPostFromNetwork: function() {
            axios.get('/post/' + this.post.id + '/edit')
            .then(res => {
                return res.data;
            }).then(res => {
                this.setPost(res.post);
            }).catch(err => {
                let router = this.$router;
                router.push({ name: 'post-show', params: { post_id: this.post.id } });
                console.log(err);
            });
        },

        setPost: function(post) {
            this.post = formatPostDateTime.toShow(post);
            this.setIsPublic(post.visibility);
            this.setIsPinned(post.pin);
            this.setIsBookmark(post.isBookmark);
        },

        /**
         * OnChange Event
         * Convert isPublic to post.visibility
         */
        setVisibility: function() {
            if(this.isPublic)
                this.post.visibility = 'public';
            else
                this.post.visibility = 'private';
        },

        setIsPublic: function(visibility) {
            if(visibility == 'public')
                this.isPublic = true;
            else
                this.isPublic = false;
        },

        setIsPinned: function(pin) {
            if(pin != 'pin') return;
            this.post.isPinned = true;
            this.pinIcon = 'bookmark';
        },

        setIsBookmark: function(isBookmark) {
            if(!isBookmark) return;
            this.bookmarkIcon = 'star';
        },



        /**
         * Get click send post from child
         * @param {*} post 
         */
        onClickSendPost: function() {
            this.sendPost();
        },

        onClickBookmark: function() {
            this.post.isBookmark = !this.post.isBookmark;

            if(this.post.isBookmark)
                this.bookmarkIcon = 'star';
            else
                this.bookmarkIcon = 'star_border';
        },

        onClickPin: function() {
            this.post.isPinned = !this.post.isPinned;

            if(this.post.isPinned)
                this.pinIcon = 'bookmark';
            else
                this.pinIcon = 'bookmark_border';
        },



        sendPost: function() {
            if(!this.validatePost())
                return;

            this.setPostRaw();

            if(this.isUpdate)
                return this.updatePost();
            return this.createPost();
        },

        setPostRaw: function() {
            this.postRaw = formatPostDateTime.toSend(this.post);
            this.postRaw = this.getPinForPostRaw(this.postRaw);
        },

        // Get pin only for postRaw
        getPinForPostRaw: function(post) {
            if(post.isPinned)
                post.pin = "pin";
            else
                post.pin = null;
            return post;
        },

        createPost: function() {
            axios.post('/post', this.postRaw, {
                onUploadProgress: uploadEvent => {
                    this.setLoadingInfo(uploadEvent);
                }
            }).then(res => {
                return res.data; // All JSON Data from Response
            }).then(res => {
                this.setSuccessUploadAction(res);
            }).catch(err => {
                console.log(err);
                this.isUpload = false;
            });
        },

        updatePost: function() {
            axios.put('/post/' + this.post.id, this.postRaw, {
                onUploadProgress: uploadEvent => {
                    this.setLoadingInfo(uploadEvent);
                }
            }).then(res => {
                return res.data; // All JSON Data from Response
            }).then(res => {
                this.setSuccessUploadAction(res);
            }).catch(err => {
                console.log(err);
                this.isUpload = false;
            });
        },

        /**
         * Validate Post
         * If 3 < title.length < 200 => show toast
         */
        validatePost: function() {
            let length = this.post.title.length;
            if(length < 3 || length > 200) {
                M.Toast.dismissAll();
                M.toast({html: this.trans('post.invalidTitleLength')});
                return false;
            }
            return true;
        },

        setLoadingInfo: function(uploadEvent) {
            this.isUpload = true;
            this.uploadProgress = Math.round(uploadEvent.loaded / uploadEvent.total * 100);
        },

        setSuccessUploadAction: function(res) {
            let router = this.$router;
            router.push({ name: 'post-show', params: { post_id: res.post_id } });
            postStorage.set(this.postRaw, this.pageName);
        },



        /**
         * Get data post from child
         * @param {*} post 
         */
        onChangePost: function(post) {
            this.post = post;
        },

    }

}