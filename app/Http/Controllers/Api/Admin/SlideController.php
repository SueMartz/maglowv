<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Slide;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;


class SlideController extends Controller
{
    // GET /api/v1/slides
    public function index()
    {
        return response()->json(Slide::all(), 200);
    }

   
    public function store(Request $request)
{
    $request->validate([
        'frase' => 'required|string|max:255',
        'link' => 'nullable|url|max:255',
        'posicion' => 'nullable|integer',
        'urlfoto' => 'nullable|string', // base64
    ]);

    $slide = new Slide();
    $slide->frase = $request->frase;
    $slide->link = $request->link;
    $slide->posicion = $request->posicion ?? 0;

    if ($request->filled('urlfoto')) {
        $img = $request->urlfoto;
        $folderPath = "/img/slide/";
        $image_parts = explode(";base64,", $img);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1] ?? 'png';
        $image_base64 = base64_decode($image_parts[1]);
        $fileName = Str::slug($request->frase) . '-' . time() . '.' . $image_type;
        file_put_contents(public_path($folderPath . $fileName), $image_base64);
        $slide->imagen = $fileName;
    }

    $slide->save();

    return response()->json($slide, 200);
}



    // GET /api/v1/slides/{id}
    public function show($id)
    {
        $slide = Slide::find($id);
        if (!$slide) {
            return response()->json(['message' => 'Slide no encontrado'], 404);
        }

        return response()->json($slide, 200);
    }

    // PUT /api/v1/slides/{id}
  



public function update(Request $request, $id)
{
    $slide = Slide::find($id);
    if (!$slide) {
        return response()->json(['message' => 'Slide no encontrado'], 404);
    }

    $request->validate([
        'frase' => 'required|string|max:255',
        'link' => 'nullable|url|max:255',
        'posicion' => 'nullable|integer',
        'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'urlfoto' => 'nullable|string'
    ]);

    $slide->fill($request->only(['frase', 'link', 'posicion']));

    // 🔁 Siempre eliminar imagen anterior si llega nueva
    $imagenAnterior = $slide->imagen;
    $rutaAnterior = public_path('img/slide/' . $imagenAnterior);

    // ✅ Opción 1: Imagen enviada como archivo (form-data)
    if ($request->hasFile('imagen')) {
        if ($imagenAnterior && file_exists($rutaAnterior)) {
            unlink($rutaAnterior);
        }

        $imagen = $request->file("imagen");
        $nombreimagen = Str::slug($request->frase) . '-' . time() . '.' . $imagen->getClientOriginalExtension();
        $imagen->move(public_path('img/slide'), $nombreimagen);
        $slide->imagen = $nombreimagen;
    }

    // ✅ Opción 2: Imagen enviada como base64
    elseif ($request->filled('urlfoto')) {
        $base64 = $request->urlfoto;
        if (preg_match('/^data:image\/(\w+);base64,/', $base64, $type)) {
            $base64 = substr($base64, strpos($base64, ',') + 1);
            $imageType = strtolower($type[1]);

            if (!in_array($imageType, ['jpg', 'jpeg', 'png', 'gif'])) {
                return response()->json(['error' => 'Formato de imagen no válido'], 422);
            }

            $imageData = base64_decode($base64);
            if ($imageData === false) {
                return response()->json(['error' => 'Base64 inválido'], 422);
            }

            if ($imagenAnterior && file_exists($rutaAnterior)) {
                unlink($rutaAnterior);
            }

            $nombreimagen = Str::slug($request->frase) . '-' . time() . '.' . $imageType;
            file_put_contents(public_path('img/slide/' . $nombreimagen), $imageData);
            $slide->imagen = $nombreimagen;
        }
    }

    $slide->save();

    return response()->json([
        'success' => true,
        'message' => 'Slide actualizado correctamente',
        'data' => $slide
    ], 200);
}


    // DELETE /api/v1/slides/{id}
    public function destroy($id)
{
    $slide = Slide::find($id);
    if (!$slide) {
        return response()->json(['message' => 'Slide no encontrado'], 404);
    }

    // Borrar imagen física si existe
    if ($slide->imagen) {
        $rutaImagen = public_path('img/slide/' . $slide->imagen);
        if (file_exists($rutaImagen)) {
            unlink($rutaImagen);
        }
    }

    $slide->delete();

    return response()->json(['success' => true, 'message' => 'Slide eliminado correctamente'], 200);
}

    
}

