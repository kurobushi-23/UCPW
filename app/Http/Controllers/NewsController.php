<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\News;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
      public function index(Request $request)
    {
        // Ambil parameter filter dari request
        $category = $request->get('category');
        $subcategory = $request->get('subcategory');

        $query = News::query();

        // Filter berdasarkan kategori jika ada
        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        // Filter berdasarkan subkategori jika ada
        if ($subcategory && $subcategory !== 'all') {
            $query->where('subcategory', $subcategory);
        }

        $news = $query->orderByDesc('date')->get();

        // Ambil semua kategori unik dari database
        $categories = News::select('category')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->distinct()
            ->pluck('category')
            ->toArray();

        // Ambil semua subkategori unik dari database
        $subcategories = News::select('subcategory')
            ->whereNotNull('subcategory')
            ->where('subcategory', '!=', '')
            ->distinct()
            ->pluck('subcategory')
            ->toArray();

        // Jika request AJAX, return JSON
        if ($request->expectsJson()) {
            return response()->json([
                'news' => $news,
                'categories' => $categories,
                'subcategories' => $subcategories,
                'filters' => [
                    'category' => $category,
                    'subcategory' => $subcategory
                ]
            ]);
        }

        return Inertia::render('news/index', [
            'news' => $news,
            'categories' => $categories,
            'subcategories' => $subcategories,
            'filters' => [
                'category' => $category,
                'subcategory' => $subcategory
            ]
        ]);
    }

    public function news(Request $request)
    {
        $perPage = 50; // 50 data per page
        $news = News::orderByDesc('date')
                    ->paginate($perPage);

        return Inertia::render('dashboard/news/index', [
            'news' => $news->items(),
            'user' => auth()->user(),
            'pagination' => [
                'current_page' => $news->currentPage(),
                'last_page' => $news->lastPage(),
                'per_page' => $news->perPage(),
                'total' => $news->total(),
                'from' => $news->firstItem(),
                'to' => $news->lastItem(),
            ]
        ]);
    }

    public function showDetail($id)
    {
        $news = News::findOrFail($id);
        $allNews = News::orderByDesc('date')->get();

        return Inertia::render('dashboard/news/detail', [
            'news' => $news,
            'allNews' => $allNews
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'likes' => 'nullable|integer',
            'views' => 'nullable|integer',
            'date' => 'required|date',
            'author' => 'required|string|max:100',
            'category' => 'nullable|string|max:100',
            'subcategory' => 'nullable|string|max:100',
            'readTime' => 'nullable|integer',
        ]);

        // simpan file jika ada
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            $validated['image'] = 'storage/' . $path; // simpan path ke DB
        }

        $validated['likes'] = $validated['likes'] ?? 0;
        $validated['views'] = $validated['views'] ?? 0;

        $news = News::create($validated);

        return redirect()->route('dashboard.news.index')->with('success', 'Berita berhasil ditambahkan');
    }

    public function show($id)
    {
        $news = News::findOrFail($id);

        // Increment view count
        $news->increment('views');

        // Check if user liked the news (if authenticated)
        $isLiked = false;
        if (auth()->check()) {
            $isLiked = $news->likes()->where('user_id', auth()->id())->exists();
        }

        // Ambil related news berdasarkan kategori
        $relatedNews = News::where('category', $news->category)
            ->where('id', '!=', $news->id)
            ->orderByDesc('date')
            ->limit(4)
            ->get();

        if (request()->expectsJson()) {
            return response()->json([
                ...$news->toArray(),
                'isLiked' => $isLiked,
                'relatedNews' => $relatedNews
            ]);
        }

        return Inertia::render('news/show', [
            'news' => $news,
            'isLiked' => $isLiked,
            'relatedNews' => $relatedNews
        ]);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'likes' => 'nullable|integer',
            'views' => 'nullable|integer',
            'date' => 'required|date',
            'author' => 'required|string|max:100',
            'category' => 'nullable|string|max:100',
            'subcategory' => 'nullable|string|max:100',
            'readTime' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            $validated['image'] = 'storage/' . $path;
        }

        $news->update($validated);

        return redirect()->route('dashboard.news.index')->with('success', 'Berita berhasil diperbarui');
    }


    public function destroy($id)
    {
        try {
            $news = News::findOrFail($id);

            // Hapus relasi likes terlebih dahulu jika ada
            $news->likes()->detach();

            // Hapus file gambar dari storage jika ada
            if ($news->image && str_starts_with($news->image, 'storage/')) {
                $path = str_replace('storage/', '', $news->image);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            // Hapus record dari database
            $news->delete();

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Berita berhasil dihapus'
                ], 200);
            }

            return redirect()->route('dashboard.news.index')->with('success', 'Berita berhasil dihapus');

        } catch (\Exception $e) {
            \Log::error('Error deleting news: ' . $e->getMessage());

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal menghapus berita: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->route('dashboard.news.index')->with('error', 'Gagal menghapus berita');
        }
    }

    public function toggleLike($id)
    {
        $news = News::findOrFail($id);
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $existingLike = $news->likes()->where('user_id', $user->id)->first();

        if ($existingLike) {
            $news->likes()->detach($user->id);
            $news->decrement('likes');
            $liked = false;
        } else {
            $news->likes()->attach($user->id);
            $news->increment('likes');
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likeCount' => $news->fresh()->likes,
        ]);
    }

    public function incrementView($id)
    {
        $news = News::findOrFail($id);
        $news->increment('views');
        return response()->json(['success' => true, 'views' => $news->views]);
    }

    public function create()
    {
        return Inertia::render('dashboard/news/create');
    }

    public function edit($id)
    {
        $news = News::findOrFail($id);
        return Inertia::render('dashboard/news/edit', [
            'news' => $news
        ]);
    }
}
