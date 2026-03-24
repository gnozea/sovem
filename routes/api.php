<?php

use App\Http\Controllers\RequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public route — anonymous users submit service requests
Route::post('request', [RequestController::class, 'store']);

// Authenticated dashboard request routes
Route::middleware('auth:sanctum')->prefix('dashboard')->group(function () {
    Route::get('requests', [RequestController::class, 'index']);
    Route::post('request/release', [RequestController::class, 'release']);
    Route::get('request/{uuid}', [RequestController::class, 'show']);
    Route::post('request/{uuid}', [RequestController::class, 'accept']);
});
