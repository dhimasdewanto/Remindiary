<template>
    <div id="settings-page">

        <!-- Header (Desktop) -->
        <Header :title="trans('settings.changeName')" />

        <!-- Navbar Mobile Top -->
        <NavbarMobileTop :title="trans('settings.changeName')" />

        <div class="container settings">
            <div class="card color-theme">
                <div class="card-content">

                    <!-- Name Field -->
                    <div class="input-field">
                        <span class="color-text-s">
                            {{ trans('settings.changeName') }}
                        </span>
                        <input v-model="name"
                        type="text"
                        autocomplete="off"
                        class="color-text"
                        required>
                    </div>

                    <!-- Change Name Button -->
                    <button @click="updateName"
                    class="btn waves-effect waves-light">
                        <span>{{ trans('settings.changeName') }}</span>
                        <i class="material-icons right">send</i>
                    </button>

                </div>
            </div>
        </div>
    
    </div>
</template>

<!-- Main Script -->
<script src="./ChangeName.js"></script>
