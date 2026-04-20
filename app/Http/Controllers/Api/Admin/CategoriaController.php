<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Categoria;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoriaController extends Controller
{
       //
    public function index()
    {
        $data = Categoria::get(["id","urlfoto","slug","orden", "nombre"]);
        return response()->json($data,200);

    }

    public function store(Request $request){
        //validacion
        $data = new Categoria($request->all());
        //upload image
        $img = $request->urlfoto;
        if($request->urlfoto){
            $img = $request->urlfoto;
            $folderPath = "/img/categoria/";
            $image_parts = explode(";base64,",$img);
            $image_type_aux = explode("image/",$image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str:: slug($request->nombre) . '.' . $image_type;
            file_put_contents(public_path($file),$image_base64);
            $data->urlfoto = Str::slug($request->nombre) . '.' .$image_type;
        }
        $data->slug = Str::slug($request->nombre);
        $data->save();
        return response()->json($data,200);

    }
    public function show($id)
    {
        $data = Categoria::select("id", "nombre", "descripcion", "orden", "menu", "urlfoto","slug")
                     ->findOrFail($id);
        return response()->json($data, 200);
    }

    public function update(Request $request,$id){
        $data = Categoria::find($id);

        
        //$data->fill($request->all());
        $data->nombre = $request->nombre;
        $data->descripcion = $request->descripcion;
        $data->orden = $request->orden;
        $data->slug = Str::slug($request->nombre);
      //  $data->menu = $request->menu ? 1:0;

        
    if($request->file && str_contains($request->file, 'base64')){

    // 🔥 BORRAR IMAGEN ANTERIOR
    if($data->urlfoto && file_exists(public_path('/img/categoria/'.$data->urlfoto))){
        unlink(public_path('/img/categoria/'.$data->urlfoto));
    }

    $img = $request->file;
    $folderPath = "/img/categoria/";

    $image_parts = explode(";base64,", $img);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];

    $image_base64 = base64_decode($image_parts[1]);

    // 🔥 NOMBRE ÚNICO (AQUÍ VA TU CÓDIGO)
    $filename = Str::slug($request->nombre) . '-' . time() . '.' . $image_type;

    $file = $folderPath . $filename;

    file_put_contents(public_path($file), $image_base64);

    $data->urlfoto = $filename;
}
       
        $data->save();
        return response()->json($data, 200);
    }

    public function destroy( $id)
    {
        // borrar las imagenes en la carpeta
        $data = Categoria::find($id);
        $data->delete();
        return response()->json("Borrado", 200);
    }


}
