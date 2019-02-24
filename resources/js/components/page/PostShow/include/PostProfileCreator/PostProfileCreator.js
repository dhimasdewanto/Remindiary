import formatDateTime from '../../../../include/js/formatDateTime';

export default {
    
    props: {
        post: {
            type: Object,
            required: true
        },
    },

    methods: {
        getVisibility: function(visibility) {
            if(visibility == "public")
                return this.trans('post.publicPost');
            return this.trans('post.privatePost');
        },

        convertDateTime: function(datetime) {
            return formatDateTime.dateTimeToShow(datetime);
        },
    }

}