import materialize from '../../../../include/js/materialize.js';

export default {

    props: {
        post: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            remind_date: '',
        }
    },

    created() {
        this.remind_date = this.post.remind_date;
    },

    mounted() {
        materialize.modal();
        materialize.datePicker();
        materialize.timePicker();
    },

    methods: {
        
        /**
         * Send data to parent
         * @param {*} event 
         */
        onChangePost: function(event) {
            this.post = this.getRemind(this.post);
            this.$emit('changedPost', this.post);
        },

        /**
         * Get Remind Date and Time from id
         * IDK why can't use v-model
         */
        getRemind: function(post) {
            if(document.getElementById("remind_date") != null)
                post.remind_date = document.getElementById("remind_date").value;

            if(document.getElementById("remind_date_end") != null)
                post.remind_date_end = document.getElementById("remind_date_end").value;

            if(document.getElementById("remind_time") != null)
                post.remind_time = document.getElementById("remind_time").value;

            if(document.getElementById("remind_time_end") != null)
                post.remind_time_end = document.getElementById("remind_time_end").value;

            return post;
        }

    }

}