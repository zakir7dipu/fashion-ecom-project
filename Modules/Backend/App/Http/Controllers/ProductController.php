<?php

namespace Modules\Backend\App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CommonModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use Modules\Backend\App\Models\Categorie;
use Modules\Backend\App\Models\ImageGallery;
use Modules\Backend\App\Models\Product;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Modules\Backend\App\Models\ProductImage;
use Modules\Backend\App\Models\ReturnPolicy;
use Modules\Backend\App\Models\Shipping;
use function Symfony\Component\HttpFoundation\expire;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;

        $products = Product::orderBy('id','DESC')
            ->where('name', 'like', '%'.$search.'%')
            ->orWhere('sku', 'like', '%'.$search.'%')
            ->orWhere('description', 'like', '%'.$search.'%')
            ->orWhere('slug', 'like', '%'.$search.'%')
            ->with('productImage','imageGallerys','categorie','subCategorie','subSubCategory','user','shipping')
            ->orWhereHas('categorie', function ($q) use ($search) {
                return $q->where('name', 'LIKE', '%'.$search.'%');
            })->orWhereHas('subCategorie', function ($q) use ($search) {
                return $q->where('name', 'LIKE', '%'.$search.'%');
            })->orWhereHas('subSubCategory', function ($q) use ($search) {
                return $q->where('name', 'LIKE', '%'.$search.'%');
            })->paginate($request->perpage?$request->perpage: 10);


        return Inertia::render('Backend/Products/ProductList', [
            'products' =>$products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $shippings =  Shipping::where('status',"1")->get();
        $categories = Categorie::where('status',"1")->with('subCategories')->with('subCategories.subSubCategorys')->get();
        $return_policy = ReturnPolicy::first();
        return Inertia::render('Backend/Products/AddProducts', [
            'categories' =>$categories,
            'shippings' =>$shippings,
            'return_policy' =>$return_policy,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {

        $imageProcess = new CommonModel();
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'sale_price' => 'required',
            'categorie_id' => 'required',
            'featured_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'product_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'product_image_big' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'product_image_small' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'shipping_id' => 'required',
            'status' => 'required',
        ]);

        if ($request->hasFile('gallery')) {
            $request->validate([
                'gallery.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp',
            ]);
        }

        if ($request->file('size_chart_image')) {
            $request->validate([
                'size_chart_image' => 'image|mimes:jpeg,png,jpg,gif,svg,webp',
            ]);
        }

        if ($request->file('measure_image')) {
            $request->validate([
                'measure_image' => 'image|mimes:jpeg,png,jpg,gif,svg,webp',
            ]);
        }


        try {

            $product = new Product();
            $product->name = $request->name;
            $product->sku = $request->sku;
            $product->description = $request->description;
            $product->offer_for_you = $request->offer_for_you;
            $product->return_exchange_policy = $request->return_exchange_policy;
            $product->regular_price = $request->regular_price;
            $product->sale_price = $request->sale_price;
            $product->categorie_id = $request->categorie_id;
            $product->sub_category_id = $request->sub_category_id;
            $product->sub_sub_category_id = $request->sub_sub_category_id;
            $product->supplier_id = $request->supplier_id;
            $product->in_stock = $request->in_stock;
            $product->hot_product = isset($request->hot_product) ? $request->hot_product:2;
            $product->status = $request->status;
            $product->create_by_user_id = Auth::user()->id;
            $product->colors = isset($request->colors) ? implode(',', $request->colors):null;
            $product->size = isset($request->size) ? implode(',', $request->size):null;
            $product->tags = isset($request->tags) ? implode(',', $request->tags):null;
            $product->material = $request->material;
            $product->shipping_id = $request->shipping_id;
            $product->is_affiliate = isset($request->is_affiliate) ? $request->is_affiliate:0;
            $product->affiliate_percent = $request->affiliate_percent;
            $product->affiliate_percent_user = $request->affiliate_percent_user;
            $product->save();

            $product_image = new ProductImage();
            $product_image->product_id=$product->id;

            if ($request->file('featured_image')){
                $imageFile = $request->file('featured_image');
                $updatePath="";
                $mediaPath='Media/ProductImage/';
                $with=540;
                $height=600;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->featured_image = $save_file_path;
            }

            if ($request->file('product_image')){
                $imageFile = $request->file('product_image');
                $updatePath="";
                $mediaPath='Media/ProductImage/';
                $with=510;
                $height=765;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->product_image = $save_file_path;
            }

            if ($request->file('product_image')){
                $imageFile = $request->file('product_image');
                $updatePath="";
                $mediaPath='Media/ProductImage/';
                $with=510;
                $height=765;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->arrival_image = $save_file_path;
            }

            if ($request->file('product_image')){
                $imageFile = $request->file('product_image');
                $updatePath="";
                $mediaPath='Media/ProductImage/';
                $with=510;
                $height=765;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->product_image_large = $save_file_path;
            }

            if ($request->file('product_image_big')){
                $imageFile = $request->file('product_image_big');
                $updatePath="";
                $mediaPath='Media/ProductImage/';
                $with=260;
                $height=390;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->product_image_big = $save_file_path;
            }

            if ($request->file('product_image_small')){
                $imageFile = $request->file('product_image_small');
                $updatePath="";
                $mediaPath='Media/ProductImage/';
                $with=80;
                $height=120;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->product_image_small = $save_file_path;
            }

            if ($request->file('size_chart_image')){
                $imageFile = $request->file('size_chart_image');
                $updatePath="";
                $mediaPath='Media/ProductImage/';
                $with=580;
                $height=240;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->size_chart_image = $save_file_path;
            }

            if ($request->file('measure_image')){
                $imageFile = $request->file('measure_image');
                $updatePath="";
                $mediaPath='Media/ProductImage/';
                $with=610;
                $height=331;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->measure_image = $save_file_path;
            }

            $product_image->save();


            $images = $request->file('gallery');
            if ($request->hasFile('gallery')) {
                foreach ($images as $image) {
                    $imageGallery = new ImageGallery();
                    $imageGallery->product_id=$product->id;
                    $mediaPath='Media/ProductGallery/';
                    $filename = $imageProcess->ImageNameGenerate($image);
                    $path = public_path($mediaPath.$filename);
                    $save_file_path = $mediaPath . $filename;
                    Image::make($image->getRealPath())->resize(510, 765)->save($path);
                    $imageGallery->image=$save_file_path;
                    $imageGallery->save();
                }
            }

            return redirect()->route('product_list.index')->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('backend::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $shippings =  Shipping::where('status',"1")->get();
        $product = Product::where('id',$id)->with('productImage','imageGallerys')->first();
        $categories = Categorie::with('subCategories')->with('subCategories.subSubCategorys')->get();
        return Inertia::render('Backend/Products/EditProducts', [
            'categories' =>$categories,
            'product' =>$product,
            'shippings' =>$shippings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, $id): RedirectResponse
    {

        $imageProcess = new CommonModel();
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'sale_price' => 'required',
            'categorie_id' => 'required',
            'status' => 'required',
        ]);

        if ($request->file('featured_image')) {
            $request->validate([
                'featured_image' => 'image|mimes:jpeg,png,jpg,gif,svg,webp',
            ]);
        }

        if ($request->file('product_image')) {
            $request->validate([
                'product_image' => 'image|mimes:jpeg,png,jpg,gif,svg,webp',
            ]);
        }

        if ($request->file('product_image_big')) {
            $request->validate([
                'product_image_big' => 'image|mimes:jpeg,png,jpg,gif,svg,webp',
            ]);
        }

        if ($request->file('product_image_small')) {
            $request->validate([
                'product_image_small' => 'image|mimes:jpeg,png,jpg,gif,svg,webp',
            ]);
        }

        if ($request->file('size_chart_image')) {
            $request->validate([
                'size_chart_image' => 'image|mimes:jpeg,png,jpg,gif,svg,webp',
            ]);
        }

        if ($request->file('measure_image')) {
            $request->validate([
                'measure_image' => 'image|mimes:jpeg,png,jpg,gif,svg,webp',
            ]);
        }

        try {

            $product = Product::where('id',$id)->first();
            $product->name = $request->name;
            $product->sku = $request->sku;
            $product->description = $request->description;
            $product->offer_for_you = $request->offer_for_you;
            $product->return_exchange_policy = $request->return_exchange_policy;
            $product->regular_price = $request->regular_price;
            $product->sale_price = $request->sale_price;
            $product->categorie_id = $request->categorie_id;
            $product->sub_category_id = $request->sub_category_id;
            $product->sub_sub_category_id = $request->sub_sub_category_id;
            $product->supplier_id = $request->supplier_id;
            $product->in_stock = $request->in_stock;
            if ($request->hot_product==true){
                $product->hot_product ='1';
            }else{
                $product->hot_product ='2';
            }
            $product->status = $request->status;
            $product->create_by_user_id = Auth::user()->id;
            $product->colors = isset($request->colors) ? implode(',', $request->colors):null;
            $product->size = isset($request->size) ? implode(',', $request->size):null;
            $product->tags = isset($request->tags) ? implode(',', $request->tags):null;
            $product->material = $request->material;
            $product->shipping_id = $request->shipping_id;
            $product->is_affiliate = $request->is_affiliate;
            $product->affiliate_percent = $request->affiliate_percent;
            $product->affiliate_percent_user = $request->affiliate_percent_user;
            $product->save();


            $product_image = ProductImage::where('product_id',$id)->first();
            if ($request->file('featured_image')){
                $imageFile=$request->featured_image;
                $updatePath=$product_image->featured_image;
                $mediaPath='Media/ProductImage/';
                $with=540;
                $height=600;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->featured_image = $save_file_path;
            }

            if ($request->file('product_image')){
                $imageFile=$request->product_image;
                $updatePath=$product_image->product_image;
                $mediaPath='Media/ProductImage/';
                $with=510;
                $height=765;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->product_image = $save_file_path;
            }

            if ($request->file('product_image')){
                $imageFile = $request->file('product_image');
                $updatePath=$product_image->arrival_image;
                $mediaPath='Media/ProductImage/';
                $with=510;
                $height=765;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->arrival_image = $save_file_path;
            }

            if ($request->file('product_image')){
                $imageFile = $request->file('product_image');
                $updatePath=$product_image->product_image_large;
                $mediaPath='Media/ProductImage/';
                $with=510;
                $height=765;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->product_image_large = $save_file_path;
            }

            if ($request->file('product_image_big')){
                $imageFile = $request->file('product_image_big');
                $updatePath=$product_image->product_image_big;
                $mediaPath='Media/ProductImage/';
                $with=260;
                $height=390;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->product_image_big = $save_file_path;
            }

            if ($request->file('product_image_small')){
                $imageFile = $request->file('product_image_small');
                $updatePath=$product_image->product_image_small;
                $mediaPath='Media/ProductImage/';
                $with=80;
                $height=120;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->product_image_small = $save_file_path;
            }

            if ($request->file('size_chart_image')){
                $imageFile = $request->file('size_chart_image');
                $updatePath=$product_image->size_chart_image;
                $mediaPath='Media/ProductImage/';
                $with=580;
                $height=240;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->size_chart_image = $save_file_path;
            }

            if ($request->file('measure_image')){
                $imageFile = $request->file('measure_image');
                $updatePath=$product_image->measure_image;
                $mediaPath='Media/ProductImage/';
                $with=610;
                $height=331;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $product_image->measure_image = $save_file_path;
            }

            $product_image->save();


            $images = $request->file('gallery');
            if ($request->hasFile('gallery')) {
                foreach ($images as $image) {
                    $imageGallery = new ImageGallery();
                    $imageGallery->product_id=$id;
                    $mediaPath='Media/ProductGallery/';
                    $filename = $imageProcess->ImageNameGenerate($image);
                    $path = public_path($mediaPath.$filename);
                    $save_file_path = $mediaPath . $filename;
                    Image::make($image->getRealPath())->resize(510, 765)->save($path);
                    $imageGallery->image=$save_file_path;
                    $imageGallery->save();
                }
            }

            return redirect()->route('product_list.index')->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }


    public function ImageRemove(Request $request)
    {

        try {
            $image = ImageGallery::where(['product_id'=>$request->product_id,'id'=>$request->image_id])->first();
            if ($image){
                if (file_exists($image->image)) {unlink($image->image);}
                $image->delete();
            }
            return back()->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        DB::beginTransaction();

        try {
            $product_image = ProductImage::where('product_id', $id)->first();

            if ($product_image) {
                $imagePaths = [
                    $product_image->featured_image,
                    $product_image->arrival_image,
                    $product_image->product_image,
                    $product_image->size_chart_image,
                    $product_image->measure_image,
                    $product_image->product_image_large,
                    $product_image->product_image_big,
                    $product_image->product_image_small,
                ];

                foreach ($imagePaths as $imagePath) {
                    if (file_exists($imagePath)) {
                        unlink($imagePath);
                    }
                }
                $product_image->delete();
            }
            $imageGalleries = ImageGallery::where('product_id', $id)->get();

            foreach ($imageGalleries as $imageGallery) {
                if (file_exists($imageGallery->image)) {
                    unlink($imageGallery->image);
                }
                $imageGallery->delete();
            }

            Product::where('id', $id)->delete();

            DB::commit();

            return back()->with('status', "Product deleted successfully!");
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('status', "Failed to delete the product!");
        }
    }
}
