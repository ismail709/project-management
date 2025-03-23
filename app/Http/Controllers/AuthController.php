<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        if(Auth::attempt($request->only("email","password"))){
            $request->session()->regenerate();
            return to_route('projects.index');
        }

        return back()->withErrors(['email'=> 'these credentials does not match our records']);
    }

    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();

        return to_route('login');
    }

    public function register(RegisterRequest $request){
        // dd("hello");
        $user = User::create($request->validated());

        Auth::login($user);

        return to_route('projects.index');
    }
}
