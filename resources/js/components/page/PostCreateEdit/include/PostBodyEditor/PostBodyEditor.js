import { VueEditor } from 'vue2-editor'

export default {

    props: {
        post: {
            type: Object,
            required: true
        }
    },

    components: {
        VueEditor,
    },

    data() {
        return {
            editorToolbar: [
                [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['blockquote', 'code-block'],
            ],
        }
    },

    methods: {

        /**
         * Send post data to parent
         * @param {*} event 
         */
        onChangePost: function(event) {
            this.$emit('changedPost', this.post);
        },

    }

}