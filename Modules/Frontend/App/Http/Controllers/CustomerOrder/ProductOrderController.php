<?php

namespace Modules\Frontend\App\Http\Controllers\CustomerOrder;

use App\Http\Controllers\Controller;
use App\Models\CommonModel;
use App\Models\CompanySetup;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Modules\Backend\App\Models\AffiliateProfit;
use Modules\Backend\App\Models\Categorie;
use Modules\Backend\App\Models\PaymentTypeSetting;
use Modules\Backend\App\Models\Product;
use Modules\Frontend\App\Models\Customer;
use Modules\Frontend\App\Models\CustomerPayment;
use Modules\Frontend\App\Models\Order;
use Modules\Frontend\App\Models\OrderInvoice;

class ProductOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('frontend::index');
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

        $user_check = User::where(['email'=>$request->email,'phone'=>$request->phone])->first();
        if (empty($user_check)){
            $request->validate([
                'name' => 'required',
                'phone' => 'required|max:11|unique:'.Customer::class,
                'address' => 'required',
                'district' => 'required',
                'condition' => 'required',
                'cartArray' => 'required',
                'totalSalePrice' => 'required',
                'invoice_amount' => 'required',
            ]);
        }else{
            $request->validate([
                'address' => 'required',
                'district' => 'required',
                'condition' => 'required',
                'cartArray' => 'required',
                'totalSalePrice' => 'required',
                'invoice_amount' => 'required',
            ]);
        }

        try {
            $date = new Carbon();
            $current =  $date->format('Y-m-d');

            $user_check = User::where(['email'=>$request->email,'phone'=>$request->phone])->first();

            if (empty($user_check)){
                $user = new User();
                $user->name=$request->name;
                $user->email=$request->email?$request->email:$request->name."@gm.co";
                $user->phone=$request->phone;
                $user->password=Hash::make($request->phone);
                $user->is_update=0;
                $user->status=1;
                $user->save();

                $user->assignRole('customer');
                $user_id = $user->id;
            }else{
                $user_id = $user_check->id;
            }

            $customer_check = Customer::where('user_id',$user_id)->first();

            if (empty($customer_check)){
                $customer = new Customer();
                $customer->user_id=$user_id;
                $customer->phone=$request->phone;
                $customer->email=$request->email;
                $customer->address=$request->address;
                $customer->district=$request->district;
                $customer->post_code=$request->post_code;
                $customer->affiliate_amount=0;
                $customer->affiliate_amount_used=0;
                $customer->affiliate_amount_blanch=0;
                $customer->save();
                $customer_id = $customer->id;
                $rf_id = $customer->slug;
            }else{
                $customer_id = $customer_check->id;
                $rf_id = $customer_check->slug;
            }

            $invoice = OrderInvoice::generateUniqueCode();

            $orderInvoice = new OrderInvoice();
            $orderInvoice->customer_id=$customer_id;
            $orderInvoice->invoice=$invoice;
            $orderInvoice->sale_count=count($request->cartArray);
            $orderInvoice->sale_price=$request->totalSalePrice;
            $orderInvoice->shipping_charge=$request->shipping_charge;
            $orderInvoice->coupon_id = isset($request->couponAmount) && $request->couponAmount > 0 ? $request->coupon_id: 0;
            $orderInvoice->coupon_discount_amount=$request->couponAmount;
            $orderInvoice->invoice_amount=$request->invoice_amount;
            $orderInvoice->affiliate_amount_total=$request->affiliate_amount;;
            $orderInvoice->delivery=$request->delivery;
            $orderInvoice->sale_date=$current;
            $orderInvoice->note=$request->note;
            $orderInvoice->status='1';
            $orderInvoice->save();

            foreach ($request->cartArray as $cart){
                $order = new Order();
                $order->order_invoice_id=$orderInvoice->id;
                $order->product_id=$cart['product']['id'];
                $order->categorie_id=$cart['product']['categorie_id'];
                $order->sub_category_id=$cart['product']['sub_category_id'];
                $order->sub_sub_category_id=$cart['product']['sub_sub_category_id'];
                $order->regular_price=$cart['regular_price'];
                $order->flat_discount=isset($cart['regular_price']) ? $cart['regular_price'] - $cart['sale_price']:$cart['sale_price'];
                $order->sale_price=$cart['sale_price'];
                $order->quantity=$cart['quantity'];
                $sale_amount = $cart['sale_price'] * $cart['quantity'];
                $order->sale_amount_total=$sale_amount;
                $order->affiliate_amount=0;
                $order->actual_amount=$sale_amount;
                $order->size=$cart['size'];
                $order->color=$cart['color'];
                $order->sale_date=$current;
                $order->save();
            }

            $checks = PaymentTypeSetting::where('is_default','1')->first();

            $payment = new CustomerPayment();
            $payment->customer_id=$customer_id;
            $payment->order_invoice_id=$orderInvoice->id;
            $payment->date=$current;
            $payment->payment_type_setting_id=$checks->id;
            $payment->invoice_amount=$request->invoice_amount;
            $payment->shipping_charge=$request->shipping_charge;
            $payment->save();

            if ($request->couponType=="affiliate"){
                foreach ($request->cartArray as $cart) {
                    $product = Product::where('id',$cart['product']['id'])->first();
                    if ($product->is_affiliate=='1'){
                        if ($rf_id !=$request->coupon_id){
                            $amount = $cart['sale_price'] * $cart['quantity'];
                            $affiliate = $amount * $product->affiliate_percent_user / 100;

                            $affiliate_profits = new AffiliateProfit();
                            $affiliate_profits->user_id=$request->coupon_id;
                            $affiliate_profits->product_id=$product->id;
                            $affiliate_profits->affiliate_percent=$product->affiliate_percent_user;
                            $affiliate_profits->product_price=$cart['sale_price'];
                            $affiliate_profits->affiliate_amount=$affiliate;
                            $affiliate_profits->order_invoice_id=$orderInvoice->id;
                            $affiliate_profits->date=$current;
                            $affiliate_profits->save();
                        }
                    }
                }
            }

            $cart_session = $request->session()->get('product_add_to_cart', []);
            foreach ($cart_session['product_cart'] as $key => $cart) {
                if (isset($cart['selected']) && $cart['selected'] == true) {
                    unset($cart_session['product_cart'][$key]);
                }
            }
            $cart_session['product_cart'] = array_values($cart_session['product_cart']);
            $request->session()->put('product_add_to_cart', $cart_session);

            $cartsession = $request->session()->get('product_add_to_cart', []);
            unset($cartsession['coupons']);
            $request->session()->put('product_add_to_cart', $cartsession);

            return redirect()->route('payment.checkout',$orderInvoice->invoice)->with('status',"Form submitted successfully!");

        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }


    public function CheckOutPayment($id)
    {
        $paymentTypes = PaymentTypeSetting::where('status','1')->get();
        $invoice = OrderInvoice::where('invoice', $id)
            ->with([
                'customer',
                'customerPayment.paymentTypeSetting',
                'orders.product.productImage.product.imageGallerys'
            ])
            ->first();

        return Inertia::render('Frontend/Payment/index', [
            'invoice' => $invoice,
            'paymentTypes' => $paymentTypes
        ]);
    }


    public function CheckOutPaymentSuccess(Request $request)
    {

        $request->validate([
            'customer_id' => 'required',
            'user_id' => 'required',
            'shipping_type' => 'required',
        ]);

        try {
            $date = new Carbon();
            $current =  $date->format('Y-m-d');

            $payment_type = PaymentTypeSetting::where('name', 'like', '%'.$request->shipping_type.'%')->first();
            $payment =  CustomerPayment::where('id',$request->customer_id)->first();
            $payment->date=$current;
            $payment->payment_type_setting_id=$payment_type->id;
            $payment->save();

            $cart_session = $request->session()->get('product_add_to_cart', []);
            if (isset($cart_session['product_cart']) && is_array($cart_session['product_cart'])) {
                foreach ($cart_session['product_cart'] as &$cart) {
                    $cart['selected'] = true;
                }
                $cart_session['product_cart'] = array_values($cart_session['product_cart']);
                $request->session()->put('product_add_to_cart', $cart_session);
            }
//
//            $cart_session = $request->session()->get('product_add_to_cart', []);
//            foreach ($cart_session['product_cart'] as &$cart) {
//                $cart['selected'] = true;
//            }
//
//            $cart_session['product_cart'] = array_values($cart_session['product_cart']);
//            $request->session()->put('product_add_to_cart', $cart_session);

            $user = User::where('id',$request->user_id)->first();
            Auth::login($user);
            $order_invoice =  OrderInvoice::where('invoice',$request->invoice)->first();

            $af_profit = AffiliateProfit::where('order_invoice_id',$order_invoice->id)->first();


            if (!empty($af_profit)==true){
                $orderInvoice =  OrderInvoice::where('invoice',$request->invoice)->first();
                $orderInvoice->status='2';
                $orderInvoice->affiliate_profit_id = $af_profit->id;
                $orderInvoice->save();

                $customer = Customer::where('user_id',$af_profit->user_id)->first();

                $af_amount = $customer->affiliate_amount + $af_profit->affiliate_amount;
                $amount_blanch = $af_amount - $customer->affiliate_amount_used;
                $customer->affiliate_amount=$af_amount;
                $customer->affiliate_amount_blanch=$amount_blanch;
                $customer->save();

            }else{
                $orderInvoice =  OrderInvoice::where('invoice',$request->invoice)->first();
                $orderInvoice->status='2';
                $orderInvoice->save();
            }

            return redirect()->route('user.dashboard')->with('status',"Form submitted successfully!");

        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }

    }


    public function RecentProduct()
    {
        $product_recent = Product::orderBy('id','DESC')
            ->with('productImage','imageGallerys')
            ->get();
        return response()->json($product_recent);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
