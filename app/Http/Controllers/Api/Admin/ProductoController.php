<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Producto;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductoController extends Controller
{
    public function index()
{
    // Carga productos con su categoría relacionada
    $productos = Producto::with('categoria')->get();

    return response()->json($productos, 200);
}


  public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:100|unique:productos,name',
        'title' => 'required|string|max:190',
        'description' => 'required|string|max:290',
        'code' => 'nullable|string|max:10',
        'stock' => 'required|integer|min:0',
        'price' => 'required|numeric|min:0',
        'details' => 'nullable|string',
        'categoria_id' => 'required|exists:categorias,id',
        'urlfoto' => 'nullable|string', // este solo para recibir base64, no existe en DB
    ]);

    $data = new Producto();
    $data->name = $request->name;
    $data->slug = Str::slug($request->name);
    $data->title = $request->title;
    $data->description = $request->description;
    $data->code = $request->code;
    $data->stock = $request->stock;
    $data->price = $request->price;
    $data->details = $request->details;
    $data->visits = 0;
    $data->order = $request->order ?? 0;
    $data->categoria_id = $request->categoria_id;

    if ($request->urlfoto) {
        $img = $request->urlfoto;
        $folderPath = "/img/producto/";

        $image_parts = explode(";base64,", $img);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);

        $file = $folderPath . Str::slug($request->name) . '.' . $image_type;
        file_put_contents(public_path($file), $image_base64);

        $data->image = Str::slug($request->name) . '.' . $image_type;
    }

    $data->save();

    return response()->json([
        'status' => true,
        'message' => 'Producto creado correctamente',
        'data' => $data
    ], 201);
}




    public function show($id)
    {
        $data = Producto::select("id", "name", "slug", "title", "description", "image", "code", "stock", "price", "details", "visits", "order", "categoria_id")
                        ->findOrFail($id);
        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data = Producto::findOrFail($id);

        $request->validate([
            'name' => 'required|max:100|unique:productos,name,' . $id,
            'title' => 'required|max:190',
            'description' => 'required|max:290',
            'code' => 'nullable|string|max:10',
            'stock' => 'nullable|integer',
            'price' => 'required|numeric',
            'details' => 'nullable|string',
            'order' => 'nullable|integer',
            'categoria_id' => 'required|exists:categorias,id',
            'urlfoto' => 'nullable|string', // base64 image
        ]);

        $data->name = $request->name;
        $data->slug = Str::slug($request->name);
        $data->title = $request->title;
        $data->description = $request->description;
        $data->code = $request->code;
        $data->stock = $request->stock ?? 0;
        $data->price = $request->price;
        $data->details = $request->details;
        $data->order = $request->order ?? 0;
        $data->categoria_id = $request->categoria_id;

        // Procesar nueva imagen si se manda
        if ($request->urlfoto) {
            $img = $request->urlfoto;
            $folderPath = "/img/producto/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);

            $fileName = Str::slug($request->name) . '.' . $image_type;
            $filePath = public_path($folderPath . $fileName);
            file_put_contents($filePath, $image_base64);

            $data->image = $fileName;
        }

        $data->save();

        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        $data = Producto::findOrFail($id);

        // Eliminar imagen del servidor (opcional)
        $imagePath = public_path("/img/producto/" . $data->image);
        if (file_exists($imagePath)) {
            @unlink($imagePath);
        }

        $data->delete();
        return response()->json("Producto eliminado correctamente", 200);
    }
}
