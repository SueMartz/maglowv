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

// Catch-all para todo lo demás (admin, cliente, login, etc.)
Route::get('/{any}', [SeoController::class, 'app'])->where('any', '.*');