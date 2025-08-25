<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\News;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::orderByDesc('date')->get();
        return Inertia::render('News/Index', [
            'news' => $news,
        ]);
    }

    public function apiIndex()
    {
        $news = News::orderByDesc('date')->get();
        return response()->json($news);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'likes' => 'nullable|integer',
            'views' => 'nullable|integer',
            'date' => 'required|date',
            'author' => 'required|string|max:100',
            'category' => 'nullable|string|max:100',
            'subcategory' => 'nullable|string|max:100',
            'readTime' => 'nullable|integer',
        ]);
        $news = News::create($validated);
        return response()->json($news, 201);
    }

    public function show($id)
    {
        $news = News::findOrFail($id);
        $isLiked = $news->likes()->where('user_id', auth()->id())->exists();
        return response()->json([
            ...$news->toArray(),
            'isLiked' => $isLiked,
        ]);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'likes' => 'nullable|integer',
            'views' => 'nullable|integer',
            'date' => 'required|date',
            'author' => 'required|string|max:100',
            'category' => 'nullable|string|max:100',
            'subcategory' => 'nullable|string|max:100',
            'readTime' => 'nullable|integer',
        ]);
        $news->update($validated);
        return response()->json($news);
    }

    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        return response()->json(['message' => 'Berita dihapus']);
    }

    public function toggleLike($id)
    {
        $news = News::findOrFail($id);
        $user = auth()->user();

        if ($news->likes()->where('user_id', $user->id)->exists()) {
            // Unlike
            $news->likes()->detach($user->id);
            $news->decrement('likes');
            $liked = false;
        } else {
            // Like
            $news->likes()->attach($user->id);
            $news->increment('likes');
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likeCount' => $news->likes()->count(),
        ]);
    }

    public function incrementView($id)
    {
        $news = News::findOrFail($id);
        $news->increment('views');
        return response()->json(['success' => true, 'views' => $news->views]);
    }
    
}
