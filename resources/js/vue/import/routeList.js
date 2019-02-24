module.exports = {
    get: () => {
        return [

            // Home
            {
                path: '/app',
                name: 'home',
                component: require('../../components/page/Home/Home.vue')
            },
            {
                path: '/app/bookmarks',
                name: 'bookmarks',
                component: require('../../components/page/Home/Bookmarks.vue')
            },
        
            // Search
            {
                path: '/app/search',
                name: 'search',
                component: require('../../components/page/Search/Search.vue')
            },
        
            // Profile
            {
                path: '/app/profile',
                name: 'my-profile',
                component: require('../../components/page/Profile/MyProfile.vue')
            },
            {
                path: '/app/profile/:user_id',
                name: 'profile',
                component: require('../../components/page/Profile/Profile.vue')
            },
        
            // Post
            {
                path: '/app/post/create',
                name: 'post-create',
                component: require('../../components/page/PostCreateEdit/PostCreateEdit.vue'),
                props: { isUpdate: false }
            },
            {
                path: '/app/post/:post_id',
                name: 'post-show',
                component: require('../../components/page/PostShow/PostShow.vue')
            },
            {
                path: '/app/post/:post_id/edit',
                name: 'post-edit',
                component: require('../../components/page/PostCreateEdit/PostCreateEdit.vue'),
                props: { isUpdate: true }
            },
        
            // Settings
            {
                path: '/app/settings',
                name: 'settings',
                component: require('../../components/page/Settings/Settings.vue')
            },
            {
                path: '/app/settings/changename',
                name: 'settings-changename',
                component: require('../../components/page/Settings/ChangeName.vue')
            },
            {
                path: '/app/settings/resetpassword',
                name: 'settings-resetpassword',
                component: require('../../components/page/Settings/ResetPassword.vue')
            },
            {
                path: '/app/settings/changeprofileimage',
                name: 'settings-changeprofileimage',
                component: require('../../components/page/Settings/ChangeProfileImage.vue')
            },

            // Please Login
            {
                path: '/app/pleaselogin',
                name: 'please-login',
                component: require('../../components/page/PleaseLogin/PleaseLogin.vue')
            },

        ];
    }
}