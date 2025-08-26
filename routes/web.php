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

Route::get('/services/reviews', [ServiceController::class, 'getReviews']);

// Protected routes
Route::middleware(['admin'])->prefix('dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        // CRUD berita
        Route::get('/news', [NewsController::class, 'apiIndex']);
        Route::post('/news', [NewsController::class, 'store']);
        Route::get('/news/{id}', [NewsController::class, 'show']);
        Route::put('/news/{id}', [NewsController::class, 'update']);
        Route::delete('/news/{id}', [NewsController::class, 'destroy']);

        // CRUD review (hanya admin)
        Route::get('/reviews', [ServiceController::class, 'dashboardReviews']);
        Route::post('/reviews', [ServiceController::class, 'dashboardStoreReview']);
        Route::put('/reviews/{id}', [ServiceController::class, 'dashboardUpdateReview']);
        Route::delete('/reviews/{id}', [ServiceController::class, 'dashboardDeleteReview']);

        // CRUD Testimoni
        Route::get('/CrudTestimonials', [HomeController::class, 'dashboardTestimonials']);
        //entah kenapa route nya nyampur
        //Route::post('/CrudTestimonials', [HomeController::class, 'dashboardStoreTestimonial']);
        Route::put('/CrudTestimonials/{id}', [HomeController::class, 'dashboardUpdateTestimonial']);
        Route::delete('/CrudTestimonials/{id}', [HomeController::class, 'dashboardDeleteTestimonial']);

        //CRUD Gallery
        Route::get('/galleries', [HomeController::class, 'dashboardGalleries']);
        Route::post('/galleries', [HomeController::class, 'dashboardStoreGallery']);
        Route::put('/galleries/{id}', [HomeController::class, 'dashboardUpdateGallery']);
        Route::delete('/galleries/{id}', [HomeController::class, 'dashboardDeleteGallery']);
        });

Route::middleware(['auth', 'verified'])->group(function () {
    // Testimonial routes
    Route::post('/testimonials', [HomeController::class, 'storeTestimonial'])->name('testimonials.store');
    Route::put('/testimonials/{testimonial}', [HomeController::class, 'updateTestimonial'])->name('testimonials.update');
    Route::delete('/testimonials/{testimonial}', [HomeController::class, 'deleteTestimonial'])->name('testimonials.delete');
    Route::put('/testimonials/{testimonial}/toggle-featured', [HomeController::class, 'toggleFeatured'])->name('testimonials.toggle-featured');

    Route::post('/services/review', [ServiceController::class, 'storeReview'])
    ->middleware('auth')
    ->name('services.review.store');

    //like
    Route::middleware('auth')->post('/news/{id}/like', [NewsController::class, 'toggleLike']);

});

   // Increment view count for a news article
    Route::post('/news/{id}/increment-view', [NewsController::class, 'incrementView']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

