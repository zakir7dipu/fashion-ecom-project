<?php

namespace Modules\Backend\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Modules\Backend\App\Models\Categorie;


class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categorie::orderBy('id','DESC')->get();
        return Inertia::render('Backend/Setting/Categories', [
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
        $request->validate([
            'name' => 'required|string|max:255|unique:'.Categorie::class,
            'status' => 'required',
        ]);

        try {
            $categorise = new Categorie();
            $categorise->name=$request->name;
            $categorise->status=$request->status;
            $categorise->save();
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
            $categorise =  Categorie::where('id',$id)->first();
            $categorise->name=$request->name;
            $categorise->status=$request->status;
            $categorise->save();
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
            Categorie::where('id',$id)->delete();
            return back()->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }
    }
}
