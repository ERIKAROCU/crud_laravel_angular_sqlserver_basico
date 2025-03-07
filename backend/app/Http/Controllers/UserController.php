<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Obtener todos los usuarios
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Crear un nuevo usuario
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'rol' => 'required|in:admin,user',
            'is_active' => 'required|boolean',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Hash the password
            'rol' => $request->rol,
            'is_active' => $request->is_active,
        ]);

        return response()->json($user, 201);
    }

    // Actualizar un usuario existente
    public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'sometimes|string|max:255',
        'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
        'password' => 'sometimes|nullable|string|min:6', // Validar solo si el campo está presente
        'rol' => 'sometimes|in:admin,user',
        'is_active' => 'sometimes|boolean',
    ]);

    $user = User::find($id);
    if (!$user) {
        return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
    }

    // Actualizar solo los campos presentes en la solicitud
    if ($request->has('name')) {
        $user->name = $request->name;
    }
    if ($request->has('email')) {
        $user->email = $request->email;
    }
    if ($request->has('password') && $request->password !== null) {
        $user->password = bcrypt($request->password); // Hashear la nueva contraseña
    }
    if ($request->has('rol')) {
        $user->rol = $request->rol;
    }
    if ($request->has('is_active')) {
        $user->is_active = $request->is_active;
    }

    $user->save();

    return response()->json($user);
}
}