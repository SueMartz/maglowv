<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Empresa;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;


class EmpresaController extends Controller
{
    //
        public function index()
    {
         $data = Empresa::orderBy('orden')
                  ->get(["id", "orden", "nombre", "urlfoto", "publicado"]);
        return response()->json($data,200);
    }

    public function store(Request $request)
{
    // Validación completa según la estructura de la tabla
    $request->validate([
        'nombre'      => 'required|string|max:50',
        'email'       => 'required|email|max:50|unique:empresas,email',
        'telefono'    => 'required|string|max:250',
        'direccion'   => 'required|string|max:250',
        'website'     => 'nullable|string|max:50',
        'facebook'    => 'nullable|string|max:50',
        'youtube'     => 'nullable|string|max:50',
        'tiktok'      => 'nullable|string|max:50',
        'descripcion' => 'nullable|string',
        'urlfoto'     => 'nullable|string',
        'publicado'   => 'nullable|boolean',
        'orden'       => 'nullable|integer',
        'visitas'     => 'nullable|integer',
        
        
    ]);

    // Crear instancia sin imagen aún
    $data = new Empresa($request->except('urlfoto'));

    // Procesar imagen si viene en base64
    if ($request->urlfoto) {
        $img = $request->urlfoto;
        $folderPath = "/img/empresa/";
        $image_parts = explode(";base64,", $img);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);

        $fileName = Str::slug($request->nombre) . '.' . $image_type;
        $filePath = public_path($folderPath . $fileName);
        file_put_contents($filePath, $image_base64);

        $data->urlfoto = $fileName;
        $data->user_id = Auth::id();
    }

    $data->save();

    return response()->json($data, 200);
}
    public function show($id)
    {
        $data = Empresa::select('nombre', 'email', 'telefono', 'direccion', 'latitud', 'longitud', 'website', 'facebook', 'youtube', 'tiktok', 'descripcion', 'urlfoto', 'publicado', 'orden', 'visitas')->find($id);
        return response()->json($data,200);
    }

     public function update(Request $request, $id)
{
    $request->validate([
    'nombre'      => 'required|string|max:50',
    'email'       => 'nullable|email|max:50|unique:empresas,email,'.$id,
    'telefono'    => 'nullable|string|max:250',
    'direccion'   => 'nullable|string|max:250',
    'website'     => 'nullable|string|max:50',
    'facebook'    => 'nullable|string|max:50',
    'youtube'     => 'nullable|string|max:50',
    'tiktok'      => 'nullable|string|max:50',
    'descripcion' => 'nullable|string',
    'file'        => 'nullable|string', // base64
    'publicado'   => 'nullable|boolean',
    'orden'       => 'nullable|integer',
    ]);

    $data = Empresa::find($id);
    if (!$data) {
        return response()->json(['error' => 'Empresa no encontrada'], 404);
    }

    $data->fill($request->only([
        'nombre', 'telefono', 'direccion', 'email', 'descripcion', 'latitud', 'longitud',
        'orden', 'website', 'facebook', 'youtube', 'tiktok'
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
