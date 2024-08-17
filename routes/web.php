<?php

use App\Http\Controllers\CompanySetupController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Backend\App\Http\Controllers\AdminDashboardController;
use Modules\Frontend\App\Http\Controllers\CustomerOrder\CustomerDashboardController;


Route::get('reboot', function() {
    Artisan::call('optimize');
    Artisan::call('optimize:clear');
    Artisan::call('storage:link');
    Artisan::call('cache:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');
//    file_put_contents(storage_path('logs/laravel.log'),'');
    Artisan::call('key:generate');
    Artisan::call('config:cache');
    return '<center><h1>System Rebooted!</h1></center>';
});

Route::prefix('user')->middleware(['auth', 'verified'])->group(function (){
    Route::get('/dashboard', [CustomerDashboardController::class, 'index'])->name('user.dashboard');
});

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function (){
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/company', [CompanySetupController::class, 'index'])->name('company.index');
    Route::post('/company', [CompanySetupController::class, 'store'])->name('company.store');
    Route::post('/company/{id}', [CompanySetupController::class, 'update'])->name('company.update');
    Route::post('/profile/{id}', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__.'/auth.php';
