<?php

namespace Modules\Frontend\App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CommonModel;
use App\Models\CompanySetup;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Backend\App\Models\Categorie;
use Modules\Backend\App\Models\HomeSlider;
use Modules\Backend\App\Models\Product;
use Modules\Backend\App\Models\SubCategorie;
use Modules\Backend\App\Models\SubSubCategory;
use Modules\Frontend\App\Models\WishList;

class WelcomeHomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subcategories = SubCategorie::where('new_arrival', '1')->get();
        $content_slider = SubCategorie::where('home_show', '1')->orderBy('id', 'ASC')->with('products', function ($us) {
            return $us->with('productImage', 'imageGallerys');
        })->get();
        $sliders = HomeSlider::orderBy('id', 'DESC')->get();

        return Inertia::render('Frontend/Home/index', [
            'subcategories' => $subcategories,
            'content_sliders' => $content_slider,
            'sliders' => $sliders,
        ]);
    }

    public function mCategory()
    {
        $subcategories = SubCategorie::where('new_arrival', '1')->get();
        return Inertia::render('Frontend/MobileCategory/index', [
            'subcategories' => $subcategories,
        ]);
    }

//    public function categories()
//    {
//        $categories = Categorie::orderBy('id', 'ASC')->with('subCategories', function ($sub) {
//            return $sub->with('subSubCategorys');
//        })->get();
//        return response()->json($categories);
//    }
//
//    public function company()
//    {
//        $company = CompanySetup::first();
//        return response()->json($company);
//    }
//
//    public function Sliders()
//    {
//        $sliders = HomeSlider::orderBy('id', 'DESC')->get();
//        return response()->json($sliders);
//    }

    public function SubCatProduct($id)
    {
        $sub_cat = SubCategorie::where('slug', $id)->first();
        $sub_categories = SubCategorie::where('categorie_id', 1)->get();

        $productFilter = new CommonModel();
        $formattedArray = $productFilter->ProductFilter($sub_categories);

        $products = Product::where('sub_category_id', $sub_cat->id)->with('productImage', 'imageGallerys')->get();

        return Inertia::render('Frontend/Shop/index', [
            'products' => $products,
            'filterCategories' => $formattedArray,
        ]);
    }

    public function SubCatProductSub($id)
    {
        $sub_sub_cat = SubSubCategory::where('id', $id)->first();
        $sub_cat = SubCategorie::where('id', $sub_sub_cat->sub_categorie_id)->first();
        $sub_categories = SubCategorie::where('categorie_id', $sub_cat->categorie_id)->get();
        $productFilter = new CommonModel();
        $formattedArray = $productFilter->ProductFilter($sub_categories);
        $products = Product::where('sub_sub_category_id', $id)->with('productImage', 'imageGallerys')->get();
        return Inertia::render('Frontend/Shop/index', [
            'products' => $products,
            'filterCategories' => $formattedArray,
        ]);
    }


    public function SubCatProductDiscount()
    {
        $sub_cat = SubCategorie::first();
        if (!empty($sub_cat)) {
            $sub_categories = SubCategorie::where('categorie_id', $sub_cat->categorie_id)->get();
            $productFilter = new CommonModel();
            $formattedArray = $productFilter->ProductFilter($sub_categories);
        } else {
            $formattedArray = [];
        }


        $products = Product::with('productImage', 'imageGallerys')->get();

        return Inertia::render('Frontend/Shop/index', [
            'products' => $products,
            'filterCategories' => $formattedArray,
        ]);
    }


    public function ProductDetails($id)
    {
        if (Auth::user()) {
            $wistList = WishList::where('user_id', Auth::user()->id)->get();
        } else {
            $wistList = [];
        }

        $products = Product::where('slug', $id)->with('productImage', 'imageGallerys')->first();
        if (!$products) {
            return abort(404, 'Product not found');
        }
//        unset($products->size);
        $product_recent = Product::where('categorie_id', $products->categorie_id)
            ->where('id', '!=', $products->id)
            ->with('productImage', 'imageGallerys')
            ->orderBy('id', 'DESC')
            ->get();
        foreach ($product_recent as $product) {
            unset($product->size);
        }
        return Inertia::render('Frontend/Product/index', [
            'products' => $products,
            'product_recent' => $product_recent,
            'wishList' => $wistList,
        ]);
    }


}
