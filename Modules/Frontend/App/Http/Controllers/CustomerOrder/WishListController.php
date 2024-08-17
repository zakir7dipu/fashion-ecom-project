<?php

namespace Modules\Frontend\App\Http\Controllers\CustomerOrder;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


use Modules\Frontend\App\Models\WishList;

class WishListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $wishList = WishList::where('user_id',Auth::user()->id)->with('product.productImage.product.imageGallerys')->get();
        return Inertia::render('Frontend/Customer/Wishlist/index', [
            'wishList' => $wishList,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
//
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => 'required',
            'quantity' => 'required',
        ]);

        try {
            $user = User::where('id', Auth::user()->id)->first();
            $wishlistItems = WishList::where('user_id', $user->id)->get();

            foreach ($wishlistItems as $item) {
                if (
                    $item->product_id == $request->product_id &&
                    $item->size == $request->size &&
                    $item->color == $request->color
                ) {
                    return back()->with('error', 'Wish list item already exists!');
                }
            }

            $wishlistItem = new WishList();
            $wishlistItem->product_id = $request->product_id;
            $wishlistItem->customer_id = $user->customer->id;
            $wishlistItem->size = $request->size;
            $wishlistItem->color = $request->color;
            $wishlistItem->quantity = $request->quantity;
            $wishlistItem->product_image = $request->product_image;
            $wishlistItem->regular_price = $request->regular_price;
            $wishlistItem->sale_price = $request->sale_price;
            $wishlistItem->user_id = $user->id;
            $wishlistItem->save();

            return back()->with('status', 'Wishlist item added successfully!');
        } catch (\Throwable $th) {
            return back()->with('status', 'Form not submitted successfully!');
        }
    }


    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('frontend::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('frontend::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        WishList::where('id',$id)->delete();
        return back()->with('status', 'Wishlist item added successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
