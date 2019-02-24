import meta from './meta.js';

export default {

    methods: {

        redirectIfGuest: function() {
            let redirectPage = '/login';

            if(!this.checkAuth())
                window.location.replace(redirectPage);
        },

        redirectIfAuth: function() {
            let redirectPage = '/app';

            if(this.checkAuth())
                window.location.replace(redirectPage);
        },

        checkAuth: function() {
            if(meta.get('auth_id'))
                return true;
            return false;
        },

    }

}