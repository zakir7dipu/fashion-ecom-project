<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Frontend\App\Http\Controllers\AddToCard\AddCardController;

Route::post('/product-addCart', [AddCardController::class, 'store'])->name('product_addCart.store');
