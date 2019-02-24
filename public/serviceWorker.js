/**
 * Fetch or Cache Response
 * 
 * @borrows https://youtu.be/ksXwaWHCW6k
 */

/**
 * Cache name for service worker
 */
const cacheName = 'remindiary_v6';



// Install Service Worker Event
self.addEventListener('install', null);

// Activate Service Worker Event
self.addEventListener('activate', event => deleteOldCaches(event));

// Call Fetch Event
self.addEventListener('fetch', event => fetchEvent(event));



/**
 * Delete all old caches
 * 
 * @param {*} event 
 */
function deleteOldCaches(event) {
    event.waitUntil(
        caches
            .keys() // Loop through caches
            .then(listCacheNames => {
                return Promise.all(
                    listCacheNames.map(oldCache => {

                        if(oldCache !== cacheName) { // If old cache name not equal to cache name now
                            return caches.delete(oldCache);
                        }

                    })
                );
            })
    );
}

/**
 * Fetch Event
 * 
 * @param {*} event 
 */
function fetchEvent(event) {
    if(isCachePriority(event)) {
        cachePriorityStrategy(event);
        return;
    }

    networkFirstStrategy(event);
}

/**
 * Check if response want to use cache priority strategy
 * 
 * @param {*} event 
 */
function isCachePriority(event) {
    const responseName = extractUrl(event.request.url);

    return (responseName == "app.css" || 
    responseName == "app.js" ||
    responseName == "particles.min.js" ||
    responseName == "setTheme.js");
}

/**
 * Cache, falling back to network
 * 
 * @param {*} event 
 */
function cachePriorityStrategy(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(response => {
                return response ||
                fetch(event.request)
                    .then(fetchResponse => {
                        return cacheRequest(event, fetchResponse);
                    });
            })
    );
}

/**
 * Network falling back to cache
 * 
 * @param {*} event 
 */
function networkFirstStrategy(event) {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                return cacheRequest(event, response);
            })
            .catch(() => { 
                return caches.match(event.request)
                            .then(response => response) // Return response
            })
    );
}

/**
 * Get Request then cache it
 * 
 * @param {*} event 
 * @param {*} response 
 */
function cacheRequest(event, response) {
    const responseClone = response.clone(); // Make copy/clone of response
                
    caches
        .open(cacheName) // Open Cache
        .then(cache => {

            if(event.request.method == 'GET') { // Validate if response is GET method
                cache.put(event.request, responseClone); // Add response to cache
            }

        });

    return response;
}

/**
 * Extract URL to filename
 * 
 * @param string url 
 */
function extractUrl(url) {
    return url.substr( url.lastIndexOf("/") + 1 );
}





/**
 * Laravel Web Push
 * 
 * @borrows https://github.com/laravel-notification-channels/webpush
 */
(() => {
    'use strict';
  
    const WebPush = {
        init () {
            self.addEventListener('push', this.notificationPush.bind(this));
            self.addEventListener('notificationclick', this.notificationClick.bind(this));
            self.addEventListener('notificationclose', this.notificationClose.bind(this));
        },
    
        /**
         * Handle notification push event.
         *
         * https://developer.mozilla.org/en-US/docs/Web/Events/push
         *
         * @param {NotificationEvent} event
         */
        notificationPush (event) {
            if (!(self.Notification && self.Notification.permission === 'granted')) {
                return;
            }
    
            // https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData
            if (event.data) {
                event.waitUntil(
                    this.sendNotification(event.data.json())
                );
            }
        },
    
        /**
         * Handle notification click event.
         *
         * https://developer.mozilla.org/en-US/docs/Web/Events/notificationclick
         *
         * @param {NotificationEvent} event
         */
        notificationClick (event) {
            if(event.action === 'open_profile') {
                return this.openProfile(event);
            }

            if(event.notification.data.user_id) {
                return this.openProfile(event);
            }

            if(event.action === 'open_post') {
                return this.openPost(event);
            }

            if(event.notification.data.post_id) {
                return this.openPost(event);
            }

            self.clients.openWindow('/app');
        },

        /**
         * Open follower profile
         * 
         * @param {NotificationEvent} event 
         */
        openProfile (event) {
            const user_id = event.notification.data.user_id;
            self.clients.openWindow('/app/profile/' + user_id);
            return;
        },

        /**
         * Open post
         * 
         * @param {NotificationEvent} event 
         */
        openPost (event) {
            const post_id = event.notification.data.post_id;
            self.clients.openWindow('/app/post/' + post_id);
            return;
        },
    
        /**
         * Handle notification close event (Chrome 50+, Firefox 55+).
         *
         * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/onnotificationclose
         *
         * @param {NotificationEvent} event
         */
        notificationClose (event) {
            self.registration.pushManager.getSubscription().then(subscription => {
                if (subscription) {
                    this.dismissNotification(event, subscription);
                }
            });
        },
    
        /**
         * Send notification to the user.
         *
         * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
         *
         * @param {PushMessageData|Object} data
         */
        sendNotification (data) {
            return self.registration.showNotification(data.title, data);
        },
    
        /**
         * Send request to server to dismiss a notification.
         *
         * @param  {NotificationEvent} event
         * @param  {String} subscription.endpoint
         * @return {Response}
         */
        dismissNotification ({ notification }, { endpoint }) {
            if (!notification.data || !notification.data.id) {
                return;
            }
    
            const data = new FormData();
            data.append('endpoint', endpoint);
    
            // Send a request to the server to mark the notification as read.
            // fetch(`/notifications/${notification.data.id}/dismiss`, {
            //     method: 'POST',
            //     body: data
            // });
        }
    }
    
    /**
     * Initialize WebPush Event
     */
    WebPush.init();

})();