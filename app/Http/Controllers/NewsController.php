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
        return response()->json($news);
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
}
