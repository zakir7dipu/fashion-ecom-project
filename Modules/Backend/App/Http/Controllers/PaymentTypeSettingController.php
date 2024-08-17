<?php

namespace Modules\Backend\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use Modules\Backend\App\Models\PaymentTypeSetting;

class PaymentTypeSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paymentTypes = PaymentTypeSetting::orderBy('id','DESC')->get();
        return Inertia::render('Backend/Setting/PaymentType', [
            'paymentTypes' =>$paymentTypes,
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
            'name' => 'required',
            'status' => 'required',
            'image' => 'required',
        ]);

        try {
            $payment_type = new PaymentTypeSetting();
            $payment_type->name=$request->name;
            $payment_type->is_default=isset($request->is_default) ? $request->is_default:0;;
            $payment_type->status=$request->status;
            if ($request->file('image')){
                $PaymentType = $request->file('image');
                $filename = "image".time() . '.' . $PaymentType->getClientOriginalExtension();
                $path = public_path('Media/PaymentType/' . $filename);
                Image::make($PaymentType->getRealPath())->save($path);
                $save_file_path = 'Media/PaymentType/' . $filename;
                $payment_type->image = $save_file_path;
            }
            $payment_type->save();

            $checks = PaymentTypeSetting::where('is_default','1')->get();
            if (count($checks) >= 2){
                foreach ($checks as $check){
                    if ($check->id != $payment_type->id){
                        $check->is_default='0';
                        $check->save();
                    }
                }
            }

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
        try {
            $check = PaymentTypeSetting::where('is_default','1')->first();
            if ($check !=""){
                $check->is_default='0';
                $check->save();
            }
            $payment_type =  PaymentTypeSetting::where('id',$id)->first();
            $payment_type->name=$request->name;
            $payment_type->is_default=$request->is_default;
            $payment_type->status=$request->status;
            if ($request->file('image')){
                $exists_path = $payment_type->image;
                if (file_exists($exists_path)) {unlink($exists_path); }
                $PaymentType = $request->file('image');
                $filename = "image".time() . '.' . $PaymentType->getClientOriginalExtension();
                $path = public_path('Media/PaymentType/' . $filename);
                Image::make($PaymentType->getRealPath())->save($path);
                $save_file_path = 'Media/PaymentType/' . $filename;
                $payment_type->image = $save_file_path;
            }
            $payment_type->save();
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
            $payment_type =  PaymentTypeSetting::where('id',$id)->first();
            $exists_path = $payment_type->image;
            if (file_exists($exists_path)) {unlink($exists_path); }
            PaymentTypeSetting::where('id',$id)->delete();
            return back()->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }
}
