<?php

namespace Modules\Backend\App\Http\Controllers\CustomerAndOrder;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Backend\App\Models\OrderDetailsLog;
use Modules\Frontend\App\Models\CustomerPayment;
use Modules\Frontend\App\Models\OrderInvoice;

class AdminOrderDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $perPage = $request->perpage ? $request->perpage : 10;

        $orders = OrderInvoice::orderBy('id', 'DESC')
            ->whereNotIn('status', [1, 4, 5])
            ->where(function ($query) use ($search) {
                $query->where('invoice', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('customer.user', function ($query) use ($search) {
                        $query->where('name', 'LIKE', '%' . $search . '%');
                    });
            })
            ->with([
                'orders.product.productImage',
                'updateBy',
                'customerPayment',
                'coupon',
                'orderDetailsLogs',
                'affiliateProfit.user.customer',
                'customer.user'
            ])
            ->paginate($perPage);

        return Inertia::render('Backend/Orders/InvoiceOrder', [
            'orders' => $orders,
        ]);
    }


    public function CompleteOrder(Request $request)
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
                'customerPayment',
                'coupon',
                'orderDetailsLogs',
                'affiliateProfit.user.customer',
                'customer.user'
            ])
            ->paginate($perPage);

        return Inertia::render('Backend/Orders/CompleteOrder', [
            'orders' => $orders,
        ]);
    }

    public function PendingOrder(Request $request)
    {
        $search = $request->search;
        $perPage = $request->perpage ? $request->perpage : 10;

        $orders = OrderInvoice::orderBy('id', 'DESC')
            ->where('status', '1')
            ->where(function ($query) use ($search) {
                $query->where('invoice', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('customer.user', function ($query) use ($search) {
                        $query->where('name', 'LIKE', '%' . $search . '%');
                    });
            })
            ->with([
                'orders.product.productImage',
                'updateBy',
                'customerPayment',
                'coupon',
                'orderDetailsLogs',
                'affiliateProfit.user.customer',
                'customer.user'
            ])
            ->paginate($perPage);

        return Inertia::render('Backend/Orders/PendingOrder', [
            'orders' => $orders,
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
        $request->validate([
            'invoice_id' => 'required',
            'invoice_amount' => 'required',
            'parcel_shipping_details' => 'required',
            'delivery_date' => 'required',
            'status' => 'required',
        ]);

        try {
            $date = new Carbon();
            $current =  $date->format('Y-m-d');

            $invoice = OrderInvoice::where('id',$id)->first();
            $invoice->shipping_charge=$request->shipping_charge;
            $invoice->parcel_shipping_details=$request->parcel_shipping_details;
            $invoice->delivery_date=$request->delivery_date;
            $invoice->status=$request->status;
            $invoice->update_by=Auth::user()->id;
            $invoice->save();

            $orderLog = new OrderDetailsLog();
            $orderLog->order_invoice_id=$id;
            $orderLog->note=$request->parcel_shipping_details;
            $orderLog->date=$request->delivery_date;
            $orderLog->user_id=Auth::user()->id;
            $orderLog->save();

            if ($request->status==4){
                $payment =  CustomerPayment::where('customer_id',$invoice->customer_id)->first();
                $payment->date=$current;
                $payment->shipping_charge=$request->shipping_charge;
                $payment->save();
            }

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
