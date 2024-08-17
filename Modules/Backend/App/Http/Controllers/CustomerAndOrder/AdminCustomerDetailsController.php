<?php

namespace Modules\Backend\App\Http\Controllers\CustomerAndOrder;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Modules\Backend\App\Models\AffiliateProfit;
use Modules\Backend\App\Models\Coupon;
use Modules\Frontend\App\Models\Customer;
use Modules\Frontend\App\Models\OrderInvoice;

class AdminCustomerDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $perPage = $request->perpage ? $request->perpage : 10;

        $customers = Customer::orderBy('id', 'DESC')
            ->where(function ($query) use ($search) {
                $query->where('phone', 'LIKE', '%' . $search . '%')
                    ->orWhere('email', 'LIKE', '%' . $search . '%')
                    ->orWhere('address', 'LIKE', '%' . $search . '%');
            })->with('user')
            ->orWhereHas('user', function ($query) use ($search) {
                $query->where('name', 'LIKE', '%' . $search . '%');
            })
            ->paginate($perPage);

        return Inertia::render('Backend/Customer/CustomerList', [
            'customers' =>$customers,
        ]);
    }

    public function CustomerPayment(Request $request)
    {
        $search = $request->search;
        $perPage = $request->perpage ? $request->perpage : 10;

        $orders = OrderInvoice::orderBy('id', 'DESC')
            ->where('status', '4')
            ->where(function ($query) use ($search) {
                $query->where('invoice', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('customer.user', function ($query) use ($search) {
                        $query->where('name', 'LIKE', '%' . $search . '%');
                    });
            })
            ->with([
                'orders.product.productImage',
                'updateBy',
                'customerPayment.paymentTypeSetting',
                'customer.user'
            ])
            ->paginate($perPage);

        return Inertia::render('Backend/Customer/CustomerPayment', [
            'orders' =>$orders,
        ]);
    }


    public function CustomerPaymentAffiliate(Request $request)
    {
        $search = $request->search;
        $perPage = $request->perpage ? $request->perpage : 10;

        $profits = AffiliateProfit::orderBy('id', 'DESC')
            ->when($search, function ($query) use ($search) {
                $query->whereHas('user', function ($query) use ($search) {
                    $query->where('name', 'LIKE', '%' . $search . '%');
                })
                    ->orWhereHas('user.customer', function ($query) use ($search) {
                        $query->where('slug', 'LIKE', '%' . $search . '%');
                    })
                    ->orWhereHas('orderInvoice', function ($query) use ($search) {
                        $query->where('invoice', 'LIKE', '%' . $search . '%');
                    });
            })
            ->with([
                'orderInvoice',
                'user.customer'
            ])
            ->paginate($perPage);

        return Inertia::render('Backend/Customer/AffiliateProfit', [
            'profits' =>$profits,
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
