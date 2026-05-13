<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- FAVICON -->
  <link rel="shortcut icon" href="/img/logo.png" type="image/png"/>

  <!-- SEO -->
  <title>{{ $seo['title'] ?? 'MaGlowV Studio' }}</title>

  <meta name="description" content="{{ $seo['description'] ?? 'Diseños de uñas, arte y bisutería artesanal.' }}">

  <meta name="keywords" content="uñas, nail art, bisutería artesanal, cuadros decorativos, arte, accesorios, MaGlowV Studio">

  <meta name="robots" content="index, follow">

  <link rel="canonical" href="{{ $seo['url'] ?? url()->current() }}">

  <!-- OPEN GRAPH -->
  <meta property="og:title" content="{{ $seo['title'] ?? 'MaGlowV Studio' }}">

  <meta property="og:description" content="{{ $seo['description'] ?? 'Diseños únicos de uñas, cuadros decorativos y bisutería artesanal.' }}">

  <meta property="og:url" content="{{ $seo['url'] ?? url()->current() }}">

  <meta property="og:type" content="website">

  <meta property="og:image" content="{{ asset('/img/social-cover.jpg') }}">

  <!-- TWITTER -->
  <meta name="twitter:card" content="summary_large_image">

  @vite(['resources/js/app.js'])

<style>
  body {
    margin: 0;
    background:
      radial-gradient(circle at top, #ffd6e7 0%, #f8d7ff 35%, #ffffff 100%);
    color: #2d1b2e;
    font-family: system-ui;
  }

  /* TITULOS */
  h1, h2 {
    text-shadow: 0 0 10px rgba(255, 182, 193, 0.35);
  }

  /* MINI SEO */
  .seo-mini {
    max-width: 700px;
    margin: 20px auto;
    padding: 10px 20px;
    text-align: center;
  }

  .seo-mini h1 {
    font-size: 16px;
    font-weight: 700;
    color: #d63384;
    margin-bottom: 10px;
  }

  .seo-mini p {
    font-size: 14px;
    color: #6d4c6d;
  }

  /* CONTENIDO */
  .seo-content {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
    font-size: 16px;
    line-height: 1.7;
    color: #4b2d4f;
  }

  .seo-content h1 {
    font-size: 34px;
    color: #d63384;
    margin-bottom: 20px;
  }

  .seo-content h2 {
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 10px;
    color: #b5179e;
  }

  .seo-content p {
    margin-bottom: 15px;
  }

  .seo-content ul {
    margin-left: 20px;
    margin-bottom: 15px;
  }

  .seo-content li {
    margin-bottom: 8px;
  }

  /* LINKS */
  .seo-content a {
    color: #d63384;
    text-decoration: none;
    transition: 0.3s ease;
    font-weight: 600;
  }

  .seo-content a:hover {
    color: #ff4da6;
    text-shadow: 0 0 10px rgba(214, 51, 132, 0.4);
  }

  /* BOTÓN WHATSAPP */
  .seo-content a[href*="wa.me"] {
    display: inline-block;
    margin-top: 15px;
    background: linear-gradient(45deg, #ff80bf, #ffc2e2);
    color: #fff;
    padding: 12px 22px;
    border-radius: 12px;
    font-weight: bold;
    box-shadow: 0 0 15px rgba(255, 128, 191, 0.4);
  }

  .seo-content a[href*="wa.me"]:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 128, 191, 0.7);
  }

  /* TARJETAS */
  .seo-content section {
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(255, 182, 193, 0.5);
    padding: 24px;
    border-radius: 18px;
    margin-bottom: 24px;
    backdrop-filter: blur(6px);
    box-shadow: 0 10px 25px rgba(255, 182, 193, 0.15);
  }

  /* REACT */
  #root {
    margin-top: 20px;
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {

    .seo-content {
      padding: 15px;
    }

    .seo-content h1 {
      font-size: 28px;
    }

    .seo-content h2 {
      font-size: 21px;
    }

  }
</style>

@php
$schema = [
    "@context" => "https://schema.org",
    "@type" => "BeautySalon",
    "name" => "MaGlowV Studio",
    "url" => $seo['url'] ?? url()->current(),
    "description" => "Diseños de uñas, cuadros decorativos y bisutería artesanal.",
    "serviceType" => [
        "Diseño de uñas",
        "Nail Art",
        "Bisutería artesanal",
        "Cuadros decorativos",
        "Arte personalizado"
    ]
];
@endphp

<!-- SCHEMA -->
<script type="application/ld+json">
{!! json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}
</script>

<!-- FAQ -->
@if(isset($seo['faq']))
<script type="application/ld+json">
{!! json_encode($seo['faq'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}
</script>
@endif

</head>

<body>

  <!-- MINI SEO -->
  <section class="seo-mini">
      <h1>{{ $seo['title'] ?? 'MaGlowV Studio' }}</h1>

      <p>
        {{ $seo['description'] ?? 'Diseños de uñas, arte y bisutería artesanal.' }}
      </p>
  </section>

  <!-- CONTENIDO SEO -->
  <section class="seo-content">
      @isset($content)
          {!! $content !!}
      @endisset
  </section>

  <!-- REACT -->
  @if(!isset($useReact) || $useReact)
    <div id="root"></div>
  @endif

</body>
</html>