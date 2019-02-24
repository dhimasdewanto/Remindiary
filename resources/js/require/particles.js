const cookie = require('../components/include/js/cookie.js');

var theme = 'light';
if(cookie.get('theme') == 'dark')
    theme = 'dark';

const pathname = window.location.pathname;
if(pathname.substring(0, 4) != "/app") {
    particlesJS.load('body', 'assets/particlesjs-'+theme+'.json');

    // It Must Be No Scroll
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no";
}