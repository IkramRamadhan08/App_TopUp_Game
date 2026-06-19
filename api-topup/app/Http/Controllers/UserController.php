<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Google_Client;




class UserController extends Controller
{
    
    function register(Request $req)
    {
       $validated = $req->validate([
           'name' => 'required|string|max:255',
           'email' => 'required|email|unique:users,email',
           'password' => 'required|string|min:6',
       ]);

       $user = User::create([
           'name' => $validated['name'],
           'email' => $validated['email'],
           'password' => Hash::make($validated['password']),
       ]);

       return response()->json($user, 201);
    }

    function login(Request $req){
    $req->validate([
        'email'    => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $req->email)->first();

    if (! $user || ! Hash::check($req->password, $user->password)) {
        return response()->json(['message' => 'Email atau password salah'], 401);
    }

    // Optional: jika hanya admin yang boleh login
    // if ($user->role !== 'admin') {
    //     return response()->json(['message' => 'Unauthorized'], 403);
    // }

    $token = $user->createToken('admin-token')->plainTextToken;

    return response()->json([
        'message' => 'Login berhasil',
        'token' => $token,
        'user' => $user,
    ]);
}

function googleLogin(Request $request)
{
    $client = new \Google_Client(['client_id' => '279072542678-oqhnq4faca0d2d4tc4e25sq21sj9b9ih.apps.googleusercontent.com']);
    $payload = $client->verifyIdToken($request->credential);

    if ($payload) {
        $user = User::firstOrCreate(
            ['email' => $payload['email']],
            ['name' => $payload['name'], 'password' => Hash::make(Str::random(16))]
        );

        $token = $user->createToken('google_token')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    return response()->json(['error' => 'Invalid Google token'], 401);

    return redirect("http://localhost:5173/admin?token={$token}");
}
}
    