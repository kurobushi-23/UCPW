<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use App\Http\Requests\TestimonialRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::latest()->get();

        return Inertia::render('Home/Index', [
            'testimonials' => $testimonials
        ]);
    }

    public function getTestimonials()
    {
        try {
            $testimonials = Testimonial::latest()->get();
            return response()->json($testimonials);
        } catch (\Exception $e) {
            \Log::error('Error fetching testimonials:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to fetch testimonials'], 500);
        }
    }

    public function storeTestimonial(TestimonialRequest $request)
    {
        try {
            $data = $request->validated();
            \Log::info('Testimonial data received:', $data);

            // Add user_id to the data
            $data['user_id'] = auth()->id();

            if ($request->hasFile('avatar')) {
                $path = $request->file('avatar')->store('testimonials', 'public');
                $data['avatar'] = $path;
            }

            $testimonial = Testimonial::create($data);
            \Log::info('Testimonial created successfully:', ['id' => $testimonial->id]);

            // Kembalikan response Inertia, bukan JSON
            return redirect()->back()->with('message', 'Testimonial berhasil ditambahkan');

        } catch (\Exception $e) {
            \Log::error('Error creating testimonial:', [
                'error' => $e->getMessage(),
                'data' => $request->all()
            ]);

            return redirect()->back()->withErrors(['message' => 'Gagal menambahkan testimonial']);
        }
    }

    public function updateTestimonial(TestimonialRequest $request, Testimonial $testimonial)
    {
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            // Hapus avatar lama jika ada
            if ($testimonial->avatar) {
                Storage::disk('public')->delete($testimonial->avatar);
            }
            $path = $request->file('avatar')->store('testimonials', 'public');
            $data['avatar'] = $path;
        }

        $testimonial->update($data);

        return redirect()->back()->with('message', 'Testimonial berhasil diperbarui');
    }

    public function deleteTestimonial(Testimonial $testimonial)
    {
        if ($testimonial->avatar) {
            Storage::disk('public')->delete($testimonial->avatar);
        }

        $testimonial->delete();

        return redirect()->back()->with('message', 'Testimonial berhasil dihapus');
    }

    public function toggleFeatured(Testimonial $testimonial)
    {
        $testimonial->update([
            'is_featured' => !$testimonial->is_featured
        ]);

        return redirect()->back()->with('message', 'Status featured testimonial berhasil diubah');
    }

    public function dashboardTestimonials()
    {
        return response()->json(\App\Models\Testimonial::with('user')->orderByDesc('id')->get());
    }

    public function dashboardStoreTestimonial(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
            'avatar' => 'nullable|string|max:255', // URL atau path file
            'is_featured' => 'boolean',
        ]);
        $testimonial = \App\Models\Testimonial::create($validated);
        return response()->json($testimonial, 201);
    }

    public function dashboardUpdateTestimonial(Request $request, $id)
    {
        $testimonial = \App\Models\Testimonial::findOrFail($id);
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
            'avatar' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
        ]);
        $testimonial->update($validated);
        return response()->json($testimonial);
    }

    public function dashboardDeleteTestimonial($id)
    {
        $testimonial = \App\Models\Testimonial::findOrFail($id);
        $testimonial->delete();
        return response()->json(['message' => 'Testimonial dihapus']);
    }

    public function dashboardGalleries()
    {
        return response()->json(\App\Models\Gallery::orderByDesc('id')->get());
    }

    public function dashboardStoreGallery(Request $request)
    {
        $validated = $request->validate([
            'caption' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string|max:255',
        ]);
        $gallery = \App\Models\Gallery::create($validated);
        return response()->json($gallery, 201);
    }

    public function dashboardUpdateGallery(Request $request, $id)
    {
        $gallery = \App\Models\Gallery::findOrFail($id);
        $validated = $request->validate([
            'caption' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string|max:255',
        ]);
        $gallery->update($validated);
        return response()->json($gallery);
    }

    public function dashboardDeleteGallery($id)
    {
        $gallery = \App\Models\Gallery::findOrFail($id);
        $gallery->delete();
        return response()->json(['message' => 'Galeri dihapus']);
    }
}
