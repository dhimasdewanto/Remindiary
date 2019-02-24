// Import Vue JS
window.Vue = require('vue');

// Import Localization
require('./import/localization');

// Import Route List
const routeList = require('./import/routeList');

// Import Vue Router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Create Vue Router
const router = new VueRouter({
    mode: 'history',
    routes: routeList.get(),
});

// Declare Vue JS
import App from '../components/App.vue';
const app = new Vue({
    el: '#app',
    components: { App },
    router,
});