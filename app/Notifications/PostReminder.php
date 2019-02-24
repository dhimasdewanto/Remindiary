<?php

namespace App\Notifications;

use App\Libs\Controllers\Language;
use App\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;

class PostReminder extends Notification implements ShouldQueue
{
    use Queueable;

    private $post;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Post $post)
    {
        $this->post = $post;

        // Delay Notification
        $when = strtotime($post->remind_datetime)-time();
        $this->delay($when);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast', WebPushChannel::class];
    }

    /**
     * Get the broadcastable representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return BroadcastMessage
     */
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage($this->getReturn());
    }

    /**
     * Get the database representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return $this->getReturn();
    }

    /**
     * Get the web push representation of the notification.
     *
     * @param  mixed  $notifiable
     * @param  mixed  $notification
     * @return \Illuminate\Notifications\Messages\DatabaseMessage
     */
    public function toWebPush($notifiable, $notification)
    {
        $post_title = $this->post->title;

        $openPost = \Lang::get('notifications.openPost');

        return (new WebPushMessage)
            ->title($post_title)
            ->icon('/img/image_notifications_postreminder.png')
            ->body( $this->getWebPushBody() )
            ->action($openPost, 'open_post')
            ->data( $this->getReturn() );
    }

    /**
     * Get return data to all channels
     * 
     * @return array
     */
    private function getReturn()
    {
        // Don't return object like this:
        // return [
        //     'post' => [
        //         'id' => $this->post->id,
        //         'title' => $this->post->title,
        //         'remind_date' => $this->post->remind_date,
        //         'remind_time' => $this->post->remind_time,
        //     ],
        // ];

        return [
            'post_id' => $this->post->id,
            'post_title' => $this->post->title,
            'post_remind_date' => $this->post->remind_date,
            'post_remind_time' => $this->post->remind_time,
        ];
    }

    /**
     * Get body for toWebPush
     * 
     * @return string
     */
    private function getWebPushBody()
    {
        $dateFormat = "%a, %e %b %Y";

        $timeFormat = "h:i A";
        if(Language::get() == 'id')
            $timeFormat = "H:i";

        $remind_date = $this->post->remind_date;
        $remind_time = $this->post->remind_time;

        // If null, don't convert
        if($remind_date)
            $remind_date = strftime( $dateFormat, strtotime($remind_date) );
        if($remind_time)
            $remind_time = date( $timeFormat, strtotime($remind_time) );

        if($remind_date && $remind_time)
            return $remind_date . ' - ' . $remind_time;

        if($remind_time)
            return $remind_time;

        return $remind_date;
    }
}
