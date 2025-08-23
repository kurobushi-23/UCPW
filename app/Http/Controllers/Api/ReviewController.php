<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service' => 'required|string',
            'name' => 'required|string|max:100',
            'comment' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $review = Review::create($validated);

        return response()->json($review, 201);
    }

    public function index(Request $request)
    {
        $service = $request->query('service');
        $reviews = Review::where('service', $service)->orderByDesc('created_at')->get();
        return response()->json($reviews);
    }
}