<?php

use Illuminate\Support\Facades\Route;
use Modules\Backend\App\Http\Controllers\CategoriesController;
use Modules\Backend\App\Http\Controllers\CouponSettingController;
use Modules\Backend\App\Http\Controllers\CustomerAndOrder\AdminCustomerDetailsController;
use Modules\Backend\App\Http\Controllers\CustomerAndOrder\AdminOrderDetailsController;
use Modules\Backend\App\Http\Controllers\HomeSliderController;
use Modules\Backend\App\Http\Controllers\PaymentTypeSettingController;
use Modules\Backend\App\Http\Controllers\ProductController;
use Modules\Backend\App\Http\Controllers\ReturnPolicyController;
use Modules\Backend\App\Http\Controllers\ShippingSettingController;
use Modules\Backend\App\Http\Controllers\SubCategoriesController;
use Modules\Backend\App\Http\Controllers\SubSubCategoryController;



Route::prefix('admin')->middleware(['auth', 'verified'])->group(function (){
    Route::middleware("permission:setting")->group(function () {
        Route::get('/categories', [CategoriesController::class, 'index'])->name('categories.index');
        Route::post('/categories', [CategoriesController::class, 'store'])->name('categories.store');
        Route::post('/categories/{id}', [CategoriesController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{id}', [CategoriesController::class, 'destroy'])->name('categories.destroy');

        Route::get('/sub-categories', [SubCategoriesController::class, 'index'])->name('sub_categories.index');
        Route::post('/sub-categories', [SubCategoriesController::class, 'store'])->name('sub_categories.store');
        Route::post('/sub-categories/{id}', [SubCategoriesController::class, 'update'])->name('sub_categories.update');
        Route::delete('/sub-categories/{id}', [SubCategoriesController::class, 'destroy'])->name('sub_categories.destroy');


        Route::get('/sub-sub-categories', [SubSubCategoryController::class, 'index'])->name('sub_sub_categories.index');
        Route::post('/sub-sub-categories', [SubSubCategoryController::class, 'store'])->name('sub_sub_categories.store');
        Route::post('/sub-sub-categories/{id}', [SubSubCategoryController::class, 'update'])->name('sub_sub_categories.update');
        Route::delete('/sub-sub-categories/{id}', [SubSubCategoryController::class, 'destroy'])->name('sub_sub_categories.destroy');


        Route::get('/slider', [HomeSliderController::class, 'index'])->name('home_slider.index');
        Route::post('/slider', [HomeSliderController::class, 'store'])->name('home_slider.store');
        Route::post('/slider/{id}', [HomeSliderController::class, 'update'])->name('home_slider.update');
        Route::delete('/slider/{id}', [HomeSliderController::class, 'destroy'])->name('home_slider.destroy');



        Route::get('/return/policies', [ReturnPolicyController::class, 'index'])->name('return_policies.index');
        Route::post('/return/policies', [ReturnPolicyController::class, 'store'])->name('return_policies.store');
        Route::post('/return/policies/{id}', [ReturnPolicyController::class, 'update'])->name('return_policies.update');

        Route::get('/payment/type', [PaymentTypeSettingController::class, 'index'])->name('payment_type.index');
        Route::post('/payment/type', [PaymentTypeSettingController::class, 'store'])->name('payment_type.store');
        Route::post('/payment/type/{id}', [PaymentTypeSettingController::class, 'update'])->name('payment_type.update');
        Route::delete('/payment/type/{id}', [PaymentTypeSettingController::class, 'destroy'])->name('payment_type.destroy');


        Route::get('/shipping/charge', [ShippingSettingController::class, 'index'])->name('shipping.index');
        Route::post('/shipping/charge', [ShippingSettingController::class, 'store'])->name('shipping.store');
        Route::post('/shipping/charge/{id}', [ShippingSettingController::class, 'update'])->name('shipping.update');

        Route::get('/coupon/index', [CouponSettingController::class, 'index'])->name('coupon.index');
        Route::post('/coupon/index', [CouponSettingController::class, 'store'])->name('coupon.store');
        Route::post('/coupon/index/{id}', [CouponSettingController::class, 'update'])->name('coupon.update');
        Route::delete('/coupon/index/{id}', [CouponSettingController::class, 'destroy'])->name('coupon.destroy');


    });


    Route::middleware("permission:product")->group(function () {
        Route::get('/add/product', [ProductController::class, 'create'])->name('add_product.create');
        Route::get('/product/list', [ProductController::class, 'index'])->name('product_list.index');
        Route::get('/product/list/{id}', [ProductController::class, 'edit'])->name('product_list.edit');
        Route::post('/product/list', [ProductController::class, 'store'])->name('product_list.store');
        Route::post('/product/list/{id}', [ProductController::class, 'update'])->name('product_list.update');
        Route::delete('/product/list/{id}', [ProductController::class, 'destroy'])->name('product_list.destroy');
        Route::post('/product/image-remove', [ProductController::class, 'ImageRemove'])->name('product_list.remove_image');

        Route::get('/invoice/order', [AdminOrderDetailsController::class, 'index'])->name('invoice_order.index');
        Route::get('/order/complete', [AdminOrderDetailsController::class, 'CompleteOrder'])->name('invoice_order.complete');
        Route::get('/order/pending', [AdminOrderDetailsController::class, 'PendingOrder'])->name('invoice_order.pending');
        Route::post('/invoice/order/{id}', [AdminOrderDetailsController::class, 'update'])->name('invoice_order.update');

        Route::get('/customer/list', [AdminCustomerDetailsController::class, 'index'])->name('customer.index');
        Route::get('/customer/payment', [AdminCustomerDetailsController::class, 'CustomerPayment'])->name('customer.payment');
        Route::get('/customer/affiliate/profit', [AdminCustomerDetailsController::class, 'CustomerPaymentAffiliate'])->name('affiliate.profit');

    });


});
