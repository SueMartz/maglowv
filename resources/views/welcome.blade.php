<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="shortcut icon" href="/img/logo.png" type="image/png"/>

  <title>{{ $seo['title'] ?? 'JEAX Store' }}</title>
  <meta name="description" content="{{ $seo['description'] ?? '' }}">
  <link rel="canonical" href="{{ $seo['url'] ?? url()->current() }}">

  @vite(['resources/js/app.js'])
</head>

<body>
  
    <!-- CONTENIDO SEO PARA GOOGLE -->
    <div style="padding:20px; max-width:900px; margin:auto;">
        <h1>{{ $seo['title'] ?? 'JEAX Store' }}</h1>
        <p>{{ $seo['description'] ?? '' }}</p>

        @isset($content)
            {!! $content !!}
        @endisset
    </div>

    <!-- TU APP REACT -->
    <div id="root"></div>

</body>
</html>
