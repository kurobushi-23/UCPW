<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
Route::get('/services', [ServiceController::class, 'index'])->name('services');
Route::get('/news', [NewsController::class, 'index'])->name('news');
Route::get('/about', [AboutController::class, 'index'])->name('about');

// Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
