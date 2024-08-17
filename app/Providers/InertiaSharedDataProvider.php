<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class InertiaSharedDataProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Inertia::share([
            // Share All Carts
//            'carts' => function () {
//                return getAllCart();
//            },
            // Share authenticated user information
            'company' => function () {
                return getCompanyInfo();
            },
            // Share notifications
            'categories' => function () {
                // Assuming you have a Notification model and relationship
                return getCategories();
            },
        ]);
    }
}
