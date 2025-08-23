<?php
use App\Http\Controllers\Api\ReviewController;

Route::post('/review', [ReviewController::class, 'store']);
Route::get('/review', [ReviewController::class, 'index']);