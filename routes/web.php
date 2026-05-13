<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SeoController;

Route::get('/', [SeoController::class, 'home']);
Route::get('/categorias', [SeoController::class, 'categorias']);
Route::get('/categorias/{slug}', [SeoController::class, 'categoria']);
Route::get('/blog', [SeoController::class, 'blog']);
Route::get('/blog/post/{slug}', [SeoController::class, 'post']);
Route::get('/pagina/{slug}', [SeoController::class, 'pagina']);
// routes/web.php
Route::get('/sitemap.xml', [SeoController::class, 'sitemap']);

Route::get('/nosotros', [SeoController::class, 'nosotros']);
Route::get('/preguntas', [SeoController::class, 'preguntas']);
Route::get('/terminos', [SeoController::class, 'terminos']);
Route::get('/contacto', [SeoController::class, 'contacto']);

// Catch-all para todo lo demás (admin, cliente, login, etc.)
Route::get('/{any}', [SeoController::class, 'app'])->where('any', '.*');