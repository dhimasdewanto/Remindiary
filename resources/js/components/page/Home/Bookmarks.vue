<template>
<!-- Because of dynamic component not work with infinite-loading -->
<!-- Integrated in Home.vue in progress -->

    <div id="home" class="row">

        <NavbarMobileTop :title="'Bookmarks'" />

        <div class="col s12 l2">
            <Navigation :isBookmarks="true" />
        </div>

        <div class="feed col s12 l10">
            <PostFeed :feedType="'bookmarks'" />
        </div>

        <NavigationMobile :isBookmarks="true" />

    </div>
</template>

<script src="./Bookmarks.js"></script>
