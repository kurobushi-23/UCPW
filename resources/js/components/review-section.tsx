/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { Edit, Loader2, Star, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

type Review = {
    id: number;
    name: string;
    comment: string;
    rating: number;
    service: string;
    avatar?: string;
    created_at?: string;
    user_id?: number;
    user?: {
        id: string;
        name: string;
        email: string;
    };
};

type ReviewSectionProps = {
    activeMenu: string;
    onShowLoginModal: () => void;
    onSuccess?: () => void;
};

export default function ReviewSection({ activeMenu, onShowLoginModal, onSuccess }: ReviewSectionProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editingReview, setEditingReview] = useState<number | null>(null);

    // Gunakan activeMenu langsung sebagai service karena sudah sesuai dengan routes
    // 'kontraktor', 'konstruksi', 'alat-berat' sudah valid
    const { data, setData, post, put, processing, reset } = useForm({
        name: '',
        comment: '',
        rating: 5,
        service: activeMenu, // Gunakan activeMenu langsung
    });

    const { props } = usePage();
    const user = props.user as { id?: number; name?: string; email?: string } | null;

    // Map menu ke service yang valid
    const menuToService = {
        'Kontraktor & Supplier': 'kontraktor',
        Konstruksi: 'konstruksi',
        'Alat Berat': 'alat-berat',
    } as const;

    // Load reviews ketika activeMenu berubah
    React.useEffect(() => {
        loadReviews();
        // Map activeMenu ke service yang valid
        const service = menuToService[activeMenu as keyof typeof menuToService] || activeMenu;
        setData('service', service);
        console.log('Setting service to:', service); // Debugging
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeMenu]);

    const loadReviews = async () => {
        setIsLoading(true);
        try {
            // Gunakan service yang sesuai dengan format backend
            const response = await fetch(`/services/reviews?service=${activeMenu}`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data);
            } else if (response.status === 404) {
                // Service tidak ditemukan, coba format lain
                console.warn(`Service ${activeMenu} not found, trying alternative formats`);
            }
        } catch (error) {
            console.error('Error loading reviews:', error);
            toast.error('Gagal memuat reviews');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.name.trim() || !data.comment.trim()) {
            toast.error('Nama dan komentar harus diisi');
            return;
        }

        if (data.comment.length < 10) {
            toast.error('Komentar minimal 10 karakter');
            return;
        }

        // Validasi service - pastikan activeMenu valid
        const validServices = ['kontraktor', 'konstruksi', 'alat-berat'];
        if (!validServices.includes(activeMenu)) {
            toast.error('Service tidak valid');
            return;
        }

        // Gunakan route.post dari Inertia
        // Log data yang akan dikirim
        console.log('Sending review data:', {
            name: data.name,
            comment: data.comment,
            rating: data.rating,
            service: data.service,
        });

        post('/services/reviews', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Review berhasil ditambahkan');
                reset();
                loadReviews();
                if (onSuccess) onSuccess();
            },
            onError: (errors: any) => {
                // Log error lengkap untuk debugging
                console.error('Review submission error:', errors);

                if (errors.auth || errors.message?.includes('authenticated')) {
                    onShowLoginModal();
                    return;
                }

                if (typeof errors === 'object') {
                    // Handle validation errors
                    Object.entries(errors).forEach(([key, message]) => {
                        console.log(`Validation error for ${key}:`, message);
                        toast.error(Array.isArray(message) ? message[0] : message);
                    });
                } else {
                    toast.error(errors.message || 'Gagal menambahkan review');
                }
            },
        });
    };

    const handleUpdate = (reviewId: number) => {
        if (!data.name.trim() || !data.comment.trim()) {
            toast.error('Nama dan komentar harus diisi');
            return;
        }

        put(`/services/reviews/${reviewId}`, {
            onSuccess: () => {
                toast.success('Review berhasil diperbarui');
                setEditingReview(null);
                reset();
                loadReviews();
            },
            onError: (errors: any) => {
                if (errors.auth) {
                    onShowLoginModal();
                } else {
                    toast.error(errors.message || 'Gagal memperbarui review');
                }
            },
        });
    };

    const handleDelete = async (reviewId: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus review ini?')) {
            return;
        }

        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

            const response = await fetch(`/services/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.message || 'Gagal menghapus review');
                return;
            }

            setReviews((prev) => prev.filter((review) => review.id !== reviewId));
            toast.success('Review berhasil dihapus');
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Terjadi kesalahan jaringan.');
        }
    };

    const startEdit = (review: Review) => {
        setEditingReview(review.id);
        setData({
            name: review.name,
            comment: review.comment,
            rating: review.rating,
            service: activeMenu,
        });
    };

    const cancelEdit = () => {
        setEditingReview(null);
        reset();
    };

    const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-5 w-5 ${
                            star <= rating ? 'fill-current text-yellow-400' : 'text-gray-300'
                        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
                        onClick={() => interactive && onRatingChange && onRatingChange(star)}
                    />
                ))}
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const currentUserId = user?.id || null;

    return (
        <div className="space-y-6">
            {/* Review Form */}
            <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-lg text-gray-800">{editingReview ? 'Edit Review' : 'Tulis Review Anda'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={
                            editingReview
                                ? (e) => {
                                      e.preventDefault();
                                      handleUpdate(editingReview);
                                  }
                                : handleSubmit
                        }
                        className="space-y-4"
                    >
                        <Input
                            placeholder="Nama Anda"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="border-gray-300"
                            disabled={processing}
                            required
                        />

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Rating</label>
                            {renderStars(data.rating, true, (rating) => setData('rating', rating))}
                        </div>

                        <Textarea
                            placeholder="Tulis pengalaman Anda dengan layanan ini..."
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                            className="min-h-[100px] border-gray-300"
                            disabled={processing}
                            required
                        />

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="flex-1 bg-amber-600 hover:bg-amber-700"
                                disabled={!data.name || !data.comment || processing}
                            >
                                {processing ? (
                                    <div className="flex items-center space-x-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>{editingReview ? 'Memperbarui...' : 'Mengirim Review...'}</span>
                                    </div>
                                ) : editingReview ? (
                                    'Update Review'
                                ) : (
                                    'Kirim Review'
                                )}
                            </Button>

                            {editingReview && (
                                <Button type="button" variant="outline" onClick={cancelEdit} disabled={processing}>
                                    Batal
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center text-gray-500">Memuat reviews...</div>
                ) : reviews.length === 0 ? (
                    <div className="text-center text-gray-500">Belum ada review untuk layanan ini.</div>
                ) : (
                    reviews.slice(0, 6).map((review) => (
                        <Card key={review.id} className="shadow-md">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-1 items-start gap-4">
                                        <img
                                            src={
                                                review.avatar
                                                    ? `/storage/${review.avatar}`
                                                    : `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face`
                                            }
                                            alt={review.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center justify-between">
                                                <h5 className="font-semibold text-gray-800">{review.name}</h5>
                                                <span className="text-sm text-gray-500">{review.created_at && formatDate(review.created_at)}</span>
                                            </div>
                                            <div className="mb-2">{renderStars(review.rating)}</div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    </div>

                                    {review.user_id === currentUserId && (
                                        <div className="ml-2 flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => startEdit(review)} disabled={editingReview !== null}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(review.id)}
                                                disabled={editingReview !== null}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
