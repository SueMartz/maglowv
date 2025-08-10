<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Empresa;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


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
        
        'user_id'     => 'required|exists:users,id'
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
    }

    $data->save();

    return response()->json($data, 200);
}
    public function show($id)
    {
        $data = Empresa::select('id', 'nombre', 'orden', 'publicado')->find($id);
        return response()->json($data,200);
    }

    public function update(Request $request,$id){
        $data = Empresa::find($id);
        
        $data->fill($request->all());
        
        if($request->urlfoto){
            $img = $request->urlfoto;
            $folderPath = "/img/empresa";
            $image_parts = explode(";base64,",$img);
            $image_type_aux = explode("image/",$image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str:: slug($request->nombre) . '.' . $image_type;
            file_put_contents(public_path($file),$image_base64);
            $data->urlfoto = Str::slug($request->nombre) . '.' .$image_type;
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
