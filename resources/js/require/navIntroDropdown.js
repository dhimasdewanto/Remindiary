const cookie = require('../components/include/js/cookie.js');

/**
 * Declare Dropdown
 */
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-nav-intro');
    M.Dropdown.init(elems, {});

    setDefaultSelectedLang();
}, {
    passive: true
});



/**
 * OnClick Select Theme
 */
if( document.getElementById("select-theme-dark") ) {
    document.getElementById("select-theme-dark").addEventListener("click", function() {
        selectTheme('dark');
        particlesJS.load('body', 'assets/particlesjs-dark.json');
    }, {
        passive: true
    });
}
if( document.getElementById("select-theme-light") ) {
    document.getElementById("select-theme-light").addEventListener("click", function() {
        selectTheme('light');
        particlesJS.load('body', 'assets/particlesjs-light.json');
    }, {
        passive: true
    });
}

function selectTheme(theme) {
    var body = document.getElementById("body");

    cookie.delete("theme");

    body.className = "theme-" + theme;
    cookie.set("theme", theme);
}



/**
 * OnClick Select Lang
 */
if( document.getElementById("select-lang-id") ) {
    document.getElementById("select-lang-id").addEventListener("click", function() {
        selectLang('id');
    }, {
        passive: true
    });
}
if( document.getElementById("select-lang-en") ) {
    document.getElementById("select-lang-en").addEventListener("click", function() {
        selectLang('en');
    }, {
        passive: true
    });
}

function selectLang(lang) {
    cookie.delete("lang");
    cookie.set("lang", lang);
    location.reload();
}



function setDefaultSelectedLang() {
    var lang = cookie.get("lang");
    if(lang == null || lang == '')
        lang = document.documentElement.lang;

    if(!document.getElementById('selected-lang')) return;

    if(lang == 'en')
        document.getElementById('selected-lang').innerHTML = "English";
    else 
        document.getElementById('selected-lang').innerHTML = "Bahasa Indonesia";
}