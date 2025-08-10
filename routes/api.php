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
use App\Http\Controllers\Api\Admin\ComentarioController; // Asegúrate que este controlador exista y esté correcto

Route::prefix('v1')->group(function () {
    // Rutas públicas
    Route::get('/public/empresas/{quantity}', [FrontController::class, 'empresas']);
    Route::post('/public/empresas/search', [FrontController::class, 'search']);
    Route::get('/public/categorias/{slug}', [FrontController::class, 'categoria']);
    Route::get('/public/categorias', [FrontController::class, 'categorias']);
    Route::get('/public/slides', [FrontController::class, 'slides']);
    Route::get('/public/categorias-home', [FrontController::class, 'categoriasHome']);

    Route::post('/public/comentarios', [FrontController::class, 'ComentariosAdd']); // para crear comentario público
    Route::get('/public/comentarios', [FrontController::class, 'comentariosAprobados']); // para listar solo aprobados

    Route::get('/public/blog/posts', [FrontController::class, 'posts']);
    Route::get('/public/blog/paginas', [FrontController::class, 'paginas']);
    Route::get('/public/blog/post/{slug}', [FrontController::class, 'postBySlug']);
    Route::get('/public/blog/pagina/{slug}', [FrontController::class, 'paginaBySlug']);

    // Autenticación
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Rutas protegidas con autenticación Sanctum
    Route::middleware('auth:sanctum')->group(function () {

        // Logout
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Rutas rol cliente
        Route::prefix('client')->as('client.')->group(function () {
            Route::apiResource('empresa', EmpresaClient::class);
        });

        // Rutas rol admin
        Route::prefix('admin')->as('admin.')->group(function () {
            Route::apiResource('user', UserController::class);
            Route::apiResource('categoria', CategoriaController::class);
            Route::apiResource('producto', ProductoController::class);
            Route::apiResource('empresa', EmpresaController::class);
            Route::apiResource('slide', SlideController::class);
            Route::apiResource('post', PostController::class);
            Route::apiResource('pagina', PaginaController::class);

            // Comentarios admin: aquí no usas apiResource porque tienes métodos específicos
            Route::get('comentarios/pendientes', [ComentarioController::class, 'pendientes']);
            Route::put('comentarios/{id}/aprobar', [ComentarioController::class, 'aprobar']);
            Route::delete('comentarios/{id}', [ComentarioController::class, 'destroy']);
        });
    });
});

// Ruta para verificar usuario autenticado
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
