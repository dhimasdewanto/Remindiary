import Header from '../../include/Header/Header.vue';
import NavbarMobileTop from '../../include/NavbarMobileTop/NavbarMobileTop.vue';

import auth from '../../include/js/auth.js';
import meta from '../../include/js/meta.js';

import axios from 'axios';

export default {

    components: {
        Header,
        NavbarMobileTop,
    },

    created() {
        auth.methods.redirectIfGuest();
    },

    data() {
        return {
            name: meta.get("auth_name")
        }
    },

    methods: {
        updateName: function() {
            let router = this.$router;

            axios.post('/user/updatename', {
                name: this.name,
            }).then(res => {
                meta.set("auth_name", this.name);
                router.push({ name: 'my-profile' });
            }).catch(err => {
                console.log(err);
            });
        },
    }
}