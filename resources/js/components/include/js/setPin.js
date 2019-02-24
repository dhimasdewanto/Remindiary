const axios = require('axios');

export default function(post) {
    if(post.pin)
        return doUnpin(post);
        
    return doPin(post);
}

function doPin(post) {
    axios.post('/pin/pin/' + post.id)
    .then(res => {
        return res.data;
    }).then(res => {
        post.pin = res.pin;
    }).catch(err => {
        console.log(err);
    });

    return post;
}

function doUnpin(post) {
    axios.post('/pin/unpin/' + post.id)
    .then(res => {
        return res.data;
    }).then(res => {
        post.pin = null;
    }).catch(err => {
        console.log(err);
    });

    return post;
}
