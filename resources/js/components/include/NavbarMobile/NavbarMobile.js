import auth from '../js/auth.js';
import meta from '../js/meta.js';

export default {
    mounted() {
        this.checkRoute();
    },

    data() {
        return {
            auth_id: meta.get('auth_id'),
            color: {
                home: false,
                search: false,
                profile: false,
            }
        }
    },

    watch:{
        // Check if route has changed
        $route(to, from) {
            this.checkRoute();
        }
    },

    methods: {

        checkRoute: function() {
            this.color.home = false;
            this.color.search = false;
            this.color.profile = false;

            var route = this.$route.path;
            if(route == "/app/search")
                this.color.search = true;
            else if(this.checkSettingsRoute(route))
                this.color.profile = true;
            else
                this.color.home = true;
        },

        checkSettingsRoute: function(route) {
            if(route == "/app/profile/" + this.auth_id ||
            route == "/app/profile" || 
            route == "/app/settings" || 
            route == "/app/settings/changename" || 
            route == "/app/settings/resetpassword")
                return true;

            return false;
        },

        checkAuth: function() {
            return auth.methods.checkAuth();
        },

    }
}