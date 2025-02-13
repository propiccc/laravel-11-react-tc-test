<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CommentsController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register'])->middleware('isLogin');
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/check', [AuthController::class, 'checkUser'])->middleware('auth:sanctum');
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::post('/tags/select', [TagsController::class, 'GetSelect']);
    Route::get('/public/posts', [PostsController::class, 'PublicPost']);
    Route::get('/posts/{uuid}/detail', [PostsController::class, 'PostsDetail']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/comment/{uuid}/add', [CommentsController::class, 'addCommand']);

        Route::prefix('tags')->group(function () {
            Route::get('/', [TagsController::class, 'Get']);
            Route::post('/store', [TagsController::class, 'Store']);
            Route::post('{uuid}/show', [TagsController::class, 'Show']);
            Route::put('{uuid}/update', [TagsController::class, 'Update']);
            Route::delete('{uuid}/delete', [TagsController::class, 'Destroy']);
        });

        Route::prefix('posts')->group(function () {
            Route::get('/', [PostsController::class, 'Get']);
            Route::post('/store', [PostsController::class, 'Store']);
            Route::post('{uuid}/show', [PostsController::class, 'Show']);
            Route::put('{uuid}/update', [PostsController::class, 'Update']);
            Route::delete('{uuid}/delete', [PostsController::class, 'Destroy']);
        });
    });
});
