
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

/**
 * Import Materialize
 * NOTE: Added passive event listener
 */
require('./materialize-js/materialize-modified.js');
// Pure Materialize
// require('./materialize-js/materialize.js');

// Particles JS
require('./require/particles.js');

// Pusher
require('./require/pusher.js');

// Hide Navigation Mobile when Scrolling for Mobile and Tablet
require('./require/hideNavigationMobile.js');

// Dropdown in Nav Intro
require('./require/navIntroDropdown.js');

// Materialize in non Vue
require('./require/pagesMaterialize.js');

// Add Scrollbar to all Vue.js page
require('./require/addScrollBarToApp.js');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
require('./vue/vue');