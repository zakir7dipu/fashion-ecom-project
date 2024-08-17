<?php

namespace Modules\Backend\App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CommonModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use Modules\Backend\App\Models\Categorie;
use Modules\Backend\App\Models\SubCategorie;
use Modules\Backend\App\Models\SubSubCategory;

class SubCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $subcategories = SubCategorie::orderBy('id','DESC')
            ->where('name', 'like', '%'.$search.'%')
            ->with('categorie')
            ->orWhereHas('categorie', function ($q) use ($search) {
                return $q->where('name', 'LIKE', '%'.$search.'%');
            })->paginate($request->perpage?$request->perpage: 10);

        $categories = Categorie::orderBy('id','DESC')->get();
        return Inertia::render('Backend/Setting/SubCategories', [
            'subcategories' =>$subcategories,
            'categories' =>$categories,
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
        $imageProcess = new CommonModel();
        $request->validate([
            'name' => 'required',
            'categorie_id' => 'required',
            'new_arrival' => 'required',
            'home_show' => 'required',
            'image' => 'required',
            'status' => 'required',
        ]);

        try {
            $subcategorise = new SubCategorie();
            $subcategorise->categorie_id=$request->categorie_id;
            $subcategorise->name=$request->name;
            $subcategorise->new_arrival=$request->new_arrival;
            $subcategorise->status=$request->status;
            $subcategorise->home_show=$request->home_show;


            if ($request->file('image')){
                $imageFile = $request->file('image');
                $updatePath = "";
                $mediaPath = 'Media/SubCatImage/';
                $with = 400;
                $height = 400;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile, $updatePath, $mediaPath, $with, $height);
                $subcategorise->image = $save_file_path;
            }

            $subcategorise->save();
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
            $subcategorise = SubCategorie::where('id',$id)->first();
            $subcategorise->categorie_id=$request->categorie_id;
            $subcategorise->name=$request->name;
            $subcategorise->new_arrival=$request->new_arrival;
            $subcategorise->status=$request->status;
            $subcategorise->home_show=$request->home_show;


            if ($request->file('image')){
                $exists_path = $subcategorise->image;
                if (file_exists($exists_path)) {unlink($exists_path); }
                $imageFile=$request->image;
                $updatePath="";
                $mediaPath='Media/SubCatImage/';
                $with=400;
                $height=400;
                $save_file_path = $imageProcess->ImageResizeProcess($imageFile,$updatePath,$mediaPath,$with,$height);
                $subcategorise->image = $save_file_path;
            }

            $subcategorise->save();
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
            $subcategorise = SubCategorie::where('id',$id)->first();
            $exists_path = $subcategorise->image;
            if (file_exists($exists_path)) {unlink($exists_path); }

            SubCategorie::where('id',$id)->delete();
            return back()->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }
}
