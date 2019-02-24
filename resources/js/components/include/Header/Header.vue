<template>
    <div id="header" class="desktop">
        <h4>

            <!-- Back Button -->
            <a @click="$router.go(-1)"
            class="color-text-sd">
                <i class="small material-icons left">arrow_back</i>
            </a>

            <!-- Title -->
            <span class="color-text">
                {{ title }}
            </span>

        </h4>
    </div>
</template>

<script src="./Header.js"></script>
