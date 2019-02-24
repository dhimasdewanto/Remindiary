<?php

namespace App\Libs\ImageProcess;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

class StoreImage
{
    private static $extension;
    private static $fileNameWithExtension;
    private static $fileName;
    private static $fileNameToStore;
    private static $image_file;
    private static $folderName;

    /**
     * Save image to public storage folder
     * Warning: Folder Name must equal to input name (request name)
     * 
     * @param Illuminate\Http\Request $request
     * @param string $folderName
     * @return $fileNameToStore OR null
     */
	public static function save(Request $request, string $folderName)
    {
        if($request->hasFile($folderName))
        {
            self::$image_file = $request->file($folderName);
            self::$folderName = $folderName;

            self::$extension = self::$image_file->getClientOriginalExtension();
            self::$fileNameWithExtension = self::$image_file->getClientOriginalName();
            self::$fileName = pathinfo(self::$fileNameWithExtension, PATHINFO_FILENAME);
            self::$fileNameToStore = time().'-'.self::$fileName.'.'.self::$extension;

            self::storeRaw();
            self::storeSmaller();
            return self::$fileNameToStore;
        }

        return null;
    }

    /**
     * Save raw image upload to storage
     */
    private static function storeRaw()
    {
        self::$image_file
            ->storeAs('public/'.self::$folderName.'/'
                    , self::$fileNameToStore);
    }

    /**
     * To decrease image resolution and size
     * Increase upload time (slower performance)
     */
    private static function storeSmaller()
    {
        self::storeSmallerProcess(600, '_mini');
        self::storeSmallerProcess(200, '_micro');
        self::storeSmallerProcess(64, '_nano');
    }

    /**
     * Store image in different resolution
     * 
     * @param int $size
     * @param string $extendFolder
     */
    private static function storeSmallerProcess(int $size, string $extendFolder)
    {
        $img = Image::make(self::$image_file);

        if($img->width() > $size)
        {
            $img->resize($size, null, function ($constraint) {
                $constraint->aspectRatio();
            });

            Storage::put('public/'.self::$folderName.$extendFolder.'/'.self::$fileNameToStore
                        , (string) $img->encode(self::$extension, 90));
        }
        else
        {
            self::$image_file
                ->storeAs('public/'.self::$folderName.$extendFolder.'/'
                        , self::$fileNameToStore);
        }
    }
}
