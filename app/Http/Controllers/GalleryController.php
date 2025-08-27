<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::orderByDesc('date')->get();
        return Inertia::render('galleries/index', [
            'galleries' => $galleries,
        ]);
    }

    public function galleries(Request $request)
    {
        $perPage = 50; // 50 data per page
        $galleries = Gallery::orderByDesc('date')
                    ->paginate($perPage);

        return Inertia::render('dashboard/galleries/index', [
            'galleries' => $galleries->items(),
            'pagination' => [
                'current_page' => $galleries->currentPage(),
                'last_page' => $galleries->lastPage(),
                'per_page' => $galleries->perPage(),
                'total' => $galleries->total(),
                'from' => $galleries->firstItem(),
                'to' => $galleries->lastItem(),
            ]
        ]);
    }

    public function showDetail($id)
    {
        $gallery = Gallery::findOrFail($id);
        $allGalleries = Gallery::orderByDesc('date')->get();

        return Inertia::render('dashboard/galleries/detail', [
            'gallery' => $gallery,         // Fixed: match component props
            'allGalleries' => $allGalleries // Fixed: match component props
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/galleries/create');
    }

    public function edit($id)
    {
        $galleries = Gallery::findOrFail($id);
        return Inertia::render('dashboard/galleries/edit', [
            'galleries' => $galleries
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'caption' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'category' => 'required|string|max:100',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('galleries', 'public');
            $validated['image'] = 'storage/' . $path; // simpan path ke DB
        }

        $galleries = Gallery::create($validated);

        return redirect()->route('dashboard.galleries.index')->with('success', 'Gallery berhasil ditambahkan');
    }

    public function show($id)
    {
        $galleries = Gallery::findOrFail($id);

        // Increment view count
        $galleries->increment('views');

        // Check if user liked the galleries (if authenticated)
        $isLiked = false;
        if (auth()->check()) {
            $isLiked = $galleries->likes()->where('user_id', auth()->id())->exists();
        }

        return Inertia::render('galleries/show', [
            'galleries' => $galleries,
        ]);
    }

    public function update(Request $request, $id)
    {
        $galleries = Gallery::findOrFail($id);

        $validated = $request->validate([
            'caption' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'category' => 'required|string|max:100',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('galleries', 'public');
            $validated['image'] = 'storage/' . $path;
        }

        $galleries->update($validated);

        return redirect()->route('dashboard.galleries.index')->with('success', 'Gallery berhasil diperbarui');
    }


    public function destroy($id)
    {
        try {
            $gallery = Gallery::findOrFail($id);

            // Hapus file gambar dari storage jika ada
            if ($gallery->image && str_starts_with($gallery->image, 'storage/')) {
                $path = str_replace('storage/', '', $gallery->image);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            // Hapus record dari database
            $gallery->delete();

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Gallery berhasil dihapus'
                ], 200);
            }

            return redirect()->route('dashboard.galleries.index')->with('success', 'Gallery berhasil dihapus');

        } catch (\Exception $e) {
            \Log::error('Error deleting gallery: ' . $e->getMessage());

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal menghapus gallery: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->route('dashboard.galleries.index')->with('error', 'Gagal menghapus gallery');
        }
    }
}
