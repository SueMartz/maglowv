<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ $seo['title'] ?? 'JEAX Store' }}</title>
    <meta name="description" content="{{ $seo['description'] ?? '' }}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{{ $seo['url'] ?? url()->current() }}">

    <!-- Open Graph -->
    <meta property="og:title" content="{{ $seo['title'] ?? 'JEAX Store' }}">
    <meta property="og:description" content="{{ $seo['description'] ?? '' }}">
    <meta property="og:url" content="{{ $seo['url'] ?? url()->current() }}">
    <meta property="og:type" content="website">

    <!-- Schema negocio local -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": "JEAX Store",
        "description": "Especialistas en reparación de rines",
        "url": "https://jeax.store",
        "serviceType": [
            "Enderezado y nivelado de rines",
            "Pintura automotriz en rines",
            "Soldadura en aluminio",
            "Diamantado en rines",
            "Pulido en rines",
            "Barrenado de rines",
            "Car Detailing",
            "Enderezado de rines de moto",
            "Pintura en rines de moto"
        ]
    }
    </script>

    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
    <div id="root"></div>
</body>
</html>