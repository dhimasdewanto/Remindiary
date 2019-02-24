<template>
    <div id="home">

        <NavbarMobileTop :title="'Remindiary'" />

        <div class="row">

            <div class="col s12 l2">
                <Navigation :isAllFeeds="true" />
            </div>

            <div class="feed col s12 l10">
                <PostFeed :feedType="'Home'" />
            </div>

        </div>

        <NavigationMobile />

    </div>
</template>

<script src="./Home.js"></script>
