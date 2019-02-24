// Add Scrollbar to all Vue.js page

module.exports = {
    add: () => {
        const pathname = window.location.pathname;
        if(pathname.substring(0, 4) == "/app") {
            document.body.style.overflowY = 'scroll';
        }
    }
}