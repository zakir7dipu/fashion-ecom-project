<?php

namespace Modules\Backend\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Modules\Backend\App\Models\Coupon;
use function Symfony\Component\Mime\Header\all;

class CouponSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coupons = Coupon::orderBy('id','DESC')->get();
        return Inertia::render('Backend/Setting/CouponSetting', [
            'coupons' =>$coupons,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('backend::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'coupon_name' => 'required|string|max:255|unique:'.Coupon::class,
            'coupon_validity_date' => 'required',
            'status' => 'required',
        ]);

        try {
            $coupon = new Coupon();
            $coupon->coupon_name=$request->coupon_name;
            $coupon->order_amount=$request->order_amount;
            $coupon->coupon_percent=$request->coupon_percent;
            $coupon->coupon_fixed_amount=$request->coupon_fixed_amount;
            $coupon->details=$request->details;
            $coupon->coupon_validity_date=$request->coupon_validity_date;
            $coupon->status=$request->status;
            $coupon->save();

            return back()->with('status',"Form submitted successfully!");
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
        return view('backend::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'coupon_name' => 'required',
            'coupon_validity_date' => 'required',
            'status' => 'required',
        ]);

        try {
            $coupon =  Coupon::where('id',$id)->first();
            $coupon->coupon_name=$request->coupon_name;
//            $coupon->order_count=$request->order_count;
            $coupon->order_amount=$request->order_amount;
            $coupon->coupon_percent=$request->coupon_percent;
            $coupon->coupon_fixed_amount=$request->coupon_fixed_amount;
            $coupon->details=$request->details;
            $coupon->coupon_validity_date=$request->coupon_validity_date;
            $coupon->status=$request->status;
            $coupon->save();

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
        try {
            Coupon::where('id',$id)->delete();
            return back()->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }
}
