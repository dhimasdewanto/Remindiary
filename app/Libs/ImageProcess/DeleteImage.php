<?php

namespace App\Libs\ImageProcess;

use Illuminate\Support\Facades\Storage;

class DeleteImage
{
    /**
     * Delete image data from storage
     *
     * @param string $image -> image name in database
     * @param string $foldername
     * @return string $image -> image name in database
     */
    public static function delete(string $image, string $folderName)
    {
        if($image && $image != "default_image.jpg") {
            Storage::delete('public/'.$folderName.'/'.$image);
            Storage::delete('public/'.$folderName.'_mini/'.$image);
            Storage::delete('public/'.$folderName.'_micro/'.$image);
            Storage::delete('public/'.$folderName.'_nano/'.$image);
            $image = null;
        }

        return $image;
    }
}