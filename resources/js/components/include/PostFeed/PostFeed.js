import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

import PostContent from '../PostComponents/PostContent.vue';

import laravelWebPush from '../js/laravelWebPush.js';
import meta from '../js/meta.js';

export default {

    components: {
        InfiniteLoading,
        PostContent
    },

    props: {
        feedType: {
            type: String,
            required: false
        },
    },

    data() {
        return {
            posts: [],
            page: 1,
            not_found: false,
            auth_id: meta.get("auth_id"),
            isNotificationAsk: this.checkIsNotificationAsk(),
        }
    },

    methods: {

        infiniteHandler: function($state) {
            let _this = this;
            var api = this.getApi();

            axios.get(api, {
                params: {
                    page: this.page,
                },
            }).then(res => {
                /**
                 * All JSON Data from Response
                 */
                return res.data; 
            }).then(res => {
                if(res.posts.total == 0) {
                    _this.not_found = true;
                    $state.complete();
                }
                else if(res.posts.current_page <= res.posts.last_page) {
                    /**
                     * Push data from JSON to posts
                     * Can't refactor with extract method
                     */
                    res.posts.data.forEach(function(value) {
                        _this.posts.push(value);
                    });

                    _this.page += 1;
                    $state.loaded();
                }
                else {
                    $state.complete();
                }
            }).catch(err => {
                console.log(err);
            });
        },

        getApi: function() {
            if(this.feedType == "profile")
                return '/post/profile/' + this.getProfileId();
                
            if(this.feedType == "bookmarks")
                return '/post/bookmarks';

            return '/post';
        },

        getProfileId: function() {
            var user_id = this.$route.params.user_id;
            if(user_id)
                return user_id;
            return this.auth_id;
        },

        askNotification: function() {
            laravelWebPush.methods.subscribe();
            this.isNotificationAsk = false;
        },

        /**
         * Check if notification wasn't granted nor denied
         */
        checkIsNotificationAsk: function() {
            return Notification.permission !== 'granted' && Notification.permission !== 'denied';
        }

    }

}