import meta from '../../js/meta.js';

export default {
    data() {
        return {
            csrf: meta.get("csrf-token"),
            auth_id: meta.get('auth_id'),
        }
    },

    methods: {
        logoutEvent: function(event) {
            event.preventDefault();
            document.getElementById('logout-form').submit();
        },
    }
}