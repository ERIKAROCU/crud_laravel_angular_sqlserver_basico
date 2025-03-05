<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Productos;

class ProductoController extends Controller
{
    // Obtener todos los productos
    public function index()
    {
        return response()->json(Productos::all());
    }

    // Guardar un nuevo producto
    public function store(Request $request)
    {
        $producto = Productos::create($request->all());
        return response()->json($producto, 201);
    }

    // Obtener un solo producto por ID
    public function show($id)
    {
        $producto = Productos::find($id);
        if (!$producto) {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }
        return response()->json($producto);
    }

    // Actualizar un producto
    public function update(Request $request, $id)
    {
        $producto = Productos::find($id);
        if (!$producto) {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }
        $producto->update($request->all());
        return response()->json($producto);
    }

    // Eliminar un producto
    public function destroy($id)
    {
        $producto = Productos::find($id);
        if (!$producto) {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }
        $producto->delete();
        return response()->json(['mensaje' => 'Producto eliminado']);
    }
}
