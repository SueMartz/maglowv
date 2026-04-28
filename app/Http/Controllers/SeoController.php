<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Post;
use App\Models\Pagina;

class SeoController extends Controller
{
    private function renderApp(array $seo = [])
    {
        $seo = array_merge([
            'title'       => 'JEAX Store - Reparación de Rines Profesional',
            'description' => 'Especialistas en enderezado, pintura, diamantado, pulido y barrenado de rines en México.',
            'url'         => url()->current(),
        ], $seo);

        return view('welcome', compact('seo'));
    }

    public function home()
    {
        return $this->renderApp([
            'title'       => 'JEAX Store - Reparación de Rines',
            'description' => 'Servicio profesional de reparación de rines: enderezado, pintura, diamantado, soldadura en aluminio y car detailing.',
        ]);
    }

    public function categorias()
    {
        return $this->renderApp([
            'title'       => 'Servicios de Reparación de Rines | JEAX Store',
            'description' => 'Conoce todos nuestros servicios: enderezado, pintura automotriz, diamantado, pulido, barrenado y más.',
        ]);
    }

    public function categoria($slug)
    {
        $categoria = Categoria::where('slug', $slug)->first();

        return $this->renderApp([
            'title'       => ($categoria->nombre ?? $slug) . ' | JEAX Store',
            'description' => $categoria->descripcion ?? 'Servicio profesional de ' . $slug . ' en JEAX Store.',
        ]);
    }

    public function blog()
    {
        return $this->renderApp([
            'title'       => 'Blog de Rines y Autos | JEAX Store',
            'description' => 'Consejos, noticias y guías sobre reparación y cuidado de rines.',
        ]);
    }

    public function post($slug)
    {
        $post = Post::where('slug', $slug)->first();

        return $this->renderApp([
            'title'       => ($post->titulo ?? $slug) . ' | JEAX Store Blog',
            'description' => $post->extracto ?? $post->descripcion ?? '',
        ]);
    }

    public function pagina($slug)
    {
        $pagina = Pagina::where('slug', $slug)->first();

        return $this->renderApp([
            'title'       => ($pagina->titulo ?? $slug) . ' | JEAX Store',
            'description' => $pagina->descripcion ?? '',
        ]);
    }

    public function app()
    {
        return $this->renderApp();
    }
}