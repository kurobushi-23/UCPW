// ...import yang diperlukan...
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Star } from 'lucide-react';

export default function ReviewSection({
    activeMenu,
    onSuccess,
    onShowLoginModal,
}: {
    activeMenu: string;
    onSuccess?: () => void;
    onShowLoginModal?: () => void;
}) {
    const [formData, setFormData] = useState({
        name: '',
        comment: '',
        rating: 5,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Render bintang rating seperti di halaman service
    const renderStars = (rating: number, setRating: (r: number) => void) => (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-6 w-6 ${star <= rating ? 'fill-current text-yellow-400' : 'text-gray-300'} cursor-pointer hover:text-yellow-400`}
                    onClick={() => setRating(star)}
                />
            ))}
        </div>
    );

    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const res = await fetch('/services/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify({
                    service: activeMenu,
                    name: formData.name,
                    comment: formData.comment,
                    rating: formData.rating,
                }),
            });

            if (res.status === 401) {
                // User belum login, tampilkan modal login
                if (onShowLoginModal) onShowLoginModal();
                setIsSubmitting(false);
                return;
            }

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                setSubmitError(
                    errorData.message ||
                    (errorData.errors ? JSON.stringify(errorData.errors) : `Error ${res.status}: ${res.statusText}`)
                );
                setIsSubmitting(false);
                return;
            }

            setFormData({ name: '', comment: '', rating: 5 });
            setIsSubmitting(false);
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setSubmitError(err.message || 'Terjadi kesalahan jaringan');
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="border-0 bg-white shadow-lg">
            <CardHeader>
                <CardTitle className="text-center text-xl text-gray-800">Tulis Ulasan & Rating</CardTitle>
                <p className="text-center text-sm text-gray-600">Bagikan pengalaman Anda menggunakan layanan kami</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Nama Anda"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mb-4 border-gray-300"
                        required
                    />
                    <Textarea
                        placeholder="Tulis ulasan Anda..."
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        className="min-h-[100px] border-gray-300"
                        rows={4}
                        required
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        {renderStars(formData.rating, (r) => setFormData({ ...formData, rating: r }))}
                    </div>
                    {submitError && (
                        <div className="rounded bg-red-100 px-3 py-2 text-sm text-red-700 border border-red-300">
                            {submitError}
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="w-full bg-amber-600 py-3 font-medium text-white hover:bg-amber-700"
                        disabled={!formData.name || !formData.comment || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Mengirim...
                            </>
                        ) : (
                            'Kirim Ulasan'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}