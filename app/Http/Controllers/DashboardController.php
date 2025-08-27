<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Review;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get reviews statistics
        $reviewStats = Review::select([
            DB::raw('COUNT(*) as total'),
            DB::raw('AVG(rating) as average_rating'),
            DB::raw('COUNT(DISTINCT user_id) as total_users'),
            // Recent change calculation (last 30 days compared to previous 30 days)
            DB::raw('(
                (COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) -
                COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END)) /
                NULLIF(COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END), 0) * 100
            ) as recent_change')
        ])->first();

        // Get testimonials statistics
        $testimonialStats = Testimonial::select([
            DB::raw('COUNT(*) as total'),
            DB::raw('SUM(CASE WHEN is_featured = 1 THEN 1 ELSE 0 END) as featured'),
            DB::raw('COUNT(DISTINCT user_id) as total_users'),
            // Recent change calculation
            DB::raw('(
                (COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) -
                COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END)) /
                NULLIF(COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END), 0) * 100
            ) as recent_change')
        ])->first();

        // Get service-specific statistics
        $serviceStats = [
            'konstruksi' => [
                'galleries' => Gallery::where('category', 'konstruksi')->count(),
                'reviews' => Review::where('service', 'konstruksi')->count(),
                'users' => Review::where('service', 'konstruksi')
                    ->distinct('user_id')
                    ->count('user_id')
            ],
            'kontraktor' => [
                'galleries' => Gallery::where('category', 'kontraktor')->count(),
                'reviews' => Review::where('service', 'kontraktor')->count(),
                'users' => Review::where('service', 'kontraktor')
                    ->distinct('user_id')
                    ->count('user_id')
            ],
            'alat-berat' => [
                'galleries' => Gallery::where('category', 'alat-berat')->count(),
                'reviews' => Review::where('service', 'alat-berat')->count(),
                'users' => Review::where('service', 'alat-berat')
                    ->distinct('user_id')
                    ->count('user_id')
            ]
        ];

        // Get galleries statistics
        $galleryStats = [
            'total' => Gallery::count(),
            'categories' => [
                'konstruksi' => $serviceStats['konstruksi']['galleries'],
                'kontraktor' => $serviceStats['kontraktor']['galleries'],
                'alat-berat' => $serviceStats['alat-berat']['galleries']
            ],
            'recent_change' => Gallery::selectRaw('
                (
                    (COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) -
                    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END)) /
                    NULLIF(COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END), 0) * 100
                ) as recent_change
            ')->value('recent_change') ?? 0
        ];

        return Inertia::render('dashboard', [
            'summary' => [
                'reviews' => [
                    'total' => $reviewStats->total ?? 0,
                    'average_rating' => round($reviewStats->average_rating ?? 0, 1),
                    'total_users' => $reviewStats->total_users ?? 0,
                    'recent_change' => round($reviewStats->recent_change ?? 0)
                ],
                'testimonials' => [
                    'total' => $testimonialStats->total ?? 0,
                    'featured' => $testimonialStats->featured ?? 0,
                    'total_users' => $testimonialStats->total_users ?? 0,
                    'recent_change' => round($testimonialStats->recent_change ?? 0)
                ],
                'galleries' => [
                    'total' => $galleryStats['total'],
                    'categories' => $galleryStats['categories'],
                    'recent_change' => round($galleryStats['recent_change'])
                ],
                'services' => [
                    'konstruksi' => [
                        'reviews' => $serviceStats['konstruksi']['reviews'],
                        'users' => $serviceStats['konstruksi']['users'],
                        'galleries' => $serviceStats['konstruksi']['galleries']
                    ],
                    'kontraktor' => [
                        'reviews' => $serviceStats['kontraktor']['reviews'],
                        'users' => $serviceStats['kontraktor']['users'],
                        'galleries' => $serviceStats['kontraktor']['galleries']
                    ],
                    'alat-berat' => [
                        'reviews' => $serviceStats['alat-berat']['reviews'],
                        'users' => $serviceStats['alat-berat']['users'],
                        'galleries' => $serviceStats['alat-berat']['galleries']
                    ]
                ]
            ]
        ]);
    }
}
