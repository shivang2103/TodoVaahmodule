<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::get('/todos', [TodoController::class, 'index']);
Route::get('/todos/{id}', [TodoController::class, 'show']);
Route::post('/todos', [TodoController::class, 'store']);
Route::put('/todos/{id}', [TodoController::class, 'update']);
Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
Route::patch('/todos/{id}/complete', [TodoController::class, 'markComplete']);
Route::patch('/todos/{id}/incomplete', [TodoController::class, 'markIncomplete']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
