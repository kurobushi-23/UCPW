<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Http\Requests\ReviewRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('service/index');
    }

    // Get reviews by service
    public function getReviews(Request $request)
    {
        $service = $request->query('service');

        if (!$service) {
            return response()->json([]);
        }

        $reviews = Review::with('user')
            ->byService($service)
            ->latest()
            ->get();

        return response()->json($reviews);
    }

    // Store new review
    public function storeReview(ReviewRequest $request)
    {
        try {
            \Log::info('Received review data:', $request->all());

            $data = $request->validated();
            $data['user_id'] = auth()->id();

            // Map service names if needed
            $serviceMap = [
                'Kontraktor & Supplier' => 'kontraktor',
                'Konstruksi' => 'konstruksi',
                'Alat Berat' => 'alat-berat'
            ];

            if (isset($data['service']) && array_key_exists($data['service'], $serviceMap)) {
                $data['service'] = $serviceMap[$data['service']];
            }

            \Log::info('Processed review data:', $data);

            // Handle avatar upload if provided
            if ($request->hasFile('avatar')) {
                $path = $request->file('avatar')->store('reviews', 'public');
                $data['avatar'] = $path;
            }

            $review = Review::create($data);
            $review->load('user');

            if ($request->expectsJson()) {
                return response()->json($review, 201);
            }

            return redirect()->back()->with('message', 'Review berhasil ditambahkan');

        } catch (\Exception $e) {
            \Log::error('Error creating review:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->all()
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Gagal menambahkan review',
                    'error' => $e->getMessage()
                ], 500);
            }

            return redirect()->back()->withErrors(['message' => 'Gagal menambahkan review']);
        }
    }

    // Update review
    public function updateReview(ReviewRequest $request, Review $review)
    {
        // Check if user owns the review or is admin
        if ($review->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return redirect()->back()->withErrors(['message' => 'Anda tidak memiliki akses untuk mengubah review ini']);
        }

        try {
            $data = $request->validated();

            if ($request->hasFile('avatar')) {
                // Delete old avatar if exists
                if ($review->avatar) {
                    Storage::disk('public')->delete($review->avatar);
                }
                $path = $request->file('avatar')->store('reviews', 'public');
                $data['avatar'] = $path;
            }

            $review->update($data);
            $review->load('user');

            if ($request->expectsJson()) {
                return response()->json($review);
            }

            return redirect()->back()->with('message', 'Review berhasil diperbarui');

        } catch (\Exception $e) {
            \Log::error('Error updating review:', [
                'error' => $e->getMessage(),
                'review_id' => $review->id,
                'trace' => $e->getTraceAsString()
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Gagal memperbarui review',
                    'error' => $e->getMessage()
                ], 500);
            }

            return redirect()->back()->withErrors(['message' => 'Gagal memperbarui review']);
        }
    }

    // Delete review
    public function deleteReview(Review $review)
    {
        // Check if user owns the review or is admin
        if ($review->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            if (request()->expectsJson()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return redirect()->back()->withErrors(['message' => 'Anda tidak memiliki akses untuk menghapus review ini']);
        }

        try {
            if ($review->avatar) {
                Storage::disk('public')->delete($review->avatar);
            }

            $reviewId = $review->id;
            $review->delete();

            if (request()->expectsJson()) {
                return response()->json([
                    'message' => 'Review berhasil dihapus',
                    'deleted_id' => $reviewId
                ]);
            }

            return redirect()->back()->with('message', 'Review berhasil dihapus');

        } catch (\Exception $e) {
            \Log::error('Error deleting review:', [
                'error' => $e->getMessage(),
                'review_id' => $review->id,
                'trace' => $e->getTraceAsString()
            ]);

            if (request()->expectsJson()) {
                return response()->json([
                    'message' => 'Gagal menghapus review',
                    'error' => $e->getMessage()
                ], 500);
            }

            return redirect()->back()->withErrors(['message' => 'Gagal menghapus review']);
        }
    }

    // Dashboard - Get all reviews with pagination
    public function dashboardReviews(Request $request)
    {
        $perPage = 15;
        $reviews = Review::with('user')
            ->latest()
            ->paginate($perPage);

        return Inertia::render('dashboard/reviews/index', [
            'reviews' => $reviews->items(),
            'pagination' => [
                'current_page' => $reviews->currentPage(),
                'last_page' => $reviews->lastPage(),
                'per_page' => $reviews->perPage(),
                'total' => $reviews->total(),
                'from' => $reviews->firstItem(),
                'to' => $reviews->lastItem(),
            ]
        ]);
    }

    // Dashboard - Delete review
    public function dashboardDeleteReview($id)
    {
        try {
            $review = Review::findOrFail($id);

            if ($review->avatar) {
                Storage::disk('public')->delete($review->avatar);
            }

            $review->delete();

            return back()->with([
                'success' => true,
                'message' => 'Review berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            \Log::error('Error deleting review from dashboard:', [
                'error' => $e->getMessage(),
                'review_id' => $id
            ]);

            return back()->with([
                'error' => true,
                'message' => 'Gagal menghapus review: ' . $e->getMessage()
            ]);
        }
    }

    // Dashboard - Get review statistics
    public function getReviewStats()
    {
        $stats = [
            'total_reviews' => Review::count(),
            'average_rating' => Review::avg('rating'),
            'reviews_by_service' => Review::selectRaw('service, COUNT(*) as count, AVG(rating) as avg_rating')
                ->groupBy('service')
                ->get(),
            'recent_reviews' => Review::with('user')->latest()->limit(5)->get()
        ];

        return response()->json($stats);
    }
}
