<template>
    <div>

        <!-- Date -->
        <!-- Dont refactor -> spacing issue -->
        <div v-if="post.remind_date"
        class="card-action color-text">
            <i class="material-icons left">date_range</i> {{ convertDate(post.remind_date) }}
            <span v-if="post.remind_date_end"> -
                {{ convertDate(post.remind_date_end) }}
            </span>
        </div>

        <!-- Time -->
        <div v-if="post.remind_time"
        class="card-action color-text">
            <i class="material-icons left">access_time</i>
            {{ convertTime(post.remind_time) }}
            <span v-if="post.remind_time_end">
                <span> - {{ convertTime(post.remind_time_end) }}</span>
            </span>
        </div>

    </div>
</template>

<script src="./RemindDateTime.js"></script>
