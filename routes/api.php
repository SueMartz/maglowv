<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FrontController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\CategoriaController;
use App\Http\Controllers\Api\Admin\EmpresaController;
use App\Http\Controllers\Api\Client\EmpresaController as EmpresaClient;
use App\Http\Controllers\Api\Admin\SlideController;
use App\Http\Controllers\Api\Admin\PostController;
use App\Http\Controllers\Api\Admin\PaginaController;
use App\Http\Controllers\Api\Admin\ProductoController;

Route::prefix('v1')->group(function () {

    //::public
    Route::get('/public/empresas/{quantity}', [FrontController::class, 'empresas']);
    Route::post('/public/empresas/search', [FrontController::class, 'search']);
    Route::get('/public/categorias/{slug}', [FrontController::class, 'categoria']);
    Route::get('/public/categorias', [FrontController::class, 'categorias']);
    Route::get('/public/slides', [FrontController::class, 'slides']);
    Route::get('/public/categorias-home', [FrontController::class, 'categoriasHome']);
    Route::get('/public/blog/posts', [FrontController::class, 'posts']);
    Route::get('/public/blog/paginas', [FrontController::class, 'paginas']);
    Route::get('/public/blog/post/{slug}', [FrontController::class, 'postBySlug']);
    Route::get('/public/blog/pagina/{slug}', [FrontController::class, 'paginaBySlug']);

    //::auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    //::private (requiere autenticación)
    Route::middleware('auth:sanctum')->group(function () {

        //::auth logout
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        //::rol cliente
        Route::prefix('client')->as('client.')->group(function () {
            Route::apiResource('empresa', EmpresaClient::class);
        });

        //::rol admin
        Route::prefix('admin')->as('admin.')->group(function () {
            Route::apiResource('user', UserController::class);
            Route::apiResource('categoria', CategoriaController::class);
            Route::apiResource('producto', ProductoController::class);
            Route::apiResource('empresa', EmpresaController::class);
            Route::apiResource('slide', SlideController::class);
            Route::apiResource('post', PostController::class);
            Route::apiResource('pagina', PaginaController::class);
        });
    });
});

// Ruta de verificación de usuario autenticado
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
