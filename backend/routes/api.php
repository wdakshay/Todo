<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoListController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [UserController::class, 'register']);

Route::post('/login', [UserController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/loggeduser', [UserController::class, 'loggedInUser']);
    Route::post('/change-password', [UserController::class, 'changePassword']);
    Route::get('/todolist/{id}', [TodoListController::class, 'index']);
    Route::post('/todolist-store', [TodoListController::class, 'store']);
    Route::delete('/todolist-delete/{id}', [TodoListController::class, 'destroy']);
    Route::put('/todolist-update/{id}', [TodoListController::class, 'update']);
    Route::get('/recently-deleted/{id}', [TodoListController::class, 'recentlyDeleted']);
    Route::put('/undo-delete/{id}', [TodoListController::class, 'undoDelete']);
    Route::delete('/permanently-delete/{id}', [TodoListController::class, 'permanentlyDelete']);
});
