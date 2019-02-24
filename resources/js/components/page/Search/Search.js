import axios from 'axios';

import PostContent from '../../include/PostComponents/PostContent.vue';

import NavbarMobileTop from './include/NavbarMobileTop/NavbarMobileTop.vue';

export default {

    components: {
        PostContent,
        NavbarMobileTop,
    },
    
    data() {
        return {
            users: {},
            posts: {},
            search: ""
        }
    },

    mounted() {
        this.onKeySearch();
    },

    methods: {
        /**
         * Get search data from child
         * @param {*} search 
         */
        onChangeSearch: function(search) {
            this.search = search;
            this.onKeySearch();
        },

        onKeySearch: function() {
            this.searchUsers();
            this.searchPosts();
        },

        searchUsers: function() {
            axios.get('/search/users', {
                params: {
                    search: this.search
                }
            }).then(res => {
                return res.data;
            }).then(res => {
                this.users = res.users;
            }).catch(err => {
                console.log(err);
            });
        },

        searchPosts: function() {
            axios.get('/search/posts', {
                params: {
                    search: this.search
                }
            }).then(res => {
                return res.data;
            }).then(res => {
                this.posts = res.posts;
            }).catch(err => {
                console.log(err);
            });
        },
    },

}