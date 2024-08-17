<?php

namespace App\Http\Controllers;

use App\Models\CompanySetup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;

class CompanySetupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companys = CompanySetup::orderBy('id','DESC')->first();

        return Inertia::render('Backend/Setting/CompanySetup', [
            'companies' =>$companys,
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
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact' => 'required',
            'email' => 'required',
            'company_logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5000',
            'trending_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5000',
            'trending' => 'required',
        ]);

        try {
            $company = new CompanySetup();
            $company->name=$request->name;
            $company->address=$request->address;
            $company->contact=$request->contact;
            $company->payment_no=$request->payment_no;
            $company->email=$request->email;
            $company->trending=$request->trending;
            $company->social_link = isset($request->social_link) ? implode(',', $request->social_link):null;
            if ($request->file('company_logo')){
                $slider_image = $request->file('company_logo');
                $filename = "company_logo".time() . '.' . $slider_image->getClientOriginalExtension();
                $path = public_path('Media/CompanyImage/' . $filename);
                $save_file_path = 'Media/CompanyImage/' . $filename;
                Image::make($slider_image->getRealPath())->resize(100, 100)->save($path);
                $company->company_logo = $save_file_path;
            }

            if ($request->file('trending_image')){
                $slider_image = $request->file('trending_image');
                $filename = "trending_image".time() . '.' . $slider_image->getClientOriginalExtension();
                $path = public_path('Media/CompanyImage/' . $filename);
                $save_file_path = 'Media/CompanyImage/' . $filename;
                Image::make($slider_image->getRealPath())->resize(400, 235)->save($path);
                $company->trending_image = $save_file_path;
            }
            $company->save();
            return back()->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $company =  CompanySetup::where('id',$id)->first();
            $company->name=$request->name;
            $company->address=$request->address;
            $company->contact=$request->contact;
            $company->payment_no=$request->payment_no;
            $company->email=$request->email;
            $company->trending=$request->trending;
            $company->social_link = isset($request->social_link) ? implode(',', $request->social_link):null;
            if ($request->file('company_logo')){
                $slider_image = $request->file('company_logo');
                $filename = "company_logo".time() . '.' . $slider_image->getClientOriginalExtension();
                $path = public_path('Media/CompanyImage/' . $filename);
                $save_file_path = 'Media/CompanyImage/' . $filename;
                Image::make($slider_image->getRealPath())->resize(100, 100)->save($path);
                $company->company_logo = $save_file_path;
            }

            if ($request->file('trending_image')){
                $slider_image = $request->file('trending_image');
                $filename = "trending_image".time() . '.' . $slider_image->getClientOriginalExtension();
                $path = public_path('Media/CompanyImage/' . $filename);
                $save_file_path = 'Media/CompanyImage/' . $filename;
                Image::make($slider_image->getRealPath())->resize(400, 235)->save($path);
                $company->trending_image = $save_file_path;
            }
            $company->save();
            return back()->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
