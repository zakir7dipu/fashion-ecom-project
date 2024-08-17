<?php

namespace Modules\Backend\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Modules\Backend\App\Models\SubCategorie;
use Modules\Backend\App\Models\SubSubCategory;

class SubSubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $perPage = $request->perpage ? $request->perpage : 10;

        $subsubcategories = SubSubCategory::orderBy('id', 'DESC')
            ->where(function($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhereHas('subCategorie', function ($q) use ($search) {
                        $q->where('name', 'LIKE', '%' . $search . '%')
                            ->orWhereHas('categorie', function ($q2) use ($search) {
                                $q2->where('name', 'LIKE', '%' . $search . '%');
                            });
                    });
            })
            ->with('subCategorie.categorie')
            ->paginate($perPage);

        $subCategorie = SubCategorie::orderBy('id', 'DESC')->get();

        return Inertia::render('Backend/Setting/SubSubCategories', [
            'subsubcategories' => $subsubcategories,
            'subCategorie' => $subCategorie,
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
            'sub_categorie_id' => 'required',
            'status' => 'required',
        ]);

        try {
            $subcategorise = new SubSubCategory();
            $subcategorise->sub_categorie_id=$request->sub_categorie_id;
            $subcategorise->name=$request->name;
            $subcategorise->status=$request->status;
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
            $subcategorise =  SubSubCategory::where('id',$id)->first();
            $subcategorise->sub_categorie_id=$request->sub_categorie_id;
            $subcategorise->name=$request->name;
            $subcategorise->status=$request->status;
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
            SubSubCategory::where('id',$id)->delete();

            return back()->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }
}
