<?php

namespace App\Http\Controllers\Api\Client;

use App\Models\Empresa;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class EmpresaController extends Controller
{
        public function index()
    {   
        
        $data = Empresa::whereUser_id(auth()->user()->id)->orderBy("orden")->get(["id","orden","nombre"]);
        //$data = Empresa::get(["id","nombre","orden"]);
        return response()->json($data,200);

    }
    public function store(Request $request)
{
    // Validación básica (puedes agregar más reglas)
    $request->validate([
        'nombre'    => 'required|string|max:255',
        'slug'      => 'nullable|string',
        'urlfoto'   => 'nullable|string',
        'categoria_id' => 'required|exists:categorias,id'
    ]);

    $data = new Empresa($request->all());

    // Manejo de imagen en base64
    if ($request->urlfoto) {
        try {
            $img = $request->urlfoto;
            $folderPath = "/img/empresa/";
            $image_parts = explode(";base64,", $img);

            if (count($image_parts) !== 2) {
                return response()->json(['error' => 'Formato de imagen inválido.'], 422);
            }

            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1] ?? 'png';
            $image_base64 = base64_decode($image_parts[1]);

            $filename = Str::slug($request->nombre) . '.' . $image_type;
            $file_path = public_path($folderPath . $filename);
            file_put_contents($file_path, $image_base64);

            $data->urlfoto = $filename;

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al procesar la imagen.'], 500);
        }
    }

    $data->user_id = auth()->id();
    $data->save();

    return response()->json($data, 200);
}
    public function show($id)
    {
        $data = Empresa::select('id', 'nombre', 'orden', 'publicado','email', 'descripcion', 'telefono', 'direccion', 'website', 'facebook', 'youtube', 'tiktok', 'urlfoto', 'categoria_id')->find($id);
        return response()->json($data,200);
    }

    public function update(Request $request, $id)
{
    $request->validate([
        'nombre' => 'required|string|max:255',
        'telefono' => 'nullable|string|max:20',
        'direccion' => 'nullable|string',
        'email' => 'nullable|email|max:255',
        'descripcion' => 'nullable|string',
        'orden' => 'nullable|integer',
        'categoria_id' => 'required|integer|exists:categorias,id',
        'website' => 'nullable|url',
        'facebook' => 'nullable|url',
        'youtube' => 'nullable|url',
        'tiktok' => 'nullable|url',
        'file' => 'nullable|string' // base64
    ]);

    $data = Empresa::find($id);
    if (!$data) {
        return response()->json(['error' => 'Empresa no encontrada'], 404);
    }

    $data->fill($request->only([
        'nombre', 'telefono', 'direccion', 'email', 'descripcion',
        'orden', 'categoria_id', 'website', 'facebook', 'youtube', 'tiktok'
    ]));

    if ($request->file) {
        try {
            $img = $request->file;
            $folderPath = "/img/empresa/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $filename = Str::slug($request->nombre) . '-' . time() . '.' . $image_type;
            $file = $folderPath . $filename;
            file_put_contents(public_path($file), $image_base64);
            $data->urlfoto = $filename;
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo guardar la imagen'], 500);
        }
    }

    $data->save();

    return response()->json($data, 200);
}


    public function destroy( $id)
    {
        $data = Empresa::find($id);
        $data->delete();
        return response()->json("Borrado", 200);
    }
}
