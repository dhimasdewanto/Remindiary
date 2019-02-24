// Can't use same Javascript File (with Home.js)

import Navigation from './include/Navigation/Navigation.vue';
import NavigationMobile from './include/NavigationMobile/NavigationMobile.vue';

import PostFeed from '../../include/PostFeed/PostFeed.vue';
import NavbarMobileTop from '../../include/NavbarMobileTop/NavbarMobileTop.vue';

import auth from '../../include/js/auth.js';

export default {
    components: {
        Navigation,
        PostFeed,
        NavigationMobile,
        NavbarMobileTop,
    },

    created() {
        auth.methods.redirectIfGuest();
    }
}
