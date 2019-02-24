module.exports = {
    get: (metaName) => {
        const metas = document.getElementsByTagName('meta');
          
        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === metaName)
                return metas[i].getAttribute('content');
        }
        
        return null;
    },

    set: (metaName, metaContent) => {
        document.querySelector('meta[name="'+metaName+'"]').setAttribute("content", metaContent);
    },
}