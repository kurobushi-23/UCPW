import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Review, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BarChart3, Star, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    reviews: Review[];
    pagination: {
        current_page: number;
        per_page: number;
        last_page: number;
        total: number;
        from: number;
        to: number;
    };
}

interface ReviewStats {
    total_reviews: number;
    average_rating: number;
    reviews_by_service: {
        service: string;
        count: number;
        avg_rating: number;
    }[];
    recent_reviews: (Review & { user: User })[];
}

export default function ReviewsList({ reviews, pagination }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [stats, setStats] = useState<ReviewStats | null>(null);

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelola Review', href: '/dashboard/reviews' },
    ];

    // Calculate review statistics from the reviews data
    useEffect(() => {
        // Skip if no reviews
        if (!reviews.length) {
            setStats({
                total_reviews: 0,
                average_rating: 0,
                reviews_by_service: [],
                recent_reviews: [],
            });
            return;
        }

        // Calculate rating totals per service
        const serviceData = reviews.reduce(
            (acc, review) => {
                if (!acc[review.service]) {
                    acc[review.service] = { total: 0, count: 0, reviews: [] };
                }
                acc[review.service].total += review.rating;
                acc[review.service].count += 1;
                acc[review.service].reviews.push(review);
                return acc;
            },
            {} as Record<string, { total: number; count: number; reviews: Review[] }>,
        );

        // Calculate overall average rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        // Transform service data into the required format
        const reviewsByService = Object.entries(serviceData).map(([service, data]) => ({
            service,
            count: data.count,
            avg_rating: data.total / data.count,
        }));

        // Sort reviews by date and ensure user data is present for recent reviews
        const sortedReviews = [...reviews]
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .filter((review): review is Review & { user: User } => review.user !== undefined);

        setStats({
            total_reviews: reviews.length,
            average_rating: averageRating,
            reviews_by_service: reviewsByService,
            recent_reviews: sortedReviews.slice(0, 5),
        });
    }, [reviews]);

    const handleDelete = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus review ini?')) {
            return;
        }

        setIsDeleting(true);
        try {
            await router.delete(`/dashboard/reviews/${id}`, {
                preserveScroll: true,
                onSuccess: (page) => {
                    const flash = page.props.flash as { success?: boolean; error?: boolean; message?: string };
                    if (flash.success && flash.message) {
                        toast.success(flash.message);
                    } else if (flash.error && flash.message) {
                        toast.error(flash.message);
                    }
                },
                onError: (errors) => {
                    toast.error('Gagal menghapus review: ' + (errors.message || 'Terjadi kesalahan'));
                },
            });
        } catch (err) {
            console.error('Delete error:', err);
            toast.error('Terjadi kesalahan saat menghapus review');
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const serviceNameMap: Record<string, string> = {
        kontraktor: 'Kontraktor & Supplier',
        konstruksi: 'Konstruksi',
        'alat-berat': 'Alat Berat',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Review" />

            <div className="container mx-auto p-6">
                {/* Statistics Cards */}
                <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-500">
                                <Users className="h-8 w-8 text-blue-600 dark:text-blue-100" />
                            </div>
                            <div className="ml-4">
                                <CardTitle className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Reviews & Users</CardTitle>
                                <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{stats?.total_reviews || 0}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {Array.from(new Set(reviews.map((review) => review.user_id))).length} Pengguna
                                </p>
                            </div>
                        </CardContent>
                    </Card>{' '}
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-500">
                                <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-100" />
                            </div>
                            <div className="ml-4">
                                <CardTitle className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Rating Rata-rata</CardTitle>
                                <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                    {stats?.average_rating?.toFixed(1) || '0.0'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    {stats?.reviews_by_service?.map((serviceStats) => (
                        <Card key={serviceStats.service}>
                            <CardContent className="flex items-center p-6">
                                <div className="rounded-full bg-green-100 p-3 dark:bg-green-500">
                                    <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-100" />
                                </div>
                                <div className="ml-4">
                                    <CardTitle className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {serviceNameMap[serviceStats.service] || serviceStats.service}
                                    </CardTitle>
                                    <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{serviceStats.count} Review</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {serviceStats.avg_rating.toFixed(1)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Reviews Summary */}
                <div className="mb-8 grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ringkasan Review Terbaru</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats?.recent_reviews?.map((review) => (
                                    <div key={review.id} className="border-b pb-4 last:border-0">
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="font-semibold">{review.user?.name}</span>
                                                <span className="mx-2">•</span>
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 text-yellow-400" />
                                                    <span className="ml-1">{review.rating}</span>
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                                        </div>
                                        <p className="text-gray-600">{review.comment}</p>
                                        <div className="mt-2 text-sm text-gray-500">Service: {serviceNameMap[review.service] || review.service}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Statistik Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats?.reviews_by_service?.map((serviceStats) => (
                                    <div key={serviceStats.service} className="border-b pb-4 last:border-0">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">{serviceNameMap[serviceStats.service] || serviceStats.service}</span>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-400" />
                                                <span className="ml-1">{serviceStats.avg_rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>{serviceStats.count} Review</span>
                                            <span>{((serviceStats.count / (stats?.total_reviews || 1)) * 100).toFixed(1)}% dari total</span>
                                        </div>
                                        <div className="mt-2 h-2 rounded-full bg-gray-200">
                                            <div
                                                className="h-2 rounded-full bg-yellow-400"
                                                style={{
                                                    width: `${(serviceStats.avg_rating / 5) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Reviews Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">No.</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Layanan</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Review</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead className="w-24 text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reviews.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center">
                                                Tidak ada data review
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        reviews.map((review, index) => (
                                            <TableRow key={review.id}>
                                                <TableCell>{(pagination.current_page - 1) * pagination.per_page + index + 1}</TableCell>
                                                <TableCell>{review.user?.name}</TableCell>
                                                <TableCell>{serviceNameMap[review.service] || review.service}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Star className="mr-1 h-4 w-4 text-yellow-400" />
                                                        {review.rating}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                                                <TableCell>{formatDate(review.created_at)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        disabled={isDeleting}
                                                        onClick={() => handleDelete(review.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Info */}
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                            <div>
                                Menampilkan {pagination.from || 0} - {pagination.to || 0} dari {pagination.total} review
                            </div>
                            <div>
                                Halaman {pagination.current_page} dari {pagination.last_page}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
