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
    background: #0D0D0D;
    color: #fff;
    font-family: system-ui;
  }

  .seo-mini {
    max-width: 600px;
    margin: 0 auto;
    padding: 2px 6px;
    font-size: 11px;
    color: #777;
    line-height: 1.1;
    text-align: center;
  }

  /* ELIMINA TODO ESPACIO INTERNO */
  .seo-mini * {
    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.1 !important;
  }

  .seo-mini h1 {
    font-size: 12px;
    font-weight: 500;
    color: #999;
  }

  .seo-mini h2 {
    font-size: 11px;
    font-weight: 400;
  }

  .seo-mini p {
    display: inline;
  }

  .seo-mini ul {
    list-style: none;
  }

  .seo-mini li {
    display: inline;
  }

  /* 🔥 CLAVE: quitar espacios del contenido */
  .seo-content {
    max-width: 600px;
    margin: 0 auto;
    padding: 0;
    font-size: 11px;
    line-height: 1.1;
    color: #777;
    text-align: center;
  }

  .seo-content * {
    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.1 !important;
  }

  #root {
    margin-top: 10px;
  }
</style>
  
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
  <div id="root"></div>

</body>
</html>