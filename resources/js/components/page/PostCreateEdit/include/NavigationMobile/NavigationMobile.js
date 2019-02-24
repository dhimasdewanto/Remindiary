import materialize from '../../../../include/js/materialize.js';
import syncWIthTransition from '../../../../include/js/syncWIthTransition.js';

export default {

    props: {
        post: {
            type: Object,
            required: true
        },

        isUpload: {
            type: Boolean,
            required: true
        },

        isUpdate: {
            type: Boolean,
            required: true
        },

        uploadProgress: {
            type: Number,
            required: true
        },
    },

    data() {
        return {
            tempIsBookmark: false, // Can't use post.isBookmark
            tempIsPinned: false, // Can't use post.isPinned

            limitBookmark: true, // Can't set tempIsBookmark in mounted()
            limitPinned: true, // Can't set tempIsPinned in mounted()
        }
    },

    mounted() {
        materialize.tooltips();
        syncWIthTransition.hideFewMiliseconds("navigation-mobile");
    },

    destroyed() {
        syncWIthTransition.hide("navigation-mobile");
    },

    methods: {

        onClickBookmark: function(event) {
            if(this.limitBookmark) {
                this.tempIsBookmark = this.post.isBookmark;
                this.limitBookmark = false;
            }

            this.tempIsBookmark = !this.tempIsBookmark; // Can't use post.isBookmark
            this.post.isBookmark = this.tempIsBookmark;
            this.onChangePost(event);
        },

        onClickPin: function(event) {
            if(this.limitPinned) {
                this.tempIsPinned = this.post.isPinned;
                this.limitPinned = false;
            }

            this.tempIsPinned = !this.tempIsPinned; // Can't use post.isPinned
            this.post.isPinned = this.tempIsPinned;
            this.onChangePost(event);
        },

        /**
         * Send data to parent
         * @param {*} event 
         */
        onChangePost: function(event) {
            this.$emit('changedPost', this.post);
        },

        /**
         * On Click Send Post to parent
         * Don't send post to parent (unsyncronized post data from parent)
         * @param {*} event 
         */
        onClickSendPost: function(event) {
            this.$emit('sendPost');
        },

    }

}