<?php

namespace Modules\Backend\App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CommonModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Modules\Backend\App\Models\HomeSlider;

class HomeSliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sliders = HomeSlider::orderBy('id','DESC')->get();
        return Inertia::render('Backend/Setting/HomeSlider', [
            'sliders' =>$sliders,
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
        try {
            $imageProcess = new CommonModel();
            $request->validate([
                'name' => 'required|string|max:255',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5000',
            ]);

            $slider = new HomeSlider();
            $slider->name=$request->name;
            if ($request->file('image')){
                $imageFile = $request->file('image');
                $updatePath="";
                $mediaPath='Media/SliderImage/';
                $width=1920;
                $height=900;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$width,$height);
                $slider->image = $save_file_path;
            }
            $slider->save();
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
            $imageProcess = new CommonModel();

            $slider = HomeSlider::where('id',$id)->first();
            $slider->name=$request->name;
            if ($request->file('image')){
                $imageFile = $request->file('image');
                $updatePath=$slider->image;
                $mediaPath='Media/SliderImage/';
                $width=1920;
                $height=900;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$width,$height);
                $slider->image = $save_file_path;
            }
            $slider->save();
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
            $subcategorise = HomeSlider::where('id',$id)->first();
            $exists_path = $subcategorise->image;
            if (file_exists($exists_path)) {unlink($exists_path); }

            HomeSlider::where('id',$id)->delete();
            return back()->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }
}
