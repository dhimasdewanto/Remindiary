/**
 * @borrows https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
 */

var prevScrollpos = window.pageYOffset;

/**
 * Show Navigation Mobile in first time
 */
window.onload = function() {
    var currentScrollPos = window.pageYOffset - 1000;
    hideNav(currentScrollPos);
}

/**
 * Hide Navigation Mobile in scroll
 */
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    hideNav(currentScrollPos);
}

/**
 * Hide Navigation Mobile or Navbar Mobile Top
 * Change value of prevScrollpos to currentScrollPos
 * 
 * @param {*} currentScrollPos 
 */
function hideNav(currentScrollPos) {
    if(document.getElementById("navbar-mobile-top"))
        hideNavbarMobileTop(currentScrollPos);

    if(document.getElementById("navigation-mobile"))
        hideNavMobileBottom(currentScrollPos);

    prevScrollpos = currentScrollPos;
}

/**
 * Hide Navbar Mobile Top
 * 
 * @param {*} currentScrollPos 
 */
function hideNavbarMobileTop(currentScrollPos) {
    if (prevScrollpos > currentScrollPos)
        document.getElementById("navbar-mobile-top").style.top = "0";
    else
        document.getElementById("navbar-mobile-top").style.top = "-60px";
}

/**
 * Hide Navigation Mobile
 * 
 * @param {*} currentScrollPos 
 */
function hideNavMobileBottom(currentScrollPos) {
    if (prevScrollpos > currentScrollPos)
        document.getElementById("navigation-mobile").style.bottom = "50px";
    else
        document.getElementById("navigation-mobile").style.bottom = "-50px";
}