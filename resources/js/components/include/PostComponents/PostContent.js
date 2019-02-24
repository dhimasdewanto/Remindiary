import CardHeader from './include/CardHeader.vue';
import PostBody from './include/PostBody.vue';
import RemindDateTime from './include/RemindDateTime.vue';

import auth from '../js/auth.js';
import materialize from '../js/materialize.js';
import meta from '../js/meta.js';
import postStorage from '../js/postStorage.js';
import setBookmarks from '../js/setBookmarks.js';
import setPin from '../js/setPin.js';

export default {

    components: {
        CardHeader,
        PostBody,
        RemindDateTime,
    },

    props: {
        post: {
            type: Object,
            required: true
        },

        isPostShow: {
            type: Boolean,
            required: false,
            default: false
        },
    },

    data() {
        return {
            auth_id: meta.get('auth_id'),
        }
    },

    mounted() {
        materialize.tooltips();
    },

    methods: {

        /**
         * Save post to storage
         * then change the route
         */
        clickPostLink: function() {
            postStorage.set(this.post, 'INDEX');
            let router = this.$router;
            router.push({ name: 'post-show', params: { post_id: this.post.id } });
        },
        
        clickBookmark: function() {
            this.post = setBookmarks(this.post);
        },

        clickPin: function() {
            this.post = setPin(this.post);
        },

        checkAuth: function() {
            return auth.methods.checkAuth();
        },

        /**
         * Check if device width more than 992px
         * 
         * NOTE: Reason of use this because cannot use cursor pointer in post body
         */
        checkDesktopWidth: function() {
            const width = screen.width;
            return width > 992;
        },

    }

}