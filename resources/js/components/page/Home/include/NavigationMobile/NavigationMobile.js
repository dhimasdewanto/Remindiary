import syncWIthTransition from '../../../../include/js/syncWIthTransition.js';

export default {

    props: {
        isBookmarks: {
            type: Boolean,
            required: false
        }
    },

    mounted() {
        syncWIthTransition.hideFewMiliseconds("navigation-mobile");
    },

    destroyed() {
        syncWIthTransition.hide("navigation-mobile");
    },

}