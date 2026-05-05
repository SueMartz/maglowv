<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="shortcut icon" href="/img/logo.png" type="image/png"/>

  <title>{{ $seo['title'] ?? 'JEAX Store' }}</title>
  <meta name="description" content="{{ $seo['description'] ?? '' }}">
  <link rel="canonical" href="{{ $seo['url'] ?? url()->current() }}">

  @vite(['resources/js/app.js'])

 <style>
  body {
    margin: 0;
    background: radial-gradient(circle at top, #1a1a1a, #0D0D0D);
    color: #fff;
    font-family: system-ui;
  }

  /* 🔥 EFECTO GENERAL DE BRILLO */
  h1, h2 {
    text-shadow: 0 0 8px rgba(201,168,76,0.6);
  }

  /* MINI SEO (arriba) */
  .seo-mini {
    max-width: 700px;
    margin: 10px auto;
    padding: 5px 10px;
    font-size: 12px;
    color: #aaa;
    text-align: center;
  }

  .seo-mini h1 {
    font-size: 14px;
    font-weight: 600;
    color: #C9A84C;
    text-shadow: 0 0 10px rgba(201,168,76,0.8);
  }

  .seo-mini p {
    font-size: 12px;
    color: #ccc;
  }

  /* 🔥 CONTENIDO PRINCIPAL */
  .seo-content {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    font-size: 15px;
    line-height: 1.6;
    color: #eee;
    text-align: left;
  }

  .seo-content h1 {
    font-size: 30px;
    color: #C9A84C;
    margin-bottom: 20px;
  }

  .seo-content h2 {
    font-size: 22px;
    margin-top: 30px;
    margin-bottom: 10px;
    color: #f8f408;
  }

  .seo-content p {
    margin-bottom: 15px;
  }

  .seo-content ul {
    margin-left: 20px;
    margin-bottom: 15px;
  }

  .seo-content li {
    margin-bottom: 6px;
  }

  /* 🔥 LINKS CON EFECTO PREMIUM */
  .seo-content a {
    color: #C9A84C;
    text-decoration: none;
    position: relative;
    transition: all 0.3s ease;
  }

  .seo-content a:hover {
    color: #fff;
    text-shadow: 0 0 10px #C9A84C;
  }

  /* 🔥 BOTÓN WHATSAPP */
  .seo-content a[href*="wa.me"] {
    display: inline-block;
    margin-top: 15px;
    background: linear-gradient(45deg, #C9A84C, #f8f408);
    color: #000;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: bold;
    box-shadow: 0 0 10px rgba(201,168,76,0.6);
  }

  .seo-content a[href*="wa.me"]:hover {
    box-shadow: 0 0 20px rgba(201,168,76,1);
    transform: scale(1.05);
  }

  /* 🔥 TARJETAS SUAVES */
  .seo-content section {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(201,168,76,0.2);
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }

  /* REACT */
  #root {
    margin-top: 20px;
  }
</style>


@php
$schema = [
    "@context" => "https://schema.org",
    "@type" => "AutoRepair",
    "name" => "JEAX",
    "url" => $seo['url'] ?? url()->current(),
    "areaServed" => "Ciudad de México"
];
@endphp

<script type="application/ld+json">
{!! json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}
</script>

 <!-- FAQ DINÁMICO -->
  @if(isset($seo['faq']))
  <script type="application/ld+json">
  {!! json_encode($seo['faq'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}
  </script>
  @endif

</head>

<body>

  <!-- HERO SEO -->
  <section class="seo-mini">
      <h1>{{ $seo['title'] ?? 'JEAX Store' }}</h1>
      <p>{{ $seo['description'] ?? '' }}</p>
  </section>

  <!-- CONTENIDO SEO -->
  <section class="seo-content">
      @isset($content)
          {!! $content !!}
      @endisset
  </section>
  <!-- APP REACT -->
  @if(!isset($useReact) || $useReact)
    <div id="root"></div>
@endif

</body>
</html>