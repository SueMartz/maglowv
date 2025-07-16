<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Str;

class PostController extends Controller
{
    // GET /api/v1/posts
    public function index()
    {
        return response()->json(Post::all(), 200);
    }

    // POST /api/v1/posts
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:posts',
            'title' => 'required|string|max:190',
            'description' => 'required|string|max:290',
            'descripcion' => 'required|string',
            'order' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'urlfoto' => 'nullable|string', // base64 optional
        ]);

        $post = new Post();
        $post->name = $request->name;
        $post->title = $request->title;
        $post->description = $request->description;
        $post->descripcion = $request->descripcion;
        $post->order = $request->order ?? 0;
        $post->slug = Str::slug($request->name);
        $post->visits = 0;

        // Imagen vía archivo
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = Str::slug($request->name) . '-' . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('img/post'), $filename);
            $post->image = $filename;
        }
        // Imagen vía base64
        elseif ($request->filled('urlfoto')) {
            $img = $request->urlfoto;
            $folderPath = public_path("/img/post/");
            if (!file_exists($folderPath)) {
                mkdir($folderPath, 0755, true);
            }
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1] ?? 'png';
            $image_base64 = base64_decode($image_parts[1]);
            $fileName = Str::slug($request->name) . '-' . time() . '.' . $image_type;
            file_put_contents($folderPath . $fileName, $image_base64);
            $post->image = $fileName;
        }

        $post->save();

        return response()->json($post, 201);
    }

    // GET /api/v1/posts/{id}
    public function show($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post no encontrado'], 404);
        }
        return response()->json($post, 200);
    }

    // PUT /api/v1/posts/{id}
    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post no encontrado'], 404);
        }

        $request->validate([
            'name' => "required|string|max:100|unique:posts,name,{$id}",
            'title' => 'required|string|max:190',
            'description' => 'required|string|max:290',
            'descripcion' => 'required|string',
            'order' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'urlfoto' => 'nullable|string',
        ]);

        $post->name = $request->name;
        $post->title = $request->title;
        $post->description = $request->description;
        $post->descripcion = $request->descripcion;
        $post->order = $request->order ?? 0;
        $post->slug = Str::slug($request->name);

        // Eliminar imagen anterior si hay nueva imagen (archivo)
        if ($request->hasFile('image')) {
            if ($post->image && file_exists(public_path('img/post/' . $post->image))) {
                unlink(public_path('img/post/' . $post->image));
            }
            $image = $request->file('image');
            $filename = Str::slug($request->name) . '-' . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('img/post'), $filename);
            $post->image = $filename;
        }
        // O imagen base64
        elseif ($request->filled('urlfoto')) {
            if ($post->image && file_exists(public_path('img/post/' . $post->image))) {
                unlink(public_path('img/post/' . $post->image));
            }
            $img = $request->urlfoto;
            $folderPath = public_path("/img/post/");
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1] ?? 'png';
            $image_base64 = base64_decode($image_parts[1]);
            $fileName = Str::slug($request->name) . '-' . time() . '.' . $image_type;
            file_put_contents($folderPath . $fileName, $image_base64);
            $post->image = $fileName;
        }

        $post->save();

        return response()->json(['success' => true, 'message' => 'Post actualizado correctamente', 'data' => $post], 200);
    }

    // DELETE /api/v1/posts/{id}
    public function destroy($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post no encontrado'], 404);
        }

        if ($post->image && file_exists(public_path('img/post/' . $post->image))) {
            unlink(public_path('img/post/' . $post->image));
        }

        $post->delete();

        return response()->json(['success' => true, 'message' => 'Post eliminado correctamente'], 200);
    }
}
