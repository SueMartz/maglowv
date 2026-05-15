<!DOCTYPE html>
<html lang="es">
<head>
    <meta name="google-site-verification" content="03PzXXkxVe5Y9bO1u_FSUhSkWyXaAmWFN4Cgp-56XTU" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ $seo['title'] ?? 'Maglowv Studio' }}</title>

    <meta name="description" content="{{ $seo['description'] ?? 'Maglowv Studio - Uñas, arte y bisutería artesanal hecha con creatividad y estilo.' }}">

    <meta name="keywords" content="uñas, nail art, cuadros decorativos, arte, bisutería artesanal, accesorios, Maglowv Studio">

    <meta name="robots" content="index, follow">

    <link rel="canonical" href="{{ $seo['url'] ?? url()->current() }}">

    <!-- Open Graph -->
    <meta property="og:title" content="{{ $seo['title'] ?? 'Maglowv Studio' }}">

    <meta property="og:description" content="{{ $seo['description'] ?? 'Diseños de uñas, cuadros decorativos y bisutería artesanal únicos.' }}">

    <meta property="og:url" content="{{ $seo['url'] ?? url()->current() }}">

    <meta property="og:type" content="website">

    <meta property="og:site_name" content="Maglowv Studio">

    <!-- Schema.org -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "name": "Maglowv Studio",
        "description": "Estudio creativo especializado en uñas, arte decorativo y bisutería artesanal.",
        "url": "https://maglowv.com",
        "serviceType": [
            "Diseño de uñas",
            "Nail Art",
            "Aplicación de uñas",
            "Cuadros decorativos pintados a mano",
            "Bisutería artesanal",
            "Accesorios personalizados"
        ]
    }
    </script>

    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
    <div id="root"></div>
</body>
</html>