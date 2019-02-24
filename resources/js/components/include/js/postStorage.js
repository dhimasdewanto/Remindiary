/**
 * Pust post in storage if page not refreshed
 * Benefit: Heavily increase performance
 * 
 * Use get to get post
 * Use set to save post to localStorage,
 *      ^ Do this after certain behavior except setPostFromNetwork
 * 
 * Must use setPage after components created/mounted
 *      ^ Or in setPostFromLocalStorage (most bottom)
 */

module.exports = {
    check: (post_id, page) => {
        return localStorage.post_temp_id == post_id && localStorage.post_page != page;
    },

    get: (post_id, page) => {
        if(localStorage.post_temp_id == post_id && localStorage.post_page != page)
            return JSON.parse(localStorage.post_temp);
        return null;
    },

    set: (post, page) => {
        localStorage.post_page = page;
        localStorage.post_temp_id = post.id;
        localStorage.post_temp = JSON.stringify(post);
    },

    setPage: (page) => {
        localStorage.post_page = page;
    },
}