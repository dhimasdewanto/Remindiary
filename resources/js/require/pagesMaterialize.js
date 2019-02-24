document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltip-pages');
    M.Tooltip.init(elems, {});
}, {
    passive: true
});