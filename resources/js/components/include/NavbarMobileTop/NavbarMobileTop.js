import auth from '../js/auth.js';
import meta from '../js/meta.js';
import textStyle from '../js/textStyle.js';

export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },

    created() {
        this.pushNotification();
    },

    mounted() {
        this.checkRoute();
    },

    data() {
        return {
            btn_back: false,

            auth_id: meta.get('auth_id'),
            notificationsIcon: 'notifications_none',
            notificationsColorIcon: 'color-text-s',
        }
    },

    watch:{
        // Check if route has changed
        $route(to, from) {
            this.checkRoute();
        }
    },

    methods: {

        /**
         * Push Notification with Pusher
         */
        pushNotification: function() {
            Echo.private('App.User.' + this.auth_id).notification((notification) => {
                this.notificationsIcon = 'notifications_active';
                this.notificationsColorIcon = 'color-text-p';
            });
        },

        onClickNotifications: function() {
            this.notificationsIcon = 'notifications_none';
            this.notificationsColorIcon = 'color-text-s';
        },

        onClickBack: function() {
            sessionStorage.routeAction = 'BACK'; // For Router Transition
            this.$router.go(-1);
        },

        /**
         * Hide back button in home page
         */
        checkRoute: function() {
            this.btn_back = false;

            const route = this.$route.name;
            if(route == "home" || route == "my-profile")
                this.btn_back = false;
            else
                this.btn_back = true;
        },

        truncate: function(text) {
            return textStyle.truncate(text, 15);
        },

        checkAuth: function() {
            return auth.methods.checkAuth();
        },

    }
}