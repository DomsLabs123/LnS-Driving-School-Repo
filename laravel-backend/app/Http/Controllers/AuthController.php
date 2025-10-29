<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\AuditLog;



class AuthController extends Controller
{
        public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        Auth::login($user);

        // Log the login action (only for admin, staff, instructor)
if (in_array($user->role, ['admin', 'staff', 'instructor',])) {
    AuditLog::create([
        'user_id'   => $user->id,
        'user_type' => $user->role,
        'action'    => 'login',
        'details'   => "User logged in successfully", //
        'created_at'=> now(),
    ]);
}


        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role, // 'admin' or 'student'
            ],
            'token' => $token
        ]);
    }

        public function logout(Request $request)
{
    $user = $request->user(); // capture the user

    if ($user && in_array($user->role, ['admin', 'staff', 'instructor'])) {
        AuditLog::create([
            'user_id'   => $user->id,
            'user_type' => $user->role,
            'action'    => 'logout',
            'details'   => 'User logout',
            'created_at'=> now(),
        ]);
    }

    // Do NOT invalidate session or delete token
    return response()->json([
        'message' => 'Audit log recorded: logout clicked, session remains active'
    ]);
}


        public function getAdmin()
        {
            $user = Auth::user();
            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ]);
        }

        public function getInstructor()
        {
            $user = Auth::user();
            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ]);
        }

        public function getProfile()
        {
            $user = Auth::user();
            if ($user->role === 'student') {
                return response()->json([
                    'role' => $user->role,
                    'name' => $user->name,       
                ]);
            }
            return response()->json([
                'message' => 'Role not permitted',
            ], 403);
        }
    
}
