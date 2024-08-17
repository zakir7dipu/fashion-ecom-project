<?php

namespace Modules\Frontend\App\Http\Controllers\CustomerOrder;

use App\Http\Controllers\Controller;
use App\Models\CompanySetup;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Backend\App\Models\Categorie;
use Modules\Frontend\App\Models\Customer;

class CustomerDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//        dd("Customer");
        if (Auth::user()->hasRole('super_admin')){
            return Inertia::render('Backend/AdminDashboard/MainDashboard', [
                'data' => [],
            ]);
        }else{
            return Inertia::render('Frontend/Customer/Dashboard/index', [
                'data' => [],
            ]);
        }
    }


    public function UserProfile()
    {
        $user = User::where('id',Auth::user()->id)->first();
        return Inertia::render('Frontend/Customer/Profile/index',[
            'users'=>$user
        ]);
    }


    public function UserProfileUpdate(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'user_id' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required|max:11|unique:users,phone,' . $id,
        ]);

        try {
            // Find the user by ID
            $user = User::findOrFail($id); // Use findOrFail for better error handling

            // Update user details
            $user->name = $request->name;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->save();

            // Check if the customer exists and update details
            $customer_check = Customer::where('user_id', $id)->first();
            if ($customer_check) {
                $customer_check->email = $request->email;
                $customer_check->phone = $request->phone;
                $customer_check->save();
            }

            return redirect()->back()->with('status', "Form submitted successfully!");

        } catch (\Throwable $th) {
            return back()->with('status', "Form not submitted successfully!");
        }
    }


    public function UserAddressInfo()
    {
        $user = User::where('id',Auth::user()->id)->with('customer')->first();
        return Inertia::render('Frontend/Customer/Address/index',[
            'users'=>$user
        ]);
    }

    public function UserAddressInfoUpdate(Request $request,$id)
    {
        $request->validate([
            'user_id' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'address' => 'required',
            'district' => 'required',
            'phone' => 'required|max:11|unique:users,phone,' . $id,
        ]);

        try {
            // Find the user by ID
            $user = User::findOrFail($id); // Use findOrFail for better error handling

            // Update user details
            $user->name = $request->name;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->save();

            // Check if the customer exists and update details
            $customer_check = Customer::where('user_id', $id)->first();
            if (!empty($customer_check)) {
                $customer_check->email = $request->email;
                $customer_check->phone = $request->phone;
                $customer_check->address = $request->address;
                $customer_check->district = $request->district;
                $customer_check->post_code = $request->post_code;
                $customer_check->save();
            }else{
                $customer = new Customer();
                $customer->user_id=$id;
                $customer->phone=$request->phone;
                $customer->email=$request->email;
                $customer->address=$request->address;
                $customer->district=$request->district;
                $customer->post_code=$request->post_code;
                $customer->save();
            }

            return redirect()->back()->with('status', "Form submitted successfully!");

        } catch (\Throwable $th) {
            return back()->with('status', "Form not submitted successfully!");
        }
    }



    public function CustomerChangePassword()
    {
        return Inertia::render('Frontend/Customer/ChangePassword/index',[

        ]);
    }


}
