<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Facades\Image;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request , $id)
    {
//        $request->user()->fill($request->validated());
//
//        if ($request->user()->isDirty('email')) {
//            $request->user()->email_verified_at = null;
//        }
//
//        $request->user()->save();
//
//        return Redirect::route('profile.edit');


        try {

            $user =  User::where('id',$id)->first();
            $user->name=$request->name;
            $user->email=$request->email;
            if ($request->password !=null){
                $user->password=Hash::make($request->password);
                Auth::login($user);
                return redirect(RouteServiceProvider::HOME);
            }
            if ($request->file('image') !=null) {
                $exists_path = $user->image;
                if (file_exists($exists_path)) {unlink($exists_path);}
                $x = 'abcdefghijklmnopqrstuvwxyz0123456789';
                $x = str_shuffle($x);
                $x = substr($x, 0, 6) . '.PI_S.';
                $image = $request->file('image');
                $filename = time().'.'.$x.$image->getClientOriginalExtension();
                $destinationPath = public_path('Media/UserImage');
                $imgFile = Image::make($image->getRealPath());
                $imgFile->save($destinationPath.'/'.$filename);
                $img_one = 'Media/UserImage'. '/' . $filename;
                $user->image=$img_one;
            }
            $user->save();

            return back()->with('status',"Form submitted successfully!");
        } catch (\Throwable $th) {
            return back()->with('status',"Form not submitted successfully!");
        }

    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
