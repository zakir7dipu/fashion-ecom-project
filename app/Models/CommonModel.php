<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Intervention\Image\Facades\Image;
use Modules\Backend\App\Models\Product;

class CommonModel extends Model
{
   public function ImageResizeProcess($imageFile,$updatePath,$mediaPath,$width,$height)
   {
       $x = 'abcdefghijklmnopqrstuvwxyz0123456789';
       $x = str_shuffle($x);
       $x = substr($x, 0, 6) . '.PIB.';
       if (file_exists($updatePath)) {unlink($updatePath);}
       $filename = time() . '.' .$x. $imageFile->getClientOriginalExtension();
       $path = public_path($mediaPath.$filename);
       $save_file_path = $mediaPath . $filename;
       //$image = Image::make($imageFile->getRealPath());
       Image::make($imageFile->getRealPath())->resize($width, $height)->save($path);
//       $image->resize($width, $height, function ($constraint) {
//           $constraint->aspectRatio();
//           $constraint->upsize();
//       })->save($path);

       return $save_file_path;
   }

   public function ImageNameGenerate($image)
   {
       $x = 'abcdefghijklmnopqrstuvwxyz0123456789';
       $x = str_shuffle($x);
       $x = substr($x, 0, 6) . '.PIB.';
       $filename = time() . '.' .$x.$image->getClientOriginalExtension();;
       return $filename;
   }


    public function old___ImageResizeProcess($imageFile, $updatePath, $mediaPath, $width, $height)
    {
        // Generate a unique filename
        $x = 'abcdefghijklmnopqrstuvwxyz0123456789';
        $x = str_shuffle($x);
        $x = substr($x, 0, 6) . '.PIB.';

        // Remove existing file if it exists
        if ($updatePath && file_exists($updatePath)) {
            unlink($updatePath);
        }

        $filename = time() . '.' . $x . $imageFile->getClientOriginalExtension();
        $path = public_path($mediaPath . $filename);
        $save_file_path = $mediaPath . $filename;

        $filename = time() . '.' . $x . $imageFile->getClientOriginalExtension();
        $path = public_path($mediaPath . $filename);
        $save_file_path = $mediaPath . $filename;

        // Load the image from the file
        $image = Image::make($imageFile->getRealPath());

        // Fit the image to the exact dimensions
        $image->resize($width, $height);


        // Save the final image to the specified path
        $image->save($path);

        return $save_file_path;

//        // Load the image from the file
//        $image = Image::make($imageFile->getRealPath());
//
//        // Resize the image to fit within the target dimensions while maintaining aspect ratio
//        $image->resize($with, $height, function ($constraint) {
//            $constraint->aspectRatio();
//            $constraint->upsize();
//        });
//
//        // Create a canvas with the target dimensions
//        $canvas = Image::canvas($with, $height);
//
//        // Insert the resized image into the center of the canvas
////        $canvas->insert($image, 'center');
//
//        // Save the final image to the specified path
//        $image->save($path);

    }



    public function ImageNotResizeProcess($imageFile,$updatePath,$mediaPath)
    {
        $x = 'abcdefghijklmnopqrstuvwxyz0123456789';
        $x = str_shuffle($x);
        $x = substr($x, 0, 6) . '.PIB.';
        if (file_exists($updatePath)) {unlink($updatePath);}
        $filename = time() . '.' .$x. $imageFile->getClientOriginalExtension();
        $path = public_path($mediaPath.$filename);
        $save_file_path = $mediaPath . $filename;
        Image::make($imageFile->getRealPath())->save($path);
        return $save_file_path;
    }


    public function ProductFilter($sub_categories)
    {
        $formattedArray = [];
        $collectionItems = [];
        foreach ($sub_categories as $subcategory) {
            $product_count = Product::where('sub_category_id',$subcategory->id)->count();
            $collectionItems[] = [
                'title' => $subcategory->name,
                'count' => $product_count,
            ];
        }

        $formattedArray[] = [
            'title' => 'Collection',
            'isRange' => false,
            'dataItems' => $collectionItems,
        ];

        $color ="";
        foreach ($sub_categories as $subcategory) {
            $products = Product::where('sub_category_id',$subcategory->id)->get();
            foreach ($products as $product){
                $color .= $product->colors. ',';
            }
        }
        $inputString = rtrim($color, ',');
        $array = explode(',', $inputString);
        $colorArrays = array_unique($array);


        $collectionItemsColor = [];
        foreach ($colorArrays as $colorArray) {
            $productsWithRed = Product::whereRaw('FIND_IN_SET(?, colors)', [$colorArray])->count();
            $collectionItemsColor[] = [
                'title' => $colorArray,
                'count' => $productsWithRed,
            ];
        }
        $formattedArray[] = [
            'title' => 'Color',
            'isRange' => false,
            'dataItems' => $collectionItemsColor,
        ];


        $sizes ="";
        foreach ($sub_categories as $subcategory) {
            $products = Product::where('sub_category_id',$subcategory->id)->get();
            foreach ($products as $product){
                $sizes .= $product->size. ',';
            }
        }
        $inputString = rtrim($sizes, ',');
        $array = explode(',', $inputString);
        $sizeArrays = array_unique($array);


        $collectionItemsSize = [];
        foreach ($sizeArrays as $sizeArray) {
            $productsWithSize = Product::whereRaw('FIND_IN_SET(?, colors)', [$sizeArray])->count();
            $collectionItemsSize[] = [
                'title' => $sizeArray,
                'count' => $productsWithSize,
            ];
        }
        $formattedArray[] = [
            'title' => 'Size',
            'isRange' => false,
            'dataItems' => $collectionItemsSize,
        ];


        $formattedArray[] = [
            'title' => 'Price',
            'isRange' => true,
            'dataItems' => [
                'maxValue' => 500,
                'minValue' => 50,
                'max' => 5000,
            ],
        ];
        return $formattedArray;
    }



}
