// testi-section.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Testimonial } from '@/types/testimonial';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TestimonialSection({
    testimonials: initialTestimonials,
    onShowLoginModal,
}: {
    testimonials: Testimonial[];
    onShowLoginModal?: () => void;
}) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        position: '',
        company: '',
        message: '',
    });

    // Stats
    const totalTestimonials = testimonials.length;
    const featuredTestimonials = testimonials.filter((t) => t.is_featured).length;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.company || !formData.message || !formData.position) {
            toast.error('Semua field harus diisi');
            return;
        }

        setIsSubmitting(true);

        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

            const response = await fetch('/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest', // Important for Laravel to detect AJAX
                },
                body: JSON.stringify(formData),
            });

            // Handle authentication error
            if (response.status === 401) {
                if (onShowLoginModal) {
                    onShowLoginModal();
                } else {
                    toast.error('Anda harus login terlebih dahulu');
                }
                return;
            }

            // Handle other errors
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.message || 'Gagal menambahkan testimonial');
                console.error('Server response:', response.status, errorData);
                return;
            }

            // Success - get the new testimonial
            const newTestimonial: Testimonial = await response.json();

            // Update state immediately (optimistic update)
            setTestimonials((prevTestimonials) => [newTestimonial, ...prevTestimonials]);

            // Reset form
            setFormData({
                company: '',
                position: '',
                message: '',
            });

            // Show success message
            toast.success('Testimonial berhasil ditambahkan');
        } catch (error) {
            console.error('Network error submitting testimonial:', error);
            toast.error('Terjadi kesalahan jaringan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <section id="testimonial" className="mx-auto w-full max-w-7xl px-4 py-16 font-montserrat">
            <div className="mb-10 text-center">
                <span className="flex items-center justify-center gap-2 font-semibold text-amber-600">
                    Testimonial
                    <ArrowUpRight className="h-4 w-4 text-amber-600" />
                </span>
                <p className="mx-auto mt-5 max-w-4xl text-2xl font-semibold md:text-4xl">
                    Temukan pengalaman nyata dari pelanggan kami tentang layanan <span className="font-semibold">PT. PMP Karya Mandiri</span>.
                    Testimoni ini membantu Anda membuat keputusan terbaik.
                </p>
            </div>

            <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Summary */}
                <div className="lg:col-span-1">
                    <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
                        <CardHeader className="pb-4 text-center">
                            <CardTitle className="text-lg text-gray-800">Testimoni Klien</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-amber-600">{totalTestimonials}</div>
                                <p className="mt-2 text-sm text-gray-600">Total Testimonial</p>
                            </div>

                            <div className="border-t border-amber-200 pt-4">
                                <div className="grid grid-cols-1 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-amber-600">{featuredTestimonials}</div>
                                        <div className="text-xs text-gray-600">Featured Reviews</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-amber-100 p-4">
                                <p className="text-sm text-amber-800">
                                    Testimoni dari klien kami yang telah merasakan layanan profesional dari PT. PMP Karya Mandiri
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Testimonials */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {testimonials.length === 0 ? (
                            <div className="col-span-3 py-8 text-center text-gray-500">Belum ada testimonial</div>
                        ) : (
                            testimonials.map((t) => (
                                <Card key={t.id} className="shadow-md transition-shadow hover:shadow-lg">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2 text-gray-800">
                                                    <Avatar>
                                                        <AvatarFallback className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                                                            {t.user?.name ? t.user.name.charAt(0).toUpperCase() : 'U'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {t.user?.name || 'Anonymous'}
                                                </CardTitle>

                                                <p className="text-sm font-medium text-gray-600">{t.position}</p>
                                                <p className="text-sm text-gray-500">{t.company}</p>
                                            </div>
                                            {t.is_featured && (
                                                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm leading-relaxed text-gray-700">{t.message}</p>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="mx-auto max-w-2xl">
                <Card className="border-0 bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-xl text-gray-800">Tulis Testimoni Anda</CardTitle>
                        <p className="text-center text-sm text-gray-600">Bagikan pengalaman Anda bekerja dengan kami</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Jabatan"
                                value={formData.position}
                                onChange={(e) => handleInputChange('position', e.target.value)}
                                className="mb-4 border-gray-300"
                                disabled={isSubmitting}
                                required
                            />
                            <Input
                                placeholder="Perusahaan / Instansi"
                                value={formData.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                                className="border-gray-300"
                                disabled={isSubmitting}
                                required
                            />
                            <Textarea
                                placeholder="Tulis pengalaman Anda bekerja dengan PT. PMP Karya Mandiri..."
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                className="min-h-[100px] border-gray-300"
                                rows={4}
                                disabled={isSubmitting}
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full bg-amber-600 py-3 font-medium text-white hover:bg-amber-700 disabled:opacity-50"
                                disabled={!formData.position || !formData.company || !formData.message || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Mengirim...
                                    </>
                                ) : (
                                    'Kirim Testimoni'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
