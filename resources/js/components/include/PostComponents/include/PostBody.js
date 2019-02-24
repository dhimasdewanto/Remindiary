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
            editorToolbar: [], // No Toolbar for show post body only
        }
    },

}