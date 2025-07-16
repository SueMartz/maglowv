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

//Ruta publicas
Route::prefix('v1')->group(function(){

    //publiv
    //::public
    Route::get('/public/empresas/{quantity}',[FrontController::class,'empresas']);
    Route::post('/public/empresas/search',[FrontController::class,'search']);
    Route::get('/public/categorias/{slug}',[FrontController::class,'categoria']);
    Route::get('/public/categorias',[FrontController::class,'categorias']);
    Route::get('/public/slides', [FrontController::class, 'slides']);
    Route::get('/public/categorias-home', [FrontController::class, 'categoriasHome']);
    Route::get('/public/blog/posts', [FrontController::class, 'posts']);
    Route::get('/public/blog/paginas', [FrontController::class, 'paginas']);
    Route::get('/public/blog/post/{slug}', [FrontController::class, 'postBySlug']);
    Route::get('/public/blog/pagina/{slug}', [FrontController::class, 'paginaBySlug']);

    //public pagina web administrable
    /*
    //Route::get('/public/',function(){return vie('welcome');});
    Route::get('/public',[FrontController::class, 'index']);
    //Route::get('/public/empresas',[FrontController::class,'empresa']);
    Route::get('/public/{category:slug}',[FrontController::class,'category']);
    Route::get('/public/{category:slug}/{producto:slug}',[FrontController::class,'product']);
    Route::get('/public/blog',[FrontController::class,'blog']);
    Route::get('/public/{post:slug}',[FrontController::class,'post']);
    Route::get('/public/contacto',[FrontController::class,'contacto']);
    
    //::profile
    
    Auth::routes();
    Route::group(['prefix'=>'admin','middleware'=>'auth'],function(){
        Route::resource('/public/profile', ProfileController::class);
        Route::resource('/public/slide', ProfileController::class);
    });
    */
    //::auth
    Route::post('/auth/register',[AuthController::class,'register']);
    Route::post('/auth/login',[AuthController::class,'login']);
    //private
    Route::group(['middleware'=>'auth:sanctum'], function(){
        //:auth
        Route::post('/auth/logout',[AuthController::class,'logout']);
        //::rol cliente
        Route::apiResource('/client/empresa',EmpresaClient::class);
        //::rol admin
        Route::apiResource('/admin/user',UserController::class);
        Route::apiResource('/admin/categoria',CategoriaController::class);
        Route::apiResource('/admin/empresa',EmpresaController::class);
        Route::apiResource('/admin/slide', SlideController::class);
        Route::apiResource('/admin/post', PostController::class);
        Route::apiResource('/admin/pagina', PaginaController::class);


    });
    //::private
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request){
    return $request->user();
});

