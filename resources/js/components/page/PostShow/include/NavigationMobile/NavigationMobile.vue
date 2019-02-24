<template>
    <div id="navigation-mobile" class="mobile">
        <div class="row z-depth-1 color-theme border">
            
            <!-- Delete Button -->
            <div class="col s2">
                <a href="#modal-delete"
                class="btn-large waves-effect modal-trigger color-theme color-text-alert">
                    <i class="material-icons notext">delete</i>
                </a>
            </div>

            <div class="col s4"></div>

            <!-- Edit Button -->
            <div class="col s6">
                <a v-if="post.id"
                @click="clickEditButton"
                class="btn-large waves-effect truncate color-theme color-text-pd">
                    <i class="material-icons">edit</i>
                    {{ trans('post.editPost') }}
                </a>
            </div>

        </div>
    </div>
</template>

<script src="./NavigationMobile.js"></script>
