import materialize from '../js/materialize.js';
import axios from 'axios';

export default {

    props: {
        post: {
            type: Object,
            required: true
        }
    },

    mounted() {
        materialize.modal();
    },

    methods: {

        deletePost: function(post_id) {
            let router = this.$router;

            axios.delete('/post/' + post_id)
            .then(function(res) {
                router.push({ name: 'home' });
            }).catch(function(err) {
                console.log(err);
            });
        },

    }

}