<?php
namespace App\Http\Controllers;
use App\Models\Review;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Service/Index');
    }

    // Tambahkan method berikut untuk menyimpan review
    public function storeReview(Request $request)
    {
        try {
            $validated = $request->validate([
                'service' => 'required|string',
                'name' => 'required|string|max:100',
                'comment' => 'required|string',
                'rating' => 'required|integer|min:1|max:5',
            ]);

            $validated['user_id'] = auth()->id(); // otomatis isi user_id

            $review = Review::create($validated);

            return response()->json($review, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menyimpan review'], 500);
        }
    }
    
    public function getReviews(Request $request)
    {
        $service = $request->query('service');
        $reviews = \App\Models\Review::where('service', $service)
            ->orderByDesc('created_at')
            ->get();

        return response()->json($reviews);
    }
    
    public function dashboardReviews()
    {
        // Tampilkan semua review untuk dashboard
        return response()->json(\App\Models\Review::orderByDesc('created_at')->get());
    }

    public function dashboardStoreReview(Request $request)
    {
        $validated = $request->validate([
            'service' => 'required|string',
            'name' => 'required|string|max:100',
            'comment' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);
        $validated['user_id'] = auth()->id();
        $review = \App\Models\Review::create($validated);
        return response()->json($review, 201);
    }

    public function dashboardUpdateReview(Request $request, $id)
    {
        $review = \App\Models\Review::findOrFail($id);
        $validated = $request->validate([
            'service' => 'required|string',
            'name' => 'required|string|max:100',
            'comment' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);
        $review->update($validated);
        return response()->json($review);
    }

    public function dashboardDeleteReview($id)
    {
        $review = \App\Models\Review::findOrFail($id);
        $review->delete();
        return response()->json(['message' => 'Review dihapus']);
    }
}