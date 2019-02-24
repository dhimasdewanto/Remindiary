export default {
    data() {
        return {
            tempSearch: "",
        }
    },

    methods: {

        /**
         * Send search data to parent
         * @param {*} event 
         */
        onChangeSearch: function(event) {
            this.$emit('changedSearch', this.tempSearch);
        },

    }
}