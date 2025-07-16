<?php

namespace App\Http\Controllers\Api;

use App\Models\Empresa;
use App\Models\Categoria;
use App\Models\Slide;
use App\Models\Post;
use App\Models\Pagina;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    public function empresas(Request $request)
    {
        $quantity = $request->input('quantity', 5); // valor por defecto: 5
        $data = Empresa::orderByDesc("created_at")
            ->take($quantity)
            ->get();

        return response()->json($data, 200);
    }

    public function search(Request $request)
    {
        $data = Empresa::where("nombre", "like", $request->text . "%")->get();
        return response()->json($data, 200);
    }

    public function categorias()
    {
        $data = Categoria::all(); // también puedes usar ->get() si prefieres
        return response()->json($data, 200);
    }

    public function categoria($slug)
    {
        $data = [];
        $categoria = Categoria::whereSlug($slug)->first();

        if (!empty($categoria)) {
            $data = [
                'categoria' => $categoria,
                'empresas'  => $categoria->empresas
            ];
        }

        return response()->json($data, 200);
    }
    // Nuevo método para obtener slides
    public function slides()
    {
        $data = Slide::select('imagen', 'frase', 'link')->get();
        return response()->json($data, 200);
    }

    // Nuevo método para obtener categorías para home
    public function categoriasHome()
    {
        $data = Categoria::select('nombre', 'slug', 'urlfoto')->get();
        return response()->json($data, 200);
    }

    public function posts()
    {
        return response()->json(Post::orderBy('order')->get());
    }
    public function paginas()
    {
        return response()->json(Pagina::orderBy('id')->get());
    }
    public function postBySlug($slug)
    {
        return response()->json(Post::where('slug', $slug)->firstOrFail());
    }
    public function paginaBySlug($slug)
    {
        return response()->json(Pagina::where('slug', $slug)->firstOrFail());
    }
}
