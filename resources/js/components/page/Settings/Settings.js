import Header from '../../include/Header/Header.vue';
import NavbarMobileTop from '../../include/NavbarMobileTop/NavbarMobileTop.vue';

import auth from '../../include/js/auth.js';
import cookie from '../../include/js/cookie.js';
import materialize from '../../include/js/materialize.js';
import meta from '../../include/js/meta.js';

export default {

    components: {
        Header,
        NavbarMobileTop,
    },

    created() {
        auth.methods.redirectIfGuest();
    },

    beforeMount() {
        this.setDefaultTheme();
        this.setDefaultLanguage();
    },

    mounted() {
        materialize.select();
    },

    data() {
        return {
            checkTheme: false,
            language: 'en',
            token: meta.get('csrf-token'),
        }
    },

    methods: {
        changeToDefault: function() {
            this.language = document.documentElement.lang; // Seems doesn't work
            this.checkTheme = true;
            this.changeLanguage();
            this.changeTheme();
        },

        changeLanguage: function() {
            cookie.delete("lang");
            cookie.set("lang", this.language);
            location.reload();
        },

        changeTheme: function() {
            this.checkTheme = !this.checkTheme;

            var body = document.getElementById("body");

            cookie.delete("theme");

            if(this.checkTheme == true) {
                body.className = "theme-dark";
                cookie.set("theme", "dark");
            } else {
                body.className = "theme-light";
                cookie.set("theme", "light");
            }
        },

        setDefaultLanguage: function() {
            this.language = cookie.get("lang");
            if(this.language == null || this.language == '')
                this.language = document.documentElement.lang;

            cookie.delete("lang");
            cookie.set("lang", this.language);
        },

        setDefaultTheme: function() {
            if(cookie.get("theme") == "dark") {
                this.checkTheme = true;
            } else if(cookie.get("theme") == "light") {
                this.checkTheme = false;
            }
            else {
                this.checkTheme = false;
                cookie.set("theme", "light");
            }
        },

        logoutEvent: function(event) {
            event.preventDefault();
            document.getElementById('logout-form').submit();
        },
    }
}