<template>
    <div id="settings-page">

        <!-- Header (Desktop) -->
        <Header :title="trans('settings.resetPassword')" />

        <!-- Navbar Mobile Top -->
        <NavbarMobileTop :title="trans('settings.resetPassword')" />

        <div class="container settings">
            <div class="card color-theme">

                <div class="card-content">

                    <!-- Current Password -->
                    <div class="input-field">
                        <span class="color-text-s">
                            {{ trans('settings.currentPassword') }}
                        </span>

                        <input v-model="current_password"
                        type="password"
                        autocomplete="off"
                        class="color-text"
                        required>

                        <!-- Current Password Error Message -->
                        <span v-show="currentPasswordError" 
                        class="color-text-alert" role="alert">
                            <strong>
                                {{ trans('settings.currentPasswordError') }}
                            </strong>
                            <br><br>
                        </span>
                    </div>

                    <!-- New Password -->
                    <div class="input-field">
                        <span class="color-text-s">
                            {{ trans('settings.newPassword') }}
                        </span>

                        <input v-model="password"
                        type="password"
                        autocomplete="off"
                        class="color-text"
                        required>

                        <!-- New Password Length Error Message -->
                        <span v-show="passwordLengthError"
                        class="color-text-alert" role="alert">
                            <strong>
                                {{ trans('settings.passwordLengthError') }}
                            </strong>
                            <br><br>
                        </span>

                        <!-- New Password Error Message -->
                        <span v-show="newPasswordError"
                        class="color-text-alert" role="alert">
                            <strong>
                                {{ trans('settings.newPasswordError') }}
                            </strong>
                            <br><br>
                        </span>
                    </div>

                    <!-- Confirm Password -->
                    <div class="input-field">
                        <span class="color-text-s">
                            {{ trans('settings.confirmPassword') }}
                        </span>
                        
                        <input v-model="password_confirmation"
                        type="password"
                        autocomplete="off"
                        class="color-text"
                        required>

                        <!-- Confirm Password Error Message -->
                        <span v-show="confirmPasswordError" 
                        class="color-text-alert" role="alert">
                            <strong>
                                {{ trans('settings.confirmPasswordError') }}
                            </strong>
                            <br><br>
                        </span>
                    </div>

                    <button @click="updatePassword"
                    class="btn waves-effect waves-light">
                        <span>{{ trans('settings.resetPassword') }}</span>
                        <i class="material-icons right">send</i>
                    </button>
                </div>

            </div>
        </div>
    
    </div>
</template>

<!-- Main Script -->
<script src="./ResetPassword.js"></script>
