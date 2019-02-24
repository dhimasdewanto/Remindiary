import postStorage from '../../../../include/js/postStorage.js';
import syncWIthTransition from '../../../../include/js/syncWIthTransition.js';

export default {

    props: {
        post: {
            type: Object,
            required: true
        },

        pageName: {
            type: String,
            required: false,
            default: 'SHOW'
        },
    },

    mounted() {
        syncWIthTransition.hideFewMiliseconds("navigation-mobile");
    },

    destroyed() {
        syncWIthTransition.hide("navigation-mobile");
    },

    methods: {
        /**
         * Save post to storage
         * then change the route
         */
        clickEditButton: function() {
            postStorage.set(this.post, this.pageName);
            let router = this.$router;
            router.push({ name: 'post-edit', params: { post_id: this.post.id } });
        },
    },

}