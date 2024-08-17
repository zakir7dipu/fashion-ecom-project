<?php

namespace Modules\Backend\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Modules\Backend\App\Models\ReturnPolicy;
use function Symfony\Component\Mime\Header\all;

class ReturnPolicyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $returnPolicies = ReturnPolicy::orderBy('id','DESC')->get();
        return Inertia::render('Backend/Setting/ReturnPolicies', [
            'returnPolicies' =>$returnPolicies,
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
            'offer_for_you' => 'required',
            'return_exchange_policy' => 'required',
        ]);

        try {
            $check = ReturnPolicy::first();
            if (empty($check)){
                $return = new ReturnPolicy();
                $return->offer_for_you=$request->offer_for_you;
                $return->return_exchange_policy=$request->return_exchange_policy;
                $return->save();
            }else{
                $check->offer_for_you=$request->offer_for_you;
                $check->return_exchange_policy=$request->return_exchange_policy;
                $check->save();
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
            $return = ReturnPolicy::where('id',$id)->first();
            $return->offer_for_you=$request->offer_for_you;
            $return->return_exchange_policy=$request->return_exchange_policy;
            $return->save();

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
