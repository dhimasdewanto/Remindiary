import Dropdown from './include/Dropdown.vue';
import auth from '../js/auth.js';
import materialize from '../js/materialize.js';
import meta from '../js/meta.js';
import textStyle from '../js/textStyle.js';

export default {
    components: {
        Dropdown,
    },

    created() {
        this.pushNotification();
    },

    mounted() {
        materialize.dropdown();
        this.hideIfGuest();
        this.hideIfAuth();
    },

    data() {
        return {
            auth_id: meta.get('auth_id'),
            auth_name: meta.get('auth_name'),
            auth_image: meta.get('auth_image'),

            notificationsIcon: 'notifications_none',
            notificationsColorIcon: 'color-text-s',
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

        

        /**
         * Hide some item if not login
         * Use in mounted()
         */
        hideIfGuest: function() {
            var home = document.getElementById("desktop-li-home");
            var notifications = document.getElementById("desktop-li-notifications");
            var profile = document.getElementById("desktop-li-profile");
            var dropdown = document.getElementById("dropdown-user");

            if(!auth.methods.checkAuth()) {
                home.style.display = "none";
                notifications.style.display = "none";
                profile.style.display = "none";
                dropdown.style.display = "none";
            }
        },

        hideIfAuth: function() {
            var login = document.getElementById("desktop-li-login");
            var register = document.getElementById("desktop-li-register");

            if(auth.methods.checkAuth()) {
                login.style.display = "none";
                register.style.display = "none";
            }
        },

        checkAuth: function() {
            return auth.methods.checkAuth();
        },



        truncate: function(text) {
            return textStyle.truncate(text, 20);
        }

    }
}