import auth from '../js/auth.js';
import materialize from '../js/materialize.js';
import formatDateTime from '../js/formatDateTime.js';
import laravelWebPush from '../js/laravelWebPush.js';
import meta from '../js/meta.js';

import axios from 'axios';

export default {

    created() {
        if(auth.methods.checkAuth()) {
            this.pushNotification();
        }
    },

    mounted() {
        if(auth.methods.checkAuth()) {
            materialize.sideNav();
            laravelWebPush.methods.initialiseServiceWorker();
            this.setNotifications();
        }
    },

    data() {
        return {
            notifications: [],
            auth_id: meta.get('auth_id'),
            auth_image: meta.get('auth_image'),
        }
    },

    methods: {

        /**
         * Push Notification with Pusher
         */
        pushNotification: function() {
            Echo.private('App.User.' + this.auth_id).notification((notification) => {
                this.setNotifications();
            });
        },


        
        setNotifications: function() {
            axios.get('/notifications')
            .then(res => {
                return res.data;
            }).then(res => {
                this.notifications = res.notifications;
            }).catch(err => {
                console.log(err);
            });
        },

        deleteNotification: function(notification_id) {
            axios.delete('/notifications/' + notification_id)
            .then(res => {
                return res.data;
            }).then(res => {
                this.deleteThisNotification(notification_id);
            }).catch(err => {
                console.log(err);
            });
        },

        deleteThisNotification: function(notification_id) {
            for (let index = 0; index < this.notifications.length; index++) {
                if(this.notifications[index].id == notification_id)
                    this.notifications.splice(index, 1);
            }
        },



        convertDate: function(date) {
            if(formatDateTime.dateToShow(date) == null)
                return "";
            return formatDateTime.dateToShow(date);
        },

        convertTime: function(time) {
            if(formatDateTime.timeToShow(time) == null)
                return "";
            return formatDateTime.timeToShow(time);
        }

    },

}