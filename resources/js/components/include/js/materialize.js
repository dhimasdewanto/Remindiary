const cookie = require('./cookie.js');
const addScrollBarToApp = require('./addScrollBarToApp.js');

module.exports = {
    modal: () => {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {
            startingTop: '20%', // Starting animation of Modal
            endingTop: '35%', // Location of Modal
        });
    },

    sideNav: () => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {
            edge: 'right',
            onCloseEnd: function() {
                addScrollBarToApp.add();
            }
        });
    },

    select: () => {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    },

    tooltips: () => {
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems, {});
    },

    dropdown: () => {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {constrainWidth: false});
    },

    floatingActionButton: () => {
        var elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {});
    },

    datePicker: () => {
        var elems = document.querySelectorAll('.datepicker');

        if(cookie.get('lang') == 'id') {
            M.Datepicker.init(elems, {
                showClearBtn: true,
                format: 'ddd, d mmm yyyy',
                i18n: {
                    cancel: 'Batal',
                    clear: 'Hapus',
                    done: 'Ok',

                    weekdaysShort: ["Min","Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
                    weekdaysAbbrev: ['M', 'S', 'S', 'R', 'K', 'J', 'S'],

                    months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
                    monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                }
            });
        }

        else if(cookie.get('lang') == 'en') {
            M.Datepicker.init(elems, {
                showClearBtn: true,
                format: 'ddd, d mmm yyyy'
            });
        }
    },

    timePicker: () => {
        var elems = document.querySelectorAll('.timepicker');

        var twelveHour = true;
        if(cookie.get('lang') == 'id')
            twelveHour = false;

        M.Timepicker.init(elems, {
            showClearBtn: true,
            twelveHour: twelveHour
        });
    }
}
