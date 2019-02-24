<template>
    <ul class="remind-date-time collection z-depth-1">

        <!-- Start -->
        <li v-if="post.remind_date"
        class="collection-item date color-theme color-text">

            <p>
                <i class="material-icons left">date_range</i>
                {{ trans('post.date') }}
            </p>

            <!-- Date Start -->
            <p class="p-datetime">
                <span>{{ trans('post.start') + ": " }}</span>
                {{ convertDate(post.remind_date) }}
            </p>

            <!-- Date End -->
            <p v-if="post.remind_date_end"
            class="p-datetime">
                <span>{{ trans('post.end') + ": " }}</span>
                {{ convertDate(post.remind_date_end) }}
            </p>

        </li>

        <!-- End -->
        <li v-if="post.remind_time"
        class="collection-item time color-theme color-text">
            
            <p>
                <i class="material-icons left">access_time</i>
                {{ trans('post.time') }}
            </p>

            <!-- Time Start -->
            <p class="p-datetime">
                <span>{{ trans('post.start') + ": " }}</span>
                {{ convertTime(post.remind_time) }}
            </p>

            <!-- Time End -->
            <p v-if="post.remind_time_end"
            class="p-datetime">
                <span>{{ trans('post.end') + ": " }}</span>
                {{ convertTime(post.remind_time_end) }}
            </p>

        </li>

    </ul>
</template>

<script src="./RemindDateTime.js"></script>
