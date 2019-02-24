const formatDateTime = require('../../../../include/js/formatDateTime.js');

module.exports = {
    toSend: (post) => {
        post.remind_date = formatDateTime.dateToSend(post.remind_date);
        post.remind_date_end = formatDateTime.dateToSend(post.remind_date_end);
        post.remind_time = formatDateTime.timeToSend(post.remind_time);
        post.remind_time_end = formatDateTime.timeToSend(post.remind_time_end);
        return post;
    },

    toShow: (post) => {
        post.remind_date = formatDateTime.dateToShow(post.remind_date);
        post.remind_date_end = formatDateTime.dateToShow(post.remind_date_end);
        post.remind_time = formatDateTime.timeToShow(post.remind_time);
        post.remind_time_end = formatDateTime.timeToShow(post.remind_time_end);
        return post;
    },
}