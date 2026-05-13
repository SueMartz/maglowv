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
            'title'       => 'MaGlowV Studio | Uñas, Arte y Bisutería',
            'description' => 'Diseños de uñas, cuadros decorativos y bisutería artesanal hecha con creatividad y estilo.',
            'url'         => url()->current(),
        ], $seo);

        return view('welcome', [
            'seo'      => $seo,
            'content'  => $content,
            'useReact' => $useReact
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | HOME
    |--------------------------------------------------------------------------
    */

    public function home()
{
    $content = <<<HTML
    <main>
        <section class="hero">
            
            <span class="badge">Arte · Uñas · Bisutería</span>

            <h1>
                Creatividad hecha<br>
                <span class="highlight">para ti</span>
            </h1>

            <p class="description">
                Cuadros originales, diseños de uñas únicos y bisutería de calidad.
                Todo creado con dedicación por una sola artista.
            </p>

            <div class="actions">
                <a href="/coleccion" class="btn primary">Ver colección ↗</a>
                <a href="/artista" class="btn secondary">Sobre la artista</a>
            </div>

        </section>
    </main>
HTML;

    return $this->renderApp([
        'title'       => 'MaGlowV Studio | Uñas, Arte y Bisutería',
        'description' => 'Diseños de uñas, nail art, cuadros decorativos y bisutería personalizada.'
    ], $content);
}

    /*
    |--------------------------------------------------------------------------
    | SERVICIOS
    |--------------------------------------------------------------------------
    */

    public function categorias()
    {
        return $this->renderApp([
            'title'       => 'Servicios | MaGlowV Studio',
            'description' => 'Conoce nuestros servicios de uñas, nail art, arte decorativo y bisutería diseños originales.'
        ]);
    }

    public function categoria($slug)
    {
        $categoria = Categoria::where('slug', $slug)->firstOrFail();

        $content = "
        <main>
            <article>

                <h1>{$categoria->nombre}</h1>

                <section>
                    <h2>Servicios de {$categoria->nombre}</h2>

                    <p>{$categoria->descripcion}</p>

                    <p>
                        En MaGlowV Studio realizamos trabajos personalizados
                        y creativos para resaltar tu estilo.
                    </p>
                </section>

                <section>
                    <h2>¿Por qué elegirnos?</h2>

                    <ul>
                        <li>Diseños personalizados</li>
                        <li>Atención detallada</li>
                        <li>Trabajo profesional</li>
                        <li>Creatividad y estilo único</li>
                    </ul>
                </section>

            </article>
        </main>
        ";

        return $this->renderApp([
            'title'       => "{$categoria->nombre} | MaGlowV Studio",
            'description' => $categoria->descripcion
        ], $content);
    }

    /*
    |--------------------------------------------------------------------------
    | BLOG
    |--------------------------------------------------------------------------
    */

    public function blog()
    {
        return $this->renderApp([
            'title'       => 'Blog | MaGlowV Studio',
            'description' => 'Ideas, tendencias y consejos sobre uñas, arte y bisutería fina (diseños originales).'
        ]);
    }

    public function post($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();

        return $this->renderApp([
            'title'       => ($post->titulo ?? $slug) . ' | MaGlowV Blog',
            'description' => $post->extracto ?? $post->descripcion ?? '',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | PÁGINAS
    |--------------------------------------------------------------------------
    */

    public function pagina($slug)
    {
        $pagina = Pagina::where('slug', $slug)->firstOrFail();

        return $this->renderApp([
            'title'       => ($pagina->titulo ?? $slug) . ' | MaGlowV Studio',
            'description' => $pagina->descripcion ?? '',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CONTACTO
    |--------------------------------------------------------------------------
    */

    public function contacto()
    {
        $content = '
        <main>
            <article>

                <h1>Contacto | MaGlowV Studio</h1>

                <section>
                    <h2>Agenda tu cita</h2>

                    <p>
                        Contáctanos para diseños de uñas, cuadros decorativos
                        y bisutería artesanal personalizada.
                    </p>
                </section>

                <section>
                    <h2>WhatsApp</h2>

                    <p>
                        <a href="https://wa.me/5210000000000">
                            Enviar mensaje
                        </a>
                    </p>
                </section>

                <section>
                    <h2>Instagram</h2>

                    <p>@maglowv</p>
                </section>

            </article>
        </main>
        ';

        return $this->renderApp([
            'title'       => 'Contacto | MaGlowV Studio',
            'description' => 'Agenda tu cita para uñas, nail art y accesorios con diseños originales.'
        ], $content, false);
    }

    /*
    |--------------------------------------------------------------------------
    | PREGUNTAS FRECUENTES
    |--------------------------------------------------------------------------
    */

    public function preguntas()
    {
        $content = '
        <main>
            <article>

                <h1>Preguntas frecuentes | MaGlowV Studio</h1>

                <section>
                    <h2>¿Realizan diseños personalizados?</h2>

                    <p>
                        Sí, realizamos diseños únicos y personalizados.
                    </p>
                </section>

                <section>
                    <h2>¿Cómo puedo agendar una cita?</h2>

                    <p>
                        Puedes contactarnos por WhatsApp o Instagram.
                    </p>
                </section>

                <section>
                    <h2>¿También venden bisutería?</h2>

                    <p>
                        Sí, contamos con accesorios y piezas diseñadas con personalidad.
                    </p>
                </section>

            </article>
        </main>
        ';

        return $this->renderApp([
            'title'       => 'Preguntas frecuentes | MaGlowV Studio',
            'description' => 'Resuelve tus dudas sobre citas, diseños personalizados y productos artesanales.'
        ], $content, false);
    }

    /*
    |--------------------------------------------------------------------------
    | TÉRMINOS
    |--------------------------------------------------------------------------
    */

    public function terminos()
    {
        $content = '
        <main>
            <article>

                <h1>Términos y condiciones</h1>

                <section>
                    <h2>Servicios</h2>

                    <p>
                        Todos los trabajos se realizan bajo previa cotización
                        y disponibilidad.
                    </p>
                </section>

                <section>
                    <h2>Citas</h2>

                    <p>
                        Se recomienda agendar previamente para asegurar disponibilidad.
                    </p>
                </section>

                <section>
                    <h2>Diseños personalizados</h2>

                    <p>
                        Algunos diseños pueden variar dependiendo materiales y estilo solicitado.
                    </p>
                </section>

            </article>
        </main>
        ';

        return $this->renderApp([
            'title'       => 'Términos y condiciones | MaGlowV Studio',
            'description' => 'Consulta nuestros términos y condiciones de servicio.'
        ], $content, false);
    }

    /*
    |--------------------------------------------------------------------------
    | NOSOTROS
    |--------------------------------------------------------------------------
    */

    public function nosotros()
    {
        $content = '
        <main>
            <article>

                <h1>Sobre MaGlowV Studio</h1>

                <section>
                    <h2>¿Quiénes somos?</h2>

                    <p>
                        MaGlowV Studio es un espacio creativo dedicado al diseño
                        de uñas, arte decorativo y bisutería artesanal.
                    </p>
                </section>

                <section>
                    <h2>Nuestra misión</h2>

                    <p>
                        Crear diseños y piezas únicas que reflejen personalidad,
                        creatividad y estilo.
                    </p>
                </section>

            </article>
        </main>
        ';

        return $this->renderApp([
            'title'       => 'Sobre nosotros | MaGlowV Studio',
            'description' => 'Conoce más sobre MaGlowV Studio y nuestro trabajo creativo.'
        ], $content, false);
    }

    /*
    |--------------------------------------------------------------------------
    | SITEMAP
    |--------------------------------------------------------------------------
    */

    public function sitemap()
    {
        $categorias = Categoria::all();
        $posts = Post::all();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        $xml .= '<url>';
        $xml .= '<loc>' . url('/') . '</loc>';
        $xml .= '<lastmod>' . now()->toAtomString() . '</lastmod>';
        $xml .= '<priority>1.0</priority>';
        $xml .= '<changefreq>weekly</changefreq>';
        $xml .= '</url>';

        $paginasSeo = [
            '/unas-acrilicas',
            '/nail-art',
            '/bisuteria-artesanal',
            '/cuadros-decorativos',
            '/disenos-personalizados',
        ];

        foreach ($paginasSeo as $page) {
            $xml .= '<url>';
            $xml .= '<loc>' . url($page) . '</loc>';
            $xml .= '<lastmod>' . now()->toAtomString() . '</lastmod>';
            $xml .= '<priority>0.9</priority>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '</url>';
        }

        foreach ($categorias as $cat) {
            $xml .= '<url>';
            $xml .= '<loc>' . url('/categorias/' . $cat->slug) . '</loc>';
            $xml .= '<lastmod>' . now()->toAtomString() . '</lastmod>';
            $xml .= '<priority>0.7</priority>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '</url>';
        }

        foreach ($posts as $post) {
            $xml .= '<url>';
            $xml .= '<loc>' . url('/blog/post/' . $post->slug) . '</loc>';
            $xml .= '<lastmod>' . $post->updated_at->toAtomString() . '</lastmod>';
            $xml .= '<priority>0.6</priority>';
            $xml .= '<changefreq>monthly</changefreq>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }

    /*
    |--------------------------------------------------------------------------
    | APP
    |--------------------------------------------------------------------------
    */

    public function app()
    {
        return $this->renderApp([], '', true);
    }
}