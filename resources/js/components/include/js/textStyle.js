module.exports = {

    /**
     * Truncate the string text
     * @source https://www.w3resource.com/javascript-exercises/javascript-string-exercise-16.php
     * 
     * @param String text
     * @param int length => length of maximum text, default=100
     * @param String endText => style of truncate, default="..."
     */
    truncate: (text, length, endText) => {
        if (length == null)
            length = 100;

        if (endText == null)
            endText = '...';

        if (text.length <= length)
            return text;

        return text.substring(0, length - endText.length) + endText;
    },

}