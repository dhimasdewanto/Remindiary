const moment = require('moment');
const cookie = require('./cookie.js');

module.exports = {
    dateToSend: (date) => {
        if(date == "" || date == null) return null;
        moment.locale(cookie.get('lang'));
        date = moment(date, 'ddd, D MMM YYYY');
        date = date.format('YYYY-MM-DD');
        return date;
    },

    dateToShow: (date) => {
        if(date == "" || date == null) return null;
        moment.locale(cookie.get('lang'));
        date = moment(date, 'YYYY-MM-DD');
        date = date.format('ddd, D MMM YYYY');
        return date;
    },

    timeToSend: (time) => {
        if(time == "" || time == null) return null;

        var lang = cookie.get('lang');
        var showFormat = 'hh:mm A';
        moment.locale(lang);

        if(lang == 'id')
            showFormat = 'hh:mm';
            
        time = moment(time, showFormat);
        time = time.format('HH:mm:ss');
        return time;
    },

    timeToShow: (time) => {
        if(time == "" || time == null) return null;

        var lang = cookie.get('lang');
        var showFormat = 'hh:mm A';
        moment.locale(lang);

        if(lang == 'id')
            showFormat = 'HH:mm';

        time = moment(time, 'hh:mm:ss');
        time = time.format(showFormat);
        return time;
    },

    dateTimeToShow: (datetime) => {
        if(datetime == "" || datetime == null) return null;
        moment.locale(cookie.get('lang'));
        datetime = moment(datetime, 'YYYY-MM-DD hh:mm:ss');
        datetime = datetime.format('ddd, D MMM YYYY - HH:mm');
        return datetime;
    }
}
