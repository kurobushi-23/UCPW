<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
Route::get('/services', [ServiceController::class, 'index'])->name('services');
Route::get('/news', [NewsController::class, 'index'])->name('news');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/testimonials', [HomeController::class, 'getTestimonials']);

// Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return inertia::render('dashboard');
    })->name('dashboard');

    // Testimonial routes

    Route::post('/testimonials', [HomeController::class, 'storeTestimonial'])->name('testimonials.store');
    Route::put('/testimonials/{testimonial}', [HomeController::class, 'updateTestimonial'])->name('testimonials.update');
    Route::delete('/testimonials/{testimonial}', [HomeController::class, 'deleteTestimonial'])->name('testimonials.delete');
    Route::put('/testimonials/{testimonial}/toggle-featured', [HomeController::class, 'toggleFeatured'])->name('testimonials.toggle-featured');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
