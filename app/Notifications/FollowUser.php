<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;

class FollowUser extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        // return ['database', 'broadcast', WebPushChannel::class];
        return ['database'];
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
        $user_name = auth()->user()->name;
        $user_image = auth()->user()->profile_image;

        $startedFollow = \Lang::get('notifications.startedFollow');
        $openProfile = \Lang::get('notifications.openProfile');

        return (new WebPushMessage)
            ->title($user_name . ' ' . $startedFollow)
            ->icon('/storage/profile_image_nano/' . $user_image)
            ->action($openProfile, 'open_profile')
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
        //     'user' => [
        //         'id' => auth()->user()->id,
        //         'name' => auth()->user()->name,
        //     ]
        // ];

        return [
            'user_id' => auth()->user()->id,
            'user_name' => auth()->user()->name,
            'user_image' => auth()->user()->profile_image,
        ];
    }
}
