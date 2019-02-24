import axios from 'axios';

import PostContent from '../../include/PostComponents/PostContent.vue';
import DeletePost from '../../include/PostComponents/DeletePost.vue';

import PostProfileCreator from './include/PostProfileCreator/PostProfileCreator.vue';
import RemindDateTime from './include/RemindDateTime/RemindDateTime.vue';
import NavigationMobile from './include/NavigationMobile/NavigationMobile.vue';

import Header from '../../include/Header/Header.vue';
import NavbarMobileTop from '../../include/NavbarMobileTop/NavbarMobileTop.vue';

import auth from '../../include/js/auth.js';
import meta from '../../include/js/meta.js';
import postStorage from '../../include/js/postStorage.js';

export default {

    components: {
        Header,
        NavbarMobileTop,
        PostContent,
        DeletePost,
        PostProfileCreator,
        RemindDateTime,
        NavigationMobile,
    },

    data() {
        return {
            pageName: 'SHOW',

            post: {
                id: this.$route.params.post_id,

                // Placeholder
                user_id: '0', // Remove Warning
                title: this.trans('post.loading') + '...',
                name: this.trans('post.loading') + '...',
                profile_image: 'default_image.jpg',
            },

            auth_id: meta.get('auth_id'),
        }
    },

    mounted() {
        this.setPostFromLocal();
        postStorage.setPage(this.pageName);
    },

    methods: {

        setPostFromLocal: function() {
            if( postStorage.check(this.post.id, this.pageName) ) {
                this.post = postStorage.get(this.post.id, this.pageName);
                this.goToTopPage(); // Necessary for setPostFromLocal
                return;
            }

            // If page was refreshed
            this.setPostFromNetwork();
        },

        setPostFromNetwork: function() {
            axios.get('/post/' + this.post.id)
            .then(res => {
                return res.data;
            }).then(res => {
                this.post = res.post;
            }).catch(err => {
                this.setPostNotFound();
                console.log(err);
            });
        },

        setPostNotFound: function() {
            this.post = {
                user_id: '0',
                title: this.trans('post.postDeletedOrDoesntExit'),
                name: 'Error',
                profile_image: 'default_image.jpg',
                created_at: '1970-01-01 00:00:01',
                updated_at: '1970-01-01 00:00:01',
            };
        },

        checkAuth: function() {
            return auth.methods.checkAuth();
        },

        /**
         * Save post to storage
         * then change the route
         */
        clickEditButton: function() {
            postStorage.set(this.post, this.pageName);
            let router = this.$router;
            router.push({ name: 'post-edit', params: { post_id: this.post.id } });
        },

        goToTopPage: function() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },

    }

}