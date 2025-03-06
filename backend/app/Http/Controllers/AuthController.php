<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log; 

class AuthController extends Controller
{
    // Registro de usuario
    public function register(Request $request)
    {
        try {
            // Validación de la solicitud
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'rol' => 'required|in:admin,user',
            ]);

            // Creación del usuario
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'rol' => $request->rol,
                'is_active' => true,
            ]);

            // Generación del token JWT
            $token = JWTAuth::fromUser($user);

            // Devolver el token JWT correctamente
            return response()->json(['access_token' => $token, 'token_type' => 'Bearer'], 201);
        } catch (\Exception $e) {
            // Si ocurre un error, lo registramos y lo mostramos
            \Log::error('Error al registrar usuario: ' . $e->getMessage());
            return response()->json(['error' => 'Error en el registro. Por favor, intenta nuevamente.'], 500);
        }
    }

    // Inicio de sesión
    public function login(Request $request)
    {
        // Validar las credenciales
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }

    // Cerrar sesión
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Sesión cerrada']);
    }

    // Obtener usuario autenticado
    public function me()
    {
        return response()->json(Auth::user());
    }
}