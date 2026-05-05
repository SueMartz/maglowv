<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Post;
use App\Models\Pagina;

class SeoController extends Controller
{
    private function renderApp(array $seo = [], $content = '', $useReact = true)
{
    $seo = array_merge([
        'title'       => 'JEAX Store - Reparación de Rines Profesional',
        'description' => 'Especialistas en enderezado, pintura, diamantado, pulido y barrenado de rines en México.',
        'url'         => url()->current(),
    ], $seo);

    return view('welcome', [
        'seo' => $seo,
        'content' => $content,
        'useReact' => $useReact
    ]);
}
    public function home()
{
    return $this->renderApp([
        'title' => 'Diamantado de Rines en CDMX | JEAX',
        'description' => 'Recupera el brillo original de tus rines con diamantado profesional.'
    ], '
        
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
        <main>
        <article>

            <h1>{$categoria->nombre} en CDMX</h1>

            <section>
            <h2>Servicio profesional de {$categoria->nombre}</h2>
            <p>{$categoria->descripcion}</p>
            <p>
                En JEAX contamos con experiencia en {$categoria->nombre} en Ciudad de México,
                ofreciendo soluciones profesionales para recuperar el estado óptimo de tus rines.
            </p>
            </section>

            <section>
            <h2>¿Por qué elegirnos?</h2>
            <ul>
                <li>Equipo especializado</li>
                <li>Atención rápida</li>
                <li>Resultados garantizados</li>
            </ul>
            </section>

            <section>
            <h2>Servicios relacionados</h2>
            <p>
                <a href='/enderezado-rines'>Enderezado de rines</a> |
                <a href='/diamantado-rines-cdmx'>Diamantado de rines</a>
            </p>
            </section>

        </article>
        </main>
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

public function contacto()
{
    $content = '
    <main>
      <article>

        <h1>Contacto y ubicación | JEAX</h1>

        <section>
          <h2>¿Dónde estamos?</h2>
          <p>
            Nos encontramos en Ciudad de México, brindando servicio en zonas como
            Ecatepec, Venustiano Carranza y alrededores.
          </p>
        </section>

        <section>
          <h2>Dirección</h2>
          <p>Av Oceanía 291, Ciudad de México</p>
        </section>

        <section>
          <h2>Teléfono</h2>
          <p>55 48 48 82 80</p>
        </section>

        <section>
          <h2>Contacto rápido</h2>
          <p>
            <a href="https://wa.me/525548488280">Enviar mensaje por WhatsApp</a>
          </p>
        </section>

      </article>
    </main>
    ';

    return $this->renderApp([
        'title' => 'Contacto JEAX | Reparación de Rines en CDMX',
        'description' => 'Ubicación, teléfono y contacto de JEAX. Servicio de reparación de rines en CDMX y zona metropolitana.'
    ], $content, false);
}

public function preguntas()
{
    $content = '
    <main>
      <article>

        <h1>Preguntas frecuentes sobre reparación de rines</h1>

        <section>
          <h2>¿Cuánto cuesta reparar un rin?</h2>
          <p>
            El costo depende del daño, tipo de rin y servicio requerido.
            Contáctanos para una cotización personalizada.
          </p>
        </section>

        <section>
          <h2>¿Cuánto tarda el servicio?</h2>
          <p>
            La mayoría de los servicios se realizan el mismo día o en pocas horas,
            dependiendo del daño.
          </p>
        </section>

        <section>
          <h2>¿Es seguro reparar un rin?</h2>
          <p>
            Sí, siempre que se realice con equipo profesional y técnicos especializados,
            como en JEAX.
          </p>
        </section>

        <section>
          <h2>Servicios relacionados</h2>
          <p>
            <a href="/enderezado-rines">Enderezado</a> |
            <a href="/diamantado-rines-cdmx">Diamantado</a>
          </p>
        </section>

      </article>
    </main>
    ';

    return $this->renderApp([
        'title' => 'Preguntas Frecuentes | Reparación de Rines JEAX',
        'description' => 'Resuelve tus dudas sobre reparación de rines: costos, tiempos y seguridad del servicio.'
    ], $content, false);
}

public function terminos()
{
    $content = '
    <main>
      <article>

        <h1>Condiciones de servicio</h1>

        <section>
          <h2>Alcance del servicio</h2>
          <p>
            JEAX ofrece servicios de reparación de rines bajo diagnóstico previo.
            Los resultados dependen del estado del rin.
          </p>
        </section>

        <section>
          <h2>Responsabilidad</h2>
          <p>
            No nos hacemos responsables por daños previos no detectados durante la inspección inicial.
          </p>
        </section>

        <section>
          <h2>Garantía</h2>
          <p>
            Ofrecemos garantía en servicios realizados bajo condiciones normales de uso.
          </p>
        </section>

      </article>
    </main>
    ';

    return $this->renderApp([
        'title' => 'Condiciones de Servicio | JEAX',
        'description' => 'Consulta las condiciones y términos del servicio de reparación de rines en JEAX.'
    ], $content, false);
}

public function nosotros()
{
    $content = '
    <main>
      <article>

        <h1>Sobre JEAX - Especialistas en reparación de rines</h1>

        <section>
          <h2>¿Quiénes somos?</h2>
          <p>
            En JEAX somos especialistas en reparación de rines en Ciudad de México.
            Contamos con experiencia en enderezado, diamantado, pintura y restauración
            de rines de aluminio y acero.
          </p>
        </section>

        <section>
          <h2>Nuestra misión</h2>
          <p>
            Brindar soluciones profesionales que mejoren la seguridad y estética de tu vehículo,
            utilizando tecnología especializada y procesos de alta precisión.
          </p>
        </section>

        <section>
          <h2>Servicios principales</h2>
          <ul>
            <li><a href="/enderezado-rines">Enderezado de rines</a></li>
            <li><a href="/diamantado-rines-cdmx">Diamantado de rines</a></li>
            <li><a href="/categorias">Reparación integral de rines</a></li>
          </ul>
        </section>

      </article>
    </main>
    ';

    return $this->renderApp([
        'title' => 'Sobre JEAX | Reparación de Rines en CDMX',
        'description' => 'Conoce JEAX, especialistas en reparación de rines en CDMX. Experiencia, tecnología y servicio profesional.'
    ], $content, false);
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
    ], $content, false);
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
        <main>
        <article>

            <h1>Enderezado de rines en CDMX</h1>

            <section>
            <h2>¿Qué es el enderezado de rines?</h2>
            <p>
                El enderezado de rines es un proceso especializado que permite corregir deformaciones
                causadas por baches, golpes o desgaste. En Ciudad de México, donde las vialidades
                pueden dañar fácilmente los rines, este servicio es fundamental para mantener la
                seguridad del vehículo.
            </p>
            </section>

            <section>
            <h2>Señales de que necesitas enderezar tus rines</h2>
            <ul>
                <li>Vibración al conducir</li>
                <li>Desgaste irregular en llantas</li>
                <li>Golpes visibles en el rin</li>
                <li>Pérdida de estabilidad</li>
            </ul>
            </section>

            <section>
            <h2>Proceso profesional en JEAX</h2>
            <p>Realizamos un proceso completo:</p>
            <ul>
                <li>Diagnóstico estructural del rin</li>
                <li>Enderezado con maquinaria hidráulica</li>
                <li>Balanceo y verificación</li>
                <li>Pruebas de seguridad</li>
            </ul>
            </section>

            <section>
            <h2>Beneficios del enderezado de rines</h2>
            <ul>
                <li>Mayor seguridad al conducir</li>
                <li>Mejor desempeño del vehículo</li>
                <li>Ahorro en reemplazo de rines</li>
            </ul>
            </section>

            <section>
            <h2>Servicio en CDMX y zona metropolitana</h2>
            <p>
                Atendemos Ciudad de México, Ecatepec, Nezahualcóyotl y zonas cercanas.
            </p>
            </section>

            <section>
            <h2>Servicios relacionados</h2>
            <p>
                <a href="/diamantado-rines-cdmx">Diamantado de rines</a> |
                <a href="/categorias">Reparación de rines</a>
            </p>
            </section>

            <div style="margin-top:30px;">
            <a href="https://wa.me/525548488280"
                style="background:#C9A84C; color:#000; padding:12px 20px; border-radius:8px;">
                Cotizar por WhatsApp
            </a>
            </div>

        </article>
        </main>
        ';

        return $this->renderApp([
            'title' => 'Enderezado de Rines en CDMX | JEAX',
            'description' => 'Servicio profesional de enderezado de rines en CDMX. Corrige golpes, vibraciones y deformaciones con especialistas.'
        ], $content, false);
    }

   public function app()
{
    return $this->renderApp([], '', true);
}
}