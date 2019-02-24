import Header from '../../include/Header/Header.vue';
import NavbarMobileTop from '../../include/NavbarMobileTop/NavbarMobileTop.vue';

import auth from '../../include/js/auth.js';

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
            current_password: "",
            password: "",
            password_confirmation: "",

            currentPasswordError: false,
            newPasswordError: false,
            passwordLengthError: false,
            confirmPasswordError: false,
        }
    },

    methods: {
        updatePassword: function() {
            this.resetErrorMessage();

            if(!this.checkPasswordLength()) return null;
            if(!this.checkNewPassword()) return null;
            if(!this.checkConfirmPassword()) return null;

            let router = this.$router;

            axios.post('/user/updatepassword', {
                current_password: this.current_password,
                password: this.password,
                password_confirmation: this.password_confirmation,
            }).then(res => {
                router.push({ name: 'settings' });
            }).catch(err => {
                if(err.message == "Request failed with status code 409")
                    this.currentPasswordError = true;
            });
        },

        resetErrorMessage: function() {
            this.currentPasswordError = false;
            this.passwordLengthError = false;
            this.confirmPasswordError = false;
        },

        checkConfirmPassword: function() {
            if(this.password == this.password_confirmation)
                return true;

            this.confirmPasswordError = true;
            return false;
        },

        checkNewPassword: function() {
            if(this.password != this.current_password)
                return true;

            this.newPasswordError = true;
            return false;
        },

        checkPasswordLength: function() {
            if(this.password.length >= 6)
                return true;

            this.passwordLengthError = true;
            return false;
        },
    }
}