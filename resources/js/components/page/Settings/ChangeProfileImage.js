import Header from '../../include/Header/Header.vue';
import NavbarMobileTop from '../../include/NavbarMobileTop/NavbarMobileTop.vue';

import auth from '../../include/js/auth.js';
import materialize from '../../include/js/materialize.js';
import meta from '../../include/js/meta.js';

import axios from 'axios';

export default {

    components: {
        Header,
        NavbarMobileTop,
    },

    created() {
        auth.methods.redirectIfGuest();
    },

    mounted() {
        materialize.tooltips();
    },

    data() {
        return {
            selectedFile: null,
            imageUrl: null,
            max_upload_size: 2048000, // In Bytes

            isUpload: false,
            uploadProgress: 0,
        }
    },

    methods: {
        onFileSelected: function(event) {
            // Probably in bytes
            const image_file_size = event.target.files[0].size;
            if(!this.validateImageFileSize(image_file_size))
                return;

            const image_file = event.target.files[0];
            this.selectedFile = image_file;
            this.imageUrl = URL.createObjectURL(image_file);
        },

        validateImageFileSize: function(image_file_size) {
            if(image_file_size > this.max_upload_size) {
                M.Toast.dismissAll();
                M.toast({html: this.trans('settings.invalidImageFileSize')});
                return false;
            }
            return true;
        },

        onUploadImage: function() {
            let router = this.$router;

            const formData = new FormData();
            formData.append('profile_image', this.selectedFile, this.selectedFile.name);

            axios.post('/user/updateimage', formData, {
                onUploadProgress: uploadEvent => {
                    this.isUpload = true;
                    this.uploadProgress = Math.round(uploadEvent.loaded / uploadEvent.total * 100);
                }
            }).then(res => {
                meta.set("auth_image", res.data.profile_image);
                router.push({ name: 'my-profile' });
                this.isUpload = false;
            }).catch(err => {
                console.log(err);
                this.isUpload = false;
            });
        },
    }
}