<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\CompanySetup;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AdminLoginController extends Controller
{
    public function create(): Response
    {
        $company = CompanySetup::first();

        return Inertia::render('Auth/AdminLogin', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'company' => $company,
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $email_check = $this->validate_email($request->email);
        if ($email_check==true) {
            $request->authenticate();

            $request->session()->regenerate();

            return redirect()->intended(RouteServiceProvider::HOME);
        }else{
            if (Auth::attempt(['phone' =>$request->email, 'password' =>$request->password, 'status' => 1]))
            {
                $credentials = ['phone' => $request->get('email'), 'password' => $request->get('password')];
                Auth::attempt($credentials);
                $request->session()->regenerate();
                return redirect()->intended(RouteServiceProvider::HOME);
            }else{
                Auth::logout();
                throw ValidationException::withMessages([
                    'email' => trans('auth.failed'),
                ]);
            }
        }
    }

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
