<?php

use Illuminate\Support\Facades\Route;
use Modules\Frontend\App\Http\Controllers\AddToCard\AddCardController;
use Modules\Frontend\App\Http\Controllers\CustomerOrder\AffiliateController;
use Modules\Frontend\App\Http\Controllers\CustomerOrder\CustomerDashboardController;
use Modules\Frontend\App\Http\Controllers\CustomerOrder\CustomerOrderController;
use Modules\Frontend\App\Http\Controllers\CustomerOrder\ProductOrderController;
use Modules\Frontend\App\Http\Controllers\CustomerOrder\WishListController;
use Modules\Frontend\App\Http\Controllers\WelcomeHomeController;



Route::get('/', [WelcomeHomeController::class, 'index'])->name('home');
Route::get("/m-category", [WelcomeHomeController::class, 'mCategory'])->name('mCategory');
//Route::get('/categories_slice', [WelcomeHomeController::class, 'categories']);
//Route::get('/company_slice', [WelcomeHomeController::class, 'company']);
//Route::get('/slide_slice', [WelcomeHomeController::class, 'Sliders']);
Route::get('/shop/{id}', [WelcomeHomeController::class, 'SubCatProduct'])->name('shop.product');
Route::get('/shop-sub/{id}', [WelcomeHomeController::class, 'SubCatProductSub'])->name('shop.product_sub');
Route::get('/shop-discount', [WelcomeHomeController::class, 'SubCatProductDiscount'])->name('shop.product_discount');
Route::get('/product/{id}', [WelcomeHomeController::class, 'ProductDetails'])->name('product.details');

Route::get('/product-addCart', [AddCardController::class, 'index']);
Route::post('/product-addCart', [AddCardController::class, 'store']);
Route::post('/product_cart_update', [AddCardController::class, 'update']);
Route::post('/product_postAllCheck', [AddCardController::class, 'UpdateAllProductCheck']);
Route::post('/product_cart_delete', [AddCardController::class, 'CartDelete']);
Route::get('/product_checkout', [AddCardController::class, 'ProductCheckOut'])->name('product.checkout');
Route::get('/product-allCoupon', [AddCardController::class, 'AllCoupon']);
Route::post('/addCart-coupon', [AddCardController::class, 'CouponAddUpdate']);
Route::post('/addCart-couponAffiliate', [AddCardController::class, 'AffiliateCouponAddUpdate']);
Route::post('/addCart-couponRemove', [AddCardController::class, 'CouponRemove']);
Route::get('/affiliate-user', [AddCardController::class, 'AffiliateUser']);


Route::post('/product/order', [ProductOrderController::class, 'store'])->name('product_checkout.order');
Route::get('/checkout/payment/{id}', [ProductOrderController::class, 'CheckOutPayment'])->name('payment.checkout');
Route::post('/checkout/payment', [ProductOrderController::class, 'CheckOutPaymentSuccess'])->name('checkout_success.order');
Route::get('/recent_product', [ProductOrderController::class, 'RecentProduct']);


Route::prefix('user')->middleware(['auth', 'verified'])->group(function (){
    Route::get('/profile', [CustomerDashboardController::class, 'UserProfile'])->name('user.profile');
    Route::post('/profile-update/{id}', [CustomerDashboardController::class, 'UserProfileUpdate'])->name('user.profile_update');
    Route::get('/address-info', [CustomerDashboardController::class, 'UserAddressInfo'])->name('user.address_info');
    Route::post('/address-info/{id}', [CustomerDashboardController::class, 'UserAddressInfoUpdate'])->name('user.address_info_update');


    Route::get('/customer-orders', [CustomerOrderController::class, 'index'])->name('customer.orders');
    Route::get('/customer-orders-tracking', [CustomerOrderController::class, 'OrderTracking'])->name('orders.tracking');
    Route::get('/orders-tracking-log/{id}', [CustomerOrderController::class, 'OrderTrackingLog'])->name('orders.tracking_log');

    Route::get('/customer-wish', [WishListController::class, 'index'])->name('wish.index');
    Route::post('/customer-wish', [WishListController::class, 'store'])->name('wish.store');
    Route::post('/customer-wish/{id}', [WishListController::class, 'update'])->name('wish.update');

    Route::get('/change-password', [CustomerDashboardController::class, 'CustomerChangePassword'])->name('change.password');
    Route::get('/affiliate/program', [AffiliateController::class, 'index'])->name('affiliate.index');

});

