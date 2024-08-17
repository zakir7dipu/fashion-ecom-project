<?php

namespace Modules\Frontend\App\Http\Controllers\AddToCard;

use App\Http\Controllers\Controller;
use App\Models\CompanySetup;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Modules\Backend\App\Models\Categorie;
use Modules\Backend\App\Models\Coupon;
use Modules\Backend\App\Models\Product;
use Modules\Frontend\App\Models\Customer;
use function Symfony\Component\Mime\Header\all;

class AddCardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart_session = Session::get('product_add_to_cart');
        return response()->json($cart_session);
    }

    public function AllCoupon()
    {
        $current = Carbon::now()->format('Y-m-d');
        $allcoupon = Coupon::where('coupon_validity_date', '>=', $current)
            ->where('status', '1')
            ->get();
        return response()->json($allcoupon);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('frontend::create');
    }

    /**
     * Store a newly created resource in storage.
     */


    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|numeric',
            'name' => 'required|string',
            'quantity' => 'required|numeric',
            'sale_price' => 'required',
        ]);

        try {
            // Retrieve the cart session
//            $request->session()->forget('product_add_to_cart');

            $cart_session = $request->session()->get('product_add_to_cart', []);

            // Ensure the product_cart array exists within the cart session
            if (!isset($cart_session['product_cart'])) {
                $cart_session['product_cart'] = [];
            }

            $product = Product::where('id', $request->product_id)->with('shipping')->first();

            $productExists = false;
            foreach ($cart_session['product_cart'] as &$cart) {
                if (
                    $cart['product_id'] == $request->product_id &&
                    $cart['size'] == $request->size &&
                    $cart['color'] == $request->color
                ) {
                    // Update the quantity of the existing product
                    $cart['quantity'] += $request->quantity;
                    $productExists = true;
                    break;
                }
            }

            if (!$productExists) {
                $newProduct = [
                    'product' => $product,
                    'product_id' => $request->product_id,
                    'name' => $request->name,
                    'size' => $request->size,
                    'color' => $request->color,
                    'quantity' => $request->quantity,
                    'product_image' => $request->product_image,
                    'regular_price' => $request->regular_price,
                    'sale_price' => $request->sale_price,
                    'discount_percent' => $request->discount_percent,
                    'discount_amount' => $request->discount_amount,
                    'shipping' => $request->shipping,
                    'selected' => true,
                ];
                $cart_session['product_cart'][] = $newProduct;
            }

            $request->session()->put('product_add_to_cart', $cart_session);

            $cartsession = $request->session()->get('product_add_to_cart');

            return response()->json($cartsession, 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal Server Error: ' . $th->getMessage()], 500);
        }
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('frontend::show');
    }


    public function ProductCheckOut()
    {
        if (Auth::check()) {
            $user = Auth::user()->load('customer');
            $customer = $user->hasRole('customer') ? $user : [];
        } else {
            $customer = [];
        }
        return Inertia::render('Frontend/CheckOut/index', [
            'customers'=>$customer
        ]);
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
    public function update(Request $request)
    {
        $cart_session = $request->session()->get('product_add_to_cart', []);

        // Check if 'product_cart' exists in the session
        if (!isset($cart_session['product_cart'])) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }

        $product_cart = $cart_session['product_cart'];
        // Get the index from the request
        $index = $request['index'];

        // Check if the index is within the bounds of the product_cart array
        if (isset($product_cart[$index])) {
            // Update the product details at the specific index
            $product_cart[$index]['quantity'] = $request['cardData']['quantity'];
            $product_cart[$index]['size'] = $request['cardData']['size'];
            $product_cart[$index]['color'] = $request['cardData']['color'];
            $product_cart[$index]['selected'] = $request['cardData']['selected'];

            // Update the 'product_cart' in the session
            $cart_session['product_cart'] = $product_cart;
            $request->session()->put('product_add_to_cart', $cart_session);

            $cartsession = $request->session()->get('product_add_to_cart');
            return response()->json($cartsession, 200);
        } else {
            // Handle the case where the index is out of bounds (optional)
            return response()->json(['error' => 'Invalid index'], 400);
        }
    }

    public function CouponAddUpdate(Request $request)
    {
        // Retrieve the existing cart data from the session
        $cart_session = $request->session()->get('product_add_to_cart', []);

        // Create the new coupon array
        $newCoupon = [
            'coupon_id' =>@$request->id,
            'title' =>@$request->coupon_name,
            'coupon_percent' =>@$request->coupon_percent,
            'details' =>@$request->details,
            'order_amount' =>@$request->order_amount,
            'type' =>"coupon",
        ];

        $cart_session['coupons'] = $newCoupon;

        $request->session()->put('product_add_to_cart', $cart_session);
        $cartsession = $request->session()->get('product_add_to_cart');
        return response()->json($cartsession, 200);
    }

    public function AffiliateCouponAddUpdate(Request $request)
    {
        // Retrieve the existing cart data from the session
        $cart_session = $request->session()->get('product_add_to_cart', []);

        // Create the new coupon array
        $newCoupon = [
            'coupon_id' =>@$request['user']['id'],
            'title' =>@$request['user']['name'],
            'coupon_percent' =>"",
            'details' =>"",
            'order_amount' =>"",
            'type' =>"affiliate",
        ];

        $cart_session['coupons'] = $newCoupon;

        $request->session()->put('product_add_to_cart', $cart_session);
        $cartsession = $request->session()->get('product_add_to_cart');
        return response()->json($cartsession, 200);
    }


    public function CouponRemove(Request $request)
    {
        // Retrieve the existing cart data from the session
        $cart_session = $request->session()->get('product_add_to_cart', []);

        unset($cart_session['coupons']);

        $request->session()->put('product_add_to_cart', $cart_session);
        $cartsession = $request->session()->get('product_add_to_cart');
        return response()->json($cartsession, 200);
    }


    public function UpdateAllProductCheck(Request $request)
    {
        try {
            $cart_session = $request->session()->get('product_add_to_cart', []);

            // Check if 'product_cart' exists in the session
            if (isset($cart_session['product_cart'])) {
                foreach ($cart_session['product_cart'] as &$cart) {
                    $cart['selected'] = $request['cardData'];
                }
                // Save the updated 'product_cart' back to the session
                $request->session()->put('product_add_to_cart', $cart_session);
                $cartsession = $request->session()->get('product_add_to_cart');
                return response()->json($cartsession, 200);
            } else {
                return response()->json(['error' => 'Cart is empty'], 400);
            }
        } catch (\Throwable $th) {
            // Optionally log the error
            // Log::error('Error updating product check: ' . $th->getMessage(), ['exception' => $th]);
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }


    public function CartDelete(Request $request)
    {
        try {
            $cart_session = $request->session()->get('product_add_to_cart', []);

            // Check if 'product_cart' exists in the session
            if (isset($cart_session['product_cart'])) {
                foreach ($cart_session['product_cart'] as $key => &$cart) {
                    if ($cart['product_id'] == $request['cardData']['product_id'] &&
                        $cart['size'] == $request['cardData']['size'] &&
                        $cart['color'] == $request['cardData']['color']) {
                        unset($cart_session['product_cart'][$key]); // Remove the cart from the array
                        break;
                    }
                }

                $cart_session['product_cart'] = array_values($cart_session['product_cart']);

                $request->session()->put('product_add_to_cart', $cart_session);
                $cartsession = $request->session()->get('product_add_to_cart');

                if (empty($cartsession['product_cart'])){
                    $request->session()->forget('product_add_to_cart');
                }

                return response()->json($cartsession, 200);
            } else {
                return response()->json(['error' => 'Cart is empty'], 400);
            }
        } catch (\Throwable $th) {
            // Optionally log the error
            // Log::error('Error deleting product from cart: ' . $th->getMessage(), ['exception' => $th]);
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }


    public function AffiliateUser()
    {
        $customer = Customer::with('user')->get();
        return response()->json($customer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
