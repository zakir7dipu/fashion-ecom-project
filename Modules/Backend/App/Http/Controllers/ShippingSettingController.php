<?php

namespace Modules\Backend\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use Modules\Backend\App\Models\Shipping;

class ShippingSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shippings = Shipping::orderBy('id','DESC')->get();
        return Inertia::render('Backend/Setting/ShippingCharge', [
            'shippings' =>$shippings,
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
            'in_dhaka' => 'required',
            'out_dhaka' => 'required',
            'status' => 'required',
        ]);

        try {
            $shippings = new Shipping();
            $shippings->name=$request->name;
            $shippings->in_dhaka=$request->in_dhaka;
            $shippings->out_dhaka=$request->out_dhaka;
            $shippings->details=$request->details;
            $shippings->status=$request->status;
            $shippings->save();

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
            $shippings =  Shipping::where('id',$id)->first();
            $shippings->name=$request->name;
            $shippings->in_dhaka=$request->in_dhaka;
            $shippings->out_dhaka=$request->out_dhaka;
            $shippings->details=$request->details;
            $shippings->status=$request->status;
            $shippings->save();

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
        //
    }
}
