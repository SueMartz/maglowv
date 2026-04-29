<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Post;
use App\Models\Pagina;

class SeoController extends Controller
{
    private function renderApp(array $seo = [], $content = '')
{
    $seo = array_merge([
        'title'       => 'JEAX Store - Reparación de Rines Profesional',
        'description' => 'Especialistas en enderezado, pintura, diamantado, pulido y barrenado de rines en México.',
        'url'         => url()->current(),
    ], $seo);

    return view('welcome', compact('seo', 'content'));
}

    public function home()
{
    return $this->renderApp([
        'title' => 'Diamantado de Rines en CDMX | JEAX',
        'description' => 'Recupera el brillo original de tus rines con diamantado profesional.'
    ], '
        <h2>¿Qué es el diamantado de rines?</h2>
        <p>El diamantado es un proceso de precisión que restaura la apariencia original del rin...</p>
    ');
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
    $categoria = Categoria::where('slug', $slug)->firstOrFail();

    $content = "
        <h1>{$categoria->nombre}</h1>
        <p>{$categoria->descripcion}</p>
        <p>En JEAX somos especialistas en {$categoria->nombre} en CDMX.</p>
    ";

    return $this->renderApp([
        'title' => "{$categoria->nombre} en CDMX | JEAX",
        'description' => $categoria->descripcion
    ], $content);
}

    public function blog()
    {
        return $this->renderApp([
            'title'       => 'Blog de Rines y Autos | JEAX Store',
            'description' => 'Consejos, noticias y guías sobre reparación y cuidado de rines.',
        ]);
    }

    public function sitemap()
{
    $categorias = Categoria::all();
    $posts = Post::all();

    $xml = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // HOME
    $xml .= '<url>';
    $xml .= '<loc>' . url('/') . '</loc>';
    $xml .= '<lastmod>' . now()->toAtomString() . '</lastmod>';
    $xml .= '<priority>1.0</priority>';
    $xml .= '<changefreq>weekly</changefreq>';
    $xml .= '</url>';

    // PÁGINAS SEO (IMPORTANTES)
    $paginasSeo = [
        '/diamantado-rines-cdmx',
        '/reparacion-rines-aluminio',
        '/enderezado-rines',
    ];

    foreach ($paginasSeo as $page) {
        $xml .= '<url>';
        $xml .= '<loc>' . url($page) . '</loc>';
        $xml .= '<lastmod>' . now()->toAtomString() . '</lastmod>';
        $xml .= '<priority>0.9</priority>';
        $xml .= '</url>';
    }

    // CATEGORÍAS
    foreach ($categorias as $cat) {
        $xml .= '<url>';
        $xml .= '<loc>' . url('/categorias/' . $cat->slug) . '</loc>';
        $xml .= '<lastmod>' . now()->toAtomString() . '</lastmod>';
        $xml .= '<priority>0.7</priority>';
        $xml .= '<changefreq>weekly</changefreq>';
        $xml .= '</url>';
    }

    // POSTS (BLOG)
    foreach ($posts as $post) {
        $xml .= '<url>';
        $xml .= '<loc>' . url('/blog/post/' . $post->slug) . '</loc>';
        $xml .= '<lastmod>' . $post->updated_at->toAtomString() . '</lastmod>';
        $xml .= '<priority>0.6</priority>';
        $xml .= '<changefreq>monthly</changefreq>';
        $xml .= '</url>';
    }

    $xml .= '</urlset>';

    return response($xml, 200)->header('Content-Type', 'application/xml');
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