<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Home
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/profile', [ProfileController::class, 'index'])->name('profile');

// News
Route::prefix('news')->name('news.')->group(function () {
    Route::get('/', [NewsController::class, 'index'])->name('index');
    Route::get('/{id}', [NewsController::class, 'show'])->name('show');
    Route::post('/{id}/view', [NewsController::class, 'incrementView'])->name('view');

    // Protected news routes
    Route::middleware('auth')->group(function () {
        Route::post('/{id}/like', [NewsController::class, 'toggleLike'])->name('like');
    });
});

// Galleries
Route::prefix('galleries')->name('galleries.')->group(function () {
    Route::get('/', [GalleryController::class, 'index'])->name('index');
    Route::get('/{id}', [GalleryController::class, 'show'])->name('show');
});

// Services
Route::prefix('services')->name('services.')->group(function () {
    Route::get('/', [ServiceController::class, 'index'])->name('index');
    Route::get('/reviews', [ServiceController::class, 'getReviews'])->name('reviews.get');

    // Protected service routes
    Route::middleware('auth')->group(function () {
        Route::post('/reviews', [ServiceController::class, 'storeReview'])->name('reviews.store');
        Route::put('/reviews/{review}', [ServiceController::class, 'updateReview'])->name('reviews.update');
        Route::delete('/reviews/{review}', [ServiceController::class, 'deleteReview'])->name('reviews.delete');
    });
});

/*
|--------------------------------------------------------------------------
| Protected Routes (Authentication Required)
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    // Testimonials
    Route::prefix('testimonials')->name('testimonials.')->group(function () {
        Route::post('/', [HomeController::class, 'storeTestimonial'])->name('store');
        Route::put('/{testimonial}', [HomeController::class, 'updateTestimonial'])->name('update');
        Route::delete('/{testimonial}', [HomeController::class, 'deleteTestimonial'])->name('delete');
        Route::patch('/{testimonial}/toggle-featured', [HomeController::class, 'toggleFeatured'])->name('toggle-featured');
    });
});

/*
|--------------------------------------------------------------------------
| Admin Dashboard Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'admin'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    // News Management
    Route::prefix('news')->name('news.')->group(function () {
        Route::get('/', [NewsController::class, 'news'])->name('index');
        Route::post('/', [NewsController::class, 'store'])->name('store');
        Route::get('/{id}', [NewsController::class, 'edit'])->name('edit');
        Route::get('/{id}/detail', [NewsController::class, 'showDetail'])->name('detail');
        Route::put('/{id}', [NewsController::class, 'update'])->name('update');
        Route::delete('/{id}', [NewsController::class, 'destroy'])->name('destroy');
    });

    // Gallery Management
    Route::prefix('galleries')->name('galleries.')->group(function () {
        Route::get('/', [GalleryController::class, 'galleries'])->name('index');
        Route::post('/', [GalleryController::class, 'store'])->name('store');
        Route::get('/{id}', [GalleryController::class, 'edit'])->name('edit');
        Route::get('/{id}/detail', [GalleryController::class, 'showDetail'])->name('detail');
        Route::put('/{id}', [GalleryController::class, 'update'])->name('update');
        Route::delete('/{id}', [GalleryController::class, 'destroy'])->name('destroy');
    });

    // Reviews Management
    Route::prefix('reviews')->name('reviews.')->group(function () {
        Route::get('/', [ServiceController::class, 'dashboardReviews'])->name('index');
        Route::get('/stats', [ServiceController::class, 'getReviewStats'])->name('stats');
        Route::delete('/{id}', [ServiceController::class, 'dashboardDeleteReview'])->name('destroy');
    });

    // Testimonials Management
    Route::prefix('testimonials')->name('testimonials.')->group(function () {
        Route::get('/', [HomeController::class, 'dashboardTestimonials'])->name('index');
        Route::delete('/{id}', [HomeController::class, 'dashboardDeleteTestimonial'])->name('destroy');
        Route::patch('/{id}/toggle-featured', [HomeController::class, 'toggleFeatured'])->name('toggle-featured');
    });
});

/*
|--------------------------------------------------------------------------
| Include Additional Route Files
|--------------------------------------------------------------------------
*/

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
