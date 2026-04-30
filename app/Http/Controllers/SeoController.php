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

public function diamantado()
{
    $content = '
        <h2>¿Qué es el diamantado de rines?</h2>
        <p>El diamantado de rines es un proceso de precisión que restaura el acabado original del rin mediante corte controlado en torno CNC. Este procedimiento elimina rayones, desgaste y daños superficiales, devolviendo el brillo metálico característico.</p>

        <h2>¿Cuándo necesitas diamantado?</h2>
        <ul>
            <li>Rines rayados o con desgaste</li>
            <li>Pérdida de brillo original</li>
            <li>Daños por baches o banquetas</li>
            <li>Rines opacos o deteriorados</li>
        </ul>

        <h2>Proceso profesional en JEAX</h2>
        <p>En JEAX realizamos un proceso completo:</p>
        <ul>
            <li>Inspección del rin</li>
            <li>Corrección de imperfecciones</li>
            <li>Maquinado diamantado</li>
            <li>Protección con sellado especializado</li>
        </ul>

        <h2>Ventajas del diamantado</h2>
        <ul>
            <li>Recupera apariencia original</li>
            <li>Mejora estética del vehículo</li>
            <li>Aumenta valor del auto</li>
            <li>Acabado profesional de alta precisión</li>
        </ul>

        <h2>Servicios relacionados</h2>
        <p>
            <a href="https://www.jeax.store/categorias">Reparación de rines</a> |
            <a href="https://www.jeax.store/enderezado-rines">Enderezado de rines</a>
        </p>

        <h2>¿Dónde estamos?</h2>
        <p>Estamos ubicados en Ciudad de México y atendemos zonas como Ecatepec, Venustiano Carranza y alrededores.</p>

        <h2>Contáctanos</h2>
        <p>
            📍 Av Oceanía 291, CDMX<br>
            📞 55 48 48 82 80<br>
            💬 Atención por WhatsApp
        </p>
    ';

    return $this->renderApp([
        'title' => 'Diamantado de Rines en CDMX | Reparación Profesional | JEAX',
        'description' => 'Servicio de diamantado de rines en CDMX. Recupera el acabado original de tus rines con tecnología profesional. Atención rápida y garantizada.'
    ], $content);
}
    public function post($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();

        return $this->renderApp([
            'title'       => ($post->titulo ?? $slug) . ' | JEAX Store Blog',
            'description' => $post->extracto ?? $post->descripcion ?? '',
        ]);
    }

    public function pagina($slug)
    {
        $pagina = Pagina::where('slug', $slug)->firstOrFail();

        return $this->renderApp([
            'title'       => ($pagina->titulo ?? $slug) . ' | JEAX Store',
            'description' => $pagina->descripcion ?? '',
        ]);
    }
    public function enderezado()
{
    $content = '
        <h1>Enderezado de rines en CDMX</h1>

        <h2>¿Qué es el enderezado de rines?</h2>
        <p>El enderezado de rines es un proceso que corrige deformaciones causadas por baches, golpes o desgaste. Permite recuperar la forma original del rin y mejorar la seguridad del vehículo.</p>

        <h2>Señales de que necesitas enderezado</h2>
        <ul>
            <li>Vibración al manejar</li>
            <li>Desgaste irregular en llantas</li>
            <li>Golpes visibles en el rin</li>
            <li>Pérdida de estabilidad</li>
        </ul>

        <h2>Proceso en JEAX</h2>
        <ul>
            <li>Diagnóstico del daño</li>
            <li>Corrección con maquinaria especializada</li>
            <li>Verificación de balanceo</li>
            <li>Pruebas de seguridad</li>
        </ul>

        <h2>Beneficios</h2>
        <ul>
            <li>Mayor seguridad al conducir</li>
            <li>Mejor desempeño del vehículo</li>
            <li>Ahorro en llantas nuevas</li>
        </ul>

        <h2>Ubicación</h2>
        <p>Servicio en Ciudad de México y zonas cercanas como Ecatepec y Venustiano Carranza.</p>

        <div style="margin-top:30px;">
            <a href="https://wa.me/525548488280" 
               style="background:#C9A84C; color:#000; padding:12px 20px; border-radius:8px;">
               Cotizar enderezado por WhatsApp
            </a>
        </div>
    ';

    return $this->renderApp([
        'title' => 'Enderezado de Rines en CDMX | JEAX',
        'description' => 'Servicio profesional de enderezado de rines en CDMX. Corrige golpes, vibraciones y deformaciones.'
    ], $content);
}
    public function app()
    {
        return $this->renderApp();
    }
}