<?php

namespace Modules\Frontend\App\Http\Controllers\CustomerOrder;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Frontend\App\Models\OrderInvoice;

class CustomerOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = Auth::id();
        $search = $request->search;
        $pageTab = $request->pageTab;
        $startDate = null;
        $takeLimit = 5;
        $status = null;

        // Set status based on pageTab
        if ($pageTab == "processing") {
            $status = '2';
        } elseif ($pageTab == "completed") {
            $status = '4';
        } elseif ($pageTab == "all") {
            $status = null;
        }else{
            $status = null;
        }

        // Set start date based on search criteria
        switch ($search) {
            case '15 days':
                $startDate = Carbon::now()->subDays(15)->startOfDay();
                break;
            case '30 days':
                $startDate = Carbon::now()->subDays(30)->startOfDay();
                break;
            case '3 month':
                $startDate = Carbon::now()->subMonths(3)->startOfDay();
                break;
            case '6 month':
                $startDate = Carbon::now()->subMonths(6)->startOfDay();
                break;
            case 'last year':
                $startDate = Carbon::now()->subYear()->startOfDay();
                break;
            case 'all':
                $takeLimit = null;
                break;
            default:
                $takeLimit = 5;
        }

        // Build the query with necessary conditions
        $query = User::where('id', $userId)->with(['customer.orderInvoices' => function ($query) use ($startDate, $takeLimit, $status) {
            if ($startDate) {
                $query->where('sale_date', '>=', $startDate);
            }
            if ($status) {
                $query->where('status', $status);
            }
            if ($takeLimit) {
                $query->take($takeLimit);
            }
            $query->with(['orders.product.productImage.product.imageGallerys']);
        }]);

        // Execute the query and get the first result
        $orders = $query->first();

        // Return the orders data to the view
        return Inertia::render('Frontend/Customer/Orders/index', [
            'orders' => $orders,
        ]);
    }


    public function OrderTracking()
    {
        $userId = Auth::id();

        // Fetch the user with related data
        $user = User::with(['customer.orderInvoices.orders.product.productImage.product.imageGallerys'])
            ->find($userId);

        // Render the view with Inertia
        return Inertia::render('Frontend/Customer/Orders/OrderTracking', [
            'orders' => $user,
        ]);
    }


    public function OrderTrackingLog($id)
    {
        $orders = OrderInvoice::where('invoice',$id)->with(['orders.product.productImage.product.imageGallerys'])->get();

        return Inertia::render('Frontend/Customer/Orders/OrderTrackingLog', [
            'orders' => $orders,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('frontend::create');
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
        return view('frontend::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('frontend::edit');
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
