import auth from '../../include/js/auth.js';

export default {
    
    created() {
        auth.methods.redirectIfAuth();
    }

}