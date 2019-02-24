<template>
    <div id="notifications">
        <ul id="slide-out" 
        class="sidenav collection with-header color-theme">

            <!-- Header of Notifications -->
            <li class="collection-header color-theme color-text">
                <h4>{{ trans('notifications.notifications') }}</h4>
            </li>

            <li v-if="notifications.length == 0"
            class="collection-item color-theme color-text">
                <div>
                    {{ trans('notifications.noNotification') }}
                </div>
            </li>

            <li v-else v-for="notification in notifications" :key="notification.id"
            class="collection-item color-theme color-text">

                <!-- FollowUser Notifications -->
                <div v-if="notification.follower">

                    <!-- Close Button -->
                    <a @click="deleteNotification(notification.id)" 
                    class="secondary-content">
                        <i class="material-icons color-text-alert">close</i>
                    </a>
                    
                    <!-- Notification Message -->
                    <router-link class="color-text-p"
                    :to="{ name: 'profile', params: { user_id: notification.follower['id'] } }">
                        {{ notification.follower['name'] + " " }}
                    </router-link>
                    {{ trans('notifications.startedFollow') }}

                </div>

                <!-- PostReminder Notifications -->
                <div v-else-if="notification.post">

                    <!-- Close Button -->
                    <a @click="deleteNotification(notification.id)" 
                    class="secondary-content">
                        <i class="material-icons color-text-alert">close</i>
                    </a>

                    <!-- Notification Message -->
                    <router-link class="color-text-p"
                    :to="{ name: 'post-show', params: { post_id: notification.post['id'] } }">
                        {{ notification.post['title'] }}
                    </router-link>

                    <!-- Post Remind Date and Time -->
                    <p>
                        <!-- Date -->
                        {{ convertDate(notification.post['remind_date']) }}
                        <!-- Divider -->
                        <span v-if="notification.post['remind_time'] && notification.post['remind_time']">
                            {{ " - " }}
                        </span>
                        <!-- Time -->
                        {{ convertTime(notification.post['remind_time']) }}
                    </p>

                </div>

            </li>

        </ul>
    </div>
</template>

<script src="./Notifications.js"></script>
