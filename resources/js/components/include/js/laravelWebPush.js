import axios from 'axios';

export default {

    methods: {
        
        /**
         * Initialize service worker for web push
         */
        initialiseServiceWorker: function() {
            if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                console.log('Notifications aren\'t supported.');
                return;
            }
    
            if (Notification.permission === 'denied') {
                console.log('The user has blocked notifications.');
                return;
            }
    
            if (!('PushManager' in window)) {
                console.log('Push messaging isn\'t supported.');
                return;
            }
    
            navigator.serviceWorker.ready.then(registration => {
                registration.pushManager.getSubscription()
                    .then(subscription => {
                        if (!subscription) {
                            return;
                        }
            
                        this.updateSubscription(subscription);
                    })
                    .catch(error => {
                        console.log('Error during getSubscription()', error);
                    })
            })
        },

        /**
         * Subscribe for push notifications.
         */
        subscribe: function() {
            navigator.serviceWorker.ready.then(registration => {
                const vapidPublicKey = process.env.MIX_VAPID_PUBLIC_KEY;

                const options = { 
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
                }
        
                registration.pushManager.subscribe(options)
                    .then(subscription => {
                        this.updateSubscription(subscription);
                    })
                    .catch(error => {
                        if (Notification.permission === 'denied') {
                            console.log('Permission for Notifications was denied');
                        } 
                        else {
                            console.log('Unable to subscribe to push.', error);
                        }
                    });
            });
        },

        /**
         * Send a request to the server to update user's subscription.
         *
         * @param {PushSubscription} subscription
         */
        updateSubscription: function(subscription) {
            const key = subscription.getKey('p256dh');
            const token = subscription.getKey('auth');
            
            const data = {
                endpoint: subscription.endpoint,
                key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
                token: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null
            }

            axios.post('/subscriptions', data)
                .then(() => {  });
        },

        /**
         * https://github.com/Minishlink/physbook/blob/02a0d5d7ca0d5d2cc6d308a3a9b81244c63b3f14/app/Resources/public/js/app.js#L177
         *
         * @param  {String} base64String
         * @return {Uint8Array}
         */
        urlBase64ToUint8Array: function(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/')

            const rawData = window.atob(base64)
            const outputArray = new Uint8Array(rawData.length)

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i)
            }

            return outputArray
        },

    },

}