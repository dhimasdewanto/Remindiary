module.exports = {

    /**
     * Run in mounted
     */
    hideFewMiliseconds: (element_id) => {
        document.getElementById(element_id).style.transition = "0.2s";
        document.getElementById(element_id).style.transform = "scale(0.0)";
        window.setTimeout(function() {
            document.getElementById(element_id).style.transform = "scale(1.0)";
        }, 300);
    },

    /**
     * Run in destroyed
     */
    hide: (element_id) => {
        document.getElementById(element_id).style.transition = "0.0s";
        document.getElementById(element_id).style.transform = "scale(0.0)";
    }

}