<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pagina;
use Illuminate\Support\Str;

class PaginaController extends Controller
{
    public function index()
    {
        return response()->json(Pagina::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:paginas',
            'title' => 'required|string|max:190',
            'description' => 'required|string|max:290',
            'texttop' => 'nullable|string',
            'textbottom' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'urlfoto' => 'nullable|string', // base64 (opcional)
        ]);

        $pagina = new Pagina();
        $pagina->name = $request->name;
        $pagina->slug = Str::slug($request->name);
        $pagina->title = $request->title;
        $pagina->description = $request->description;
        $pagina->texttop = $request->texttop;
        $pagina->textbottom = $request->textbottom;

        // Imagen desde archivo
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = Str::slug($request->name) . '-' . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('img/pagina'), $filename);
            $pagina->image = $filename;
        }
        // Imagen desde base64
        elseif ($request->filled('urlfoto')) {
            $img = $request->urlfoto;
            $folderPath = public_path("/img/pagina/");
            if (!file_exists($folderPath)) {
                mkdir($folderPath, 0755, true);
            }
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1] ?? 'png';
            $image_base64 = base64_decode($image_parts[1]);
            $fileName = Str::slug($request->name) . '-' . time() . '.' . $image_type;
            file_put_contents($folderPath . $fileName, $image_base64);
            $pagina->image = $fileName;
        }

        $pagina->save();

        return response()->json($pagina, 201);
    }

    public function show($id)
    {
        $pagina = Pagina::find($id);
        if (!$pagina) {
            return response()->json(['message' => 'Página no encontrada'], 404);
        }
        return response()->json($pagina, 200);
    }

    public function update(Request $request, $id)
    {
        $pagina = Pagina::find($id);
        if (!$pagina) {
            return response()->json(['message' => 'Página no encontrada'], 404);
        }

        $request->validate([
            'name' => "required|string|max:100|unique:paginas,name,{$id}",
            'title' => 'required|string|max:190',
            'description' => 'required|string|max:290',
            'texttop' => 'nullable|string',
            'textbottom' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'urlfoto' => 'nullable|string',
        ]);

        $pagina->name = $request->name;
        $pagina->slug = Str::slug($request->name);
        $pagina->title = $request->title;
        $pagina->description = $request->description;
        $pagina->texttop = $request->texttop;
        $pagina->textbottom = $request->textbottom;

        $oldImagePath = public_path('img/pagina/' . $pagina->image);

        if ($request->hasFile('image')) {
            if ($pagina->image && file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
            $image = $request->file('image');
            $filename = Str::slug($request->name) . '-' . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('img/pagina'), $filename);
            $pagina->image = $filename;
        } elseif ($request->filled('urlfoto')) {
            if ($pagina->image && file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
            $img = $request->urlfoto;
            $folderPath = public_path("/img/pagina/");
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1] ?? 'png';
            $image_base64 = base64_decode($image_parts[1]);
            $fileName = Str::slug($request->name) . '-' . time() . '.' . $image_type;
            file_put_contents($folderPath . $fileName, $image_base64);
            $pagina->image = $fileName;
        }

        $pagina->save();

        return response()->json(['success' => true, 'message' => 'Página actualizada correctamente', 'data' => $pagina], 200);
    }

    public function destroy($id)
    {
        $pagina = Pagina::find($id);
        if (!$pagina) {
            return response()->json(['message' => 'Página no encontrada'], 404);
        }

        $imagePath = public_path('img/pagina/' . $pagina->image);
        if ($pagina->image && file_exists($imagePath)) {
            unlink($imagePath);
        }

        $pagina->delete();

        return response()->json(['success' => true, 'message' => 'Página eliminada correctamente'], 200);
    }
}
