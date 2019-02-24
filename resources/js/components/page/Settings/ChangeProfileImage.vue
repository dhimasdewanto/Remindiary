<template>
    <div id="settings-page">

        <!-- Header (Desktop) -->
        <Header :title="trans('settings.changeProfileImage')" />

        <!-- Navbar Mobile Top -->
        <NavbarMobileTop :title="trans('settings.changeProfileImage')" />

        <div class="container settings">
            <div class="card color-theme">
                <div class="card-content">

                    <div v-if="imageUrl" 
                    id="image-upload-container">
                        <img v-if="imageUrl" 
                        :src="imageUrl" 
                        :alt="trans('settings.image')">
                    </div>

                    <div class="file-field input-field">
                        <div class="btn">
                            <span>
                                <i class="material-icons left">image</i>
                                {{ trans('settings.image') }}
                            </span>
                            <!-- Image Input File -->
                            <input @change="onFileSelected"
                            type="file" 
                            accept="image/*">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate color-text" type="text">
                        </div>
                    </div>
                    <span class="color-text-alert" role="alert">
                        <strong>max: 2 MB</strong>
                        <br><br>
                    </span>

                    <!-- Upload Image Button -->
                    <button @click="onUploadImage"
                    class="btn waves-effect waves-light">
                        <span v-if="!isUpload">
                            <span>{{ trans('settings.changeProfileImage') }}</span>
                            <i class="material-icons right">send</i>
                        </span>
                        <span v-else>
                            {{ trans('post.loading') + " (" + uploadProgress + "%)" }}
                            <i class="material-icons right">cloud_upload</i>
                        </span>
                    </button>

                </div>
            </div>
        </div>
    
    </div>
</template>

<!-- Main Script -->
<script src="./ChangeProfileImage.js"></script>