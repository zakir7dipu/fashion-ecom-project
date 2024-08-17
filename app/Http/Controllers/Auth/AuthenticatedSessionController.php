<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\CompanySetup;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        $company = CompanySetup::first();

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $email_check = $this->validate_email($request->email);
        if ($email_check==true) {
            $user = User::where('email',$request->email)->first();
            if ($user->hasRole('customer')){
                $request->authenticate();

                $request->session()->regenerate();

                return redirect()->intended(RouteServiceProvider::HOMEUSER);
            }
        }else{
            if (Auth::attempt(['phone' =>$request->email, 'password' =>$request->password]))
            {
                $credentials = ['phone' => $request->get('email'), 'password' => $request->get('password')];
                Auth::attempt($credentials);
                $user = User::where('phone',$request->email)->first();
                if ($user->hasRole('customer')){
                    $request->authenticate();

                    $request->session()->regenerate();

                    return redirect()->intended(RouteServiceProvider::HOMEUSER);
                }
            }else{
                Auth::logout();
                throw ValidationException::withMessages([
                    'email' => trans('auth.failed'),
                ]);
            }
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function validate_email($email) {
        return (preg_match("/(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/", $email) || !preg_match("/^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/", $email)) ? false : true;
    }
}
