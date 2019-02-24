const axios = require('axios');

export default function(post) {
    if(post.isBookmark)
        return destroy(post);
        
    return store(post);
}

function store(post) {
    axios.post('/bookmarks/' + post.id)
    .then(res => {
        return res.data;
    }).then(res => {
        post.isBookmark = true;
    }).catch(err => {
        console.log(err);
    });

    return post;
}

function destroy(post) {
    axios.delete('/bookmarks/' + post.id)
    .then(res => {
        return res.data;
    }).then(res => {
        post.isBookmark = false;
    }).catch(err => {
        console.log(err);
    });

    return post;
}
