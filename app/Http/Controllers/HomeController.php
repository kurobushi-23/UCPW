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
}
