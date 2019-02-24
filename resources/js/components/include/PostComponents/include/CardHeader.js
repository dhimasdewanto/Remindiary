import meta from '../../js/meta.js';
import textStyle from '../../js/textStyle.js';

export default {

    props: {
        post: {
            type: Object,
            required: true
        },
        isBookmarkButton: {
            type: Boolean,
            required: false
        },
    },

    data() {
        return {
            auth_id: meta.get("auth_id"),
        }
    },

    methods: {
        convertVisibility: function(visibility) {
            if(visibility == "private")
                return this.trans('post.private');
            return this.trans('post.public');
        },

        truncate: function(text) {
            return textStyle.truncate(text, 25);
        }
    }

}