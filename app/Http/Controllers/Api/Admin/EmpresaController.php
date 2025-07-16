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
        $data = Empresa::get(["id","nombre"]);
        return response()->json($data,200);

    }

    public function store(Request $request){
        //validacion
        $data = new Empresa($request->all());
        //upload image
        $img = $request->urlfoto;
        if($request->urlfoto){
            $img = $request->urlfoto;
            $folderPath = "/img/empresa/";
            $image_parts = explode(";base64,",$img);
            $image_type_aux = explode("image/",$image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str:: slug($request->nombre) . '.' . $image_type;
            file_put_contents(public_path($file),$image_base64);
            $data->urlfoto = Str::slug($request->nombre) . '.' .$image_type;
        }
       
        $data->save();
        return response()->json($data,200);

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
