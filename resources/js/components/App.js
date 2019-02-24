import Navbar from './include/Navbar/Navbar.vue';
import NavbarMobile from './include/NavbarMobile/NavbarMobile.vue';
import Notifications from './include/Notifications/Notifications.vue';

import swipe from './include/js/swipe.js';

export default {
    components: {
        Navbar,
        NavbarMobile,
        Notifications,
    },

    data() {
        return {
            transitionName: 'zoom',
        }
    },

    mounted() {
        const _this = this;
        swipe.detect(function() {
            _this.backAction();
        });
    },

    watch:{
        // Check if route has changed
        $route(to, from) {
            if(sessionStorage.routeAction == 'BACK')
                this.transitionName = 'swipe';
            else
                this.transitionName = 'zoom';

            sessionStorage.routeAction = '';
        }
    },
    
    methods: {
        backAction: function() {
            const routeName = this.$route.name;
            if(routeName != 'home' && routeName != 'search' && routeName != 'my-profile') {
                sessionStorage.routeAction = 'BACK'; // For Router Transition
                this.$router.go(-1);
            }
        }
    },
}