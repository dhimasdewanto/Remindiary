import Header from '../../include/Header/Header.vue';
import NavbarMobileTop from '../../include/NavbarMobileTop/NavbarMobileTop.vue';
import PostFeed from '../../include/PostFeed/PostFeed.vue';

import auth from '../../include/js/auth.js';
import meta from '../../include/js/meta.js';
import postStorage from '../../include/js/postStorage.js';

import axios from 'axios';

export default {
    components: {
        Header,
        NavbarMobileTop,
        PostFeed,
    },

    data() {
        return {
            pageName: 'PROFILE',

            user: {
                name: "Loading...",
                profile_image: "default_image.jpg"
            },

            follow: {
                followerCount: 0,
            },

            followNotAllowed: false,

            auth_id: meta.get("auth_id"),
        }
    },

    mounted() {
        var user_id = this.getUserId();
        this.setProfile(user_id);
        postStorage.setPage(this.pageName);
    },

    methods: {
        clickFollow: function() {
            if(!this.follow.isFollow)
                this.following();
            else
                this.unfollowing();
        },

        following: function() {
            axios.post('/follow/' + this.user.id)
            .then(res => {
                this.follow.isFollow = true;
                this.follow.followerCount += 1;
            }).catch(err => {
                console.log(err);
            });
        },

        unfollowing: function() {
            axios.delete('/follow/' + this.user.id)
            .then(res => {
                this.follow.isFollow = false;
                this.follow.followerCount -= 1;
            }).catch(err => {
                console.log(err);
            });
        },

        setProfile: function(user_id) {
            // No Load User Data for Auth Profile
            if(user_id == this.auth_id)
                this.user = this.getAuthUserData();

            axios.get('/profile/' + user_id)
            .then(res => {
                return res.data;
            }).then(res => {

                // Set User Not Found
                if(res.user == null) {
                    this.user = this.getUserNotFound();
                    this.followNotAllowed = true;
                    return;
                }

                // Don't load user data if user_id == auth_id
                if(user_id != this.auth_id)
                    this.user = res.user;

                this.follow = res.follow;

            }).catch(err => {
                console.log(err);
            });
        },

        getAuthUserData: function() {
            return {
                id: meta.get("auth_id"),
                name: meta.get("auth_name"),
                email: meta.get("auth_email"),
                profile_image: meta.get("auth_image")
            };
        },

        getUserNotFound: function() {
            return {
                id: this.getUserId(),
                name: "User Not Found",
                profile_image: "default_image.jpg"
            };
        },

        getUserId: function() {
            var user_id = this.$route.params.user_id;
            if(user_id)
                return user_id;
            return this.auth_id;
        },

        checkAuth: function() {
            return auth.methods.checkAuth();
        },
    }
}
