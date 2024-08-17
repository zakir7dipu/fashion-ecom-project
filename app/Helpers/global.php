<?php

use App\Models\CompanySetup;
use Illuminate\Support\Facades\Session;
use Modules\Backend\App\Models\Categorie;

if (!function_exists('getAllCart')) {
    function getAllCart()
    {
        $cart_session = Session::get('product_add_to_cart');
        return response()->json($cart_session);
    }
}


if (!function_exists('getCompanyInfo')) {
    function getCompanyInfo()
    {
        $company = CompanySetup::first();
        return response()->json($company);
    }
}

if (!function_exists('getCategories')) {
    function getCategories()
    {
        $categories = Categorie::orderBy('id', 'ASC')->with('subCategories', function ($sub) {
            return $sub->with('subSubCategorys');
        })->get();
        return response()->json($categories);
    }
}

if (!function_exists('createNewCustomer')) {
    function createNewCustomer()
    {
        $requiredItem = "phone";
        return response()->json("required",$requiredItem);
    }
}
