<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

// Home Controller
Route::get('/app', 'HomeController@index')->name('app');

// Page Controller
Route::get('/', 'PageController@home')->name('home');
Route::get('/intro', 'PageController@intro')->name('intro');
Route::get('/dhimasdewanto', 'PageController@portofolio')->name('portofolio');
Route::get('/about', 'PageController@about')->name('about');

// Still in Page Controller
Route::get('/app/{any}', 'PageController@app')->where('any', '.*');

// Profile Page
Route::get('/profile/{user_id}', 'ProfileController@show')->name('profile.show');

// Change User Data
Route::post('/user/updateimage', 'UserController@updateImage')->name('user.updateImage');
Route::post('/user/updatename', 'UserController@updateName')->name('user.updateName');
Route::post('/user/updatepassword', 'UserController@updatePassword')->name('user.updatePassword');

// Follow, Unfollow
Route::post('/follow/{user_id}', 'FollowController@follow')->name('follow.follow');
Route::delete('/follow/{user_id}', 'FollowController@unfollow')->name('follow.unfollow');

// Post
Route::get('/post/bookmarks', 'PostController@indexBookmarks')->name('post.bookmarks'); // Must be on top
Route::get('/post/profile/{user_id}', 'PostControllerGuest@indexProfile')->name('post.profile');
Route::get('/post/{post_id}', 'PostControllerGuest@show')->name('post.show');
Route::resource('/post', 'PostController');

// Search
Route::get('/search/users', 'SearchController@users')->name('search.users');
Route::get('/search/posts', 'SearchController@posts')->name('search.posts');

// Notifications
Route::get('/notifications', 'NotificationController@index')->name('notifications.index');
Route::delete('/notifications/{notification_id}', 'NotificationController@destroy')->name('notifications.destroy');

// Pin
Route::post('/pin/pin/{post_id}', 'PinController@pin')->name('pin.pin');
Route::post('/pin/unpin/{post_id}', 'PinController@unpin')->name('pin.unpin');
Route::get('/pin/checkpin/{post_id}', 'PinController@checkPin')->name('pin.checkPin');

// Bookmarks
Route::post('/bookmarks/{post_id}', 'BookmarkController@store')->name('bookmarks.store');
Route::delete('/bookmarks/{post_id}', 'BookmarkController@destroy')->name('bookmarks.destroy');

// Push Subscriptions
Route::post('/subscriptions', 'PushSubscriptionController@update');
Route::post('/subscriptions/delete', 'PushSubscriptionController@destroy');

// Localization
Route::get('/js/lang.js', 'LanguageController@lang')->name('language.lang');
