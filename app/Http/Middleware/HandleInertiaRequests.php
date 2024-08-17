<?php

namespace App\Http\Middleware;

use App\Models\CompanySetup;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */



    public function share(Request $request): array
    {
        $company = CompanySetup::first();
        return array_merge(parent::share($request), [
            'appName' => config('app.name'),
            'auth.user' => fn () => $request->user()
                ? $request->user()->only('id', 'name', 'email', 'phone', 'image')
                : null,
            'auth.roles' => fn () => $request->user()
                ? $request->user()->roles->pluck('name')->toArray()
                : null,
            'auth.company' => fn () => $request->user() && $company
                ? $company->only('name', 'address', 'contact', 'payment_no', 'email', 'social_link', 'company_logo', 'trending', 'trending_image')
                : null,
        ]);
    }
}
