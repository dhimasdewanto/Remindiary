<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Libs\ImageProcess\StoreImage;
use App\Libs\ImageProcess\DeleteImage;
use App\User;
use App\Follow;

class UserController extends Controller
{

    /**
     * Create a new controller instance.
     * Need auth user.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function updateImage(Request $request)
    {
        $user = auth()->user();
        $user->profile_image = $this->saveAndGetImage($request, $user);
        $user->save();

        return response()->json([
            'success' => 'success update image',
            'profile_image' => $user->profile_image
        ], 200);
    }

    public function updateName(Request $request)
    {
        $this->validateName($request);

        $user = auth()->user();
        $user->name = $request->name;
        $user->save();

        return response()->json([
            'success' => 'success update name'
        ], 200);
    }

    public function updatePassword(Request $request)
    {
        if(!$this->checkCurrentPassword($request))
            return response()->json([
                'error' => 'confirm password does not match'
            ], 409);

        $this->validateNewPassword($request);

        $user = auth()->user();
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'success' => 'success update password'
        ], 200);
    }

    private function saveAndGetImage(Request $request, User $user)
    {
        $image_name = StoreImage::save($request, "profile_image");

        // Delete previous image if StoreImage save the image
        if($image_name != null)
            DeleteImage::delete($user->profile_image, "profile_image");

        // Set image_name to previous image if StoreImage does not save the image
        if($image_name == null)
            $image_name = $user->profile_image;

        return $image_name;
    }

    private function validateName(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3|max:100'
        ]);
    }

    private function validateNewPassword(Request $request)
    {
        $this->validate($request, [
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|same:password'
        ]);
    }

    private function checkCurrentPassword(Request $request)
    {
        $current_passowrd = auth()->user()->password;

        if(Hash::check($request->current_password, $current_passowrd))
            return true;

        return false;
    }
}
