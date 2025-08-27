<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use App\Models\Gallery;
use App\Models\News;
use App\Http\Requests\TestimonialRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::with('user')
            ->latest()
            ->limit(6)
            ->get();

        $news = News::latest()
            ->limit(8)
            ->get();

        $user = auth()->user() ? [
            'role' => auth()->user()->role,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email
        ] : null;

        return Inertia::render('home/index', [
            'testimonials' => $testimonials,
            'news' => $news,
            'user' => $user,
        ]);
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

            // Load user relationship for proper response
            $testimonial->load('user');

            // Return consistent JSON response for AJAX requests
            if ($request->expectsJson()) {
                return response()->json($testimonial, 201);
            }

            return redirect()->back()->with('message', 'Testimonial berhasil ditambahkan');

        } catch (\Exception $e) {
            \Log::error('Error creating testimonial:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->all()
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Gagal menambahkan testimonial',
                    'error' => $e->getMessage()
                ], 500);
            }

            return redirect()->back()->withErrors(['message' => 'Gagal menambahkan testimonial']);
        }
    }

    public function updateTestimonial(TestimonialRequest $request, Testimonial $testimonial)
    {
        // Check if user owns the testimonial or is admin
        if ($testimonial->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return redirect()->back()->withErrors(['message' => 'Anda tidak memiliki akses untuk mengubah testimonial ini']);
        }

        try {
            $data = $request->validated();

            if ($request->hasFile('avatar')) {
                // Delete old avatar if exists
                if ($testimonial->avatar) {
                    Storage::disk('public')->delete($testimonial->avatar);
                }
                $path = $request->file('avatar')->store('testimonials', 'public');
                $data['avatar'] = $path;
            }

            $testimonial->update($data);
            $testimonial->load('user');

            if ($request->expectsJson()) {
                return response()->json($testimonial);
            }

            return redirect()->back()->with('message', 'Testimonial berhasil diperbarui');

        } catch (\Exception $e) {
            \Log::error('Error updating testimonial:', [
                'error' => $e->getMessage(),
                'testimonial_id' => $testimonial->id,
                'trace' => $e->getTraceAsString()
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Gagal memperbarui testimonial',
                    'error' => $e->getMessage()
                ], 500);
            }

            return redirect()->back()->withErrors(['message' => 'Gagal memperbarui testimonial']);
        }
    }

    public function deleteTestimonial(Testimonial $testimonial)
    {
        // Check if user owns the testimonial or is admin
        if ($testimonial->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            if (request()->expectsJson()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return redirect()->back()->withErrors(['message' => 'Anda tidak memiliki akses untuk menghapus testimonial ini']);
        }

        try {
            if ($testimonial->avatar) {
                Storage::disk('public')->delete($testimonial->avatar);
            }

            $testimonialId = $testimonial->id;
            $testimonial->delete();

            if (request()->expectsJson()) {
                return response()->json([
                    'message' => 'Testimonial berhasil dihapus',
                    'deleted_id' => $testimonialId
                ]);
            }

            return redirect()->back()->with('message', 'Testimonial berhasil dihapus');

        } catch (\Exception $e) {
            \Log::error('Error deleting testimonial:', [
                'error' => $e->getMessage(),
                'testimonial_id' => $testimonial->id,
                'trace' => $e->getTraceAsString()
            ]);

            if (request()->expectsJson()) {
                return response()->json([
                    'message' => 'Gagal menghapus testimonial',
                    'error' => $e->getMessage()
                ], 500);
            }

            return redirect()->back()->withErrors(['message' => 'Gagal menghapus testimonial']);
        }
    }

    public function toggleFeatured(Testimonial $testimonial)
    {
        try {
            $testimonial->update([
                'is_featured' => !$testimonial->is_featured
            ]);

            $testimonial->load('user');

            if (request()->expectsJson()) {
                return response()->json([
                    'message' => 'Status featured testimonial berhasil diubah',
                    'testimonial' => $testimonial
                ]);
            }

            return redirect()->back()->with('message', 'Status featured testimonial berhasil diubah');

        } catch (\Exception $e) {
            \Log::error('Error toggling featured status:', [
                'error' => $e->getMessage(),
                'testimonial_id' => $testimonial->id
            ]);

            if (request()->expectsJson()) {
                return response()->json([
                    'message' => 'Gagal mengubah status featured',
                    'error' => $e->getMessage()
                ], 500);
            }

            return redirect()->back()->withErrors(['message' => 'Gagal mengubah status featured']);
        }
    }

    public function dashboardTestimonials()
    {
        $testimonials = Testimonial::with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('dashboard/testimonials/index', [
            'testimonials' => $testimonials
        ]);
    }

    public function dashboardDeleteTestimonial($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        // Untuk Inertia request, redirect ke halaman yang sama dengan flash message
        if (request()->inertia()) {
            return redirect()->back()->with([
                'success' => 'Testimonial berhasil dihapus',
                'deleted_id' => $id
            ]);
        }

        // Untuk API request
        if (request()->expectsJson()) {
            return response()->json([
                'message' => 'Testimonial berhasil dihapus',
                'deleted_id' => $id
            ]);
        }

        // Traditional redirect
        return redirect()->route('dashboard.testimonials.index')
                    ->with('success', 'Testimonial berhasil dihapus');
    }

    // public function dashboardDeleteTestimonial($id)
    // {
    //     try {
    //         $testimonial = Testimonial::findOrFail($id);

    //         if ($testimonial->avatar) {
    //             Storage::disk('public')->delete($testimonial->avatar);
    //         }

    //         $testimonial->delete();

    //         return response()->json([
    //             'message' => 'Testimonial berhasil dihapus',
    //             'deleted_id' => $id
    //         ]);

    //     } catch (\Exception $e) {
    //         \Log::error('Error deleting testimonial from dashboard:', [
    //             'error' => $e->getMessage(),
    //             'testimonial_id' => $id
    //         ]);

    //         return response()->json([
    //             'message' => 'Gagal menghapus testimonial',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }
}
