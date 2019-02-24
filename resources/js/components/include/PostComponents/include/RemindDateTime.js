import formatDateTime from '../../js/formatDateTime.js';

export default {

    props: {
        post: {
            type: Object,
            required: true
        }
    },

    methods: {
        convertDate: function(date) {
            return formatDateTime.dateToShow(date);
        },

        convertTime: function(time) {
            return formatDateTime.timeToShow(time);
        },
    }

}