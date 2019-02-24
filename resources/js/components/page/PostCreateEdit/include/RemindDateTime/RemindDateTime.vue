<template>
    <ul class="remind-date-time collection z-depth-1">

        <!-- Start -->
        <li class="collection-item color-theme color-text">

            <p>
                <i class="material-icons left">date_range</i>
                {{ trans('post.date') }}
            </p>

            <!-- Date Start -->
            <input :value="post.remind_date"
            @change="onChangePost"
            :placeholder="trans('post.start')"
            id="remind_date"
            type="text" 
            class="datepicker color-text"
            autocomplete="off">

            <!-- Date End -->
            <input :value="post.remind_date_end"
            @change="onChangePost"
            :placeholder="trans('post.end')"
            id="remind_date_end"
            type="text" 
            class="datepicker color-text"
            autocomplete="off">

        </li>

        <!-- End -->
        <li class="collection-item color-theme color-text">
            
            <p>
                <i class="material-icons left">access_time</i>
                {{ trans('post.time') }}
            </p>

            <!-- Time Start -->
            <input :value="post.remind_time"
            @change="onChangePost"
            :placeholder="trans('post.start')"
            id="remind_time"
            type="text" 
            class="timepicker color-text"
            autocomplete="off">

            <!-- Time End -->
            <input :value="post.remind_time_end"
            @change="onChangePost"
            :placeholder="trans('post.end')"
            id="remind_time_end"
            type="text" 
            class="timepicker color-text"
            autocomplete="off">

        </li>

    </ul>
</template>

<script src="./RemindDateTime.js"></script>
