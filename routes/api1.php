<?php

use App\Http\Controllers\PostsController;
use App\Http\Controllers\TagsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});







// Route::get('/test', function () {
//     return response()->json([
//         "data" => 'hello world'
//     ]);
// });
