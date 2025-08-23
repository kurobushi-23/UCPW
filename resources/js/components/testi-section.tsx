import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Testimonial } from '@/types/testimonial';
import { router } from '@inertiajs/react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function TestimonialSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/testimonials');
            if (!response.ok) throw new Error('Failed to fetch testimonials');
            const data = await response.json();
            setTestimonials(data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            toast.error('Gagal memuat testimonial');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const [formData, setFormData] = useState({
        position: '',
        company: '',
        message: '',
    });

    // Calculate testimonial stats
    const totalTestimonials = testimonials.length;
    const featuredTestimonials = testimonials.filter((t) => t.is_featured).length;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.company || !formData.message || !formData.position) return;

        setIsSubmitting(true);
        try {
            router.post('/testimonials', formData, {
                onSuccess: () => {
                    toast.success('Testimonial berhasil ditambahkan');
                    setFormData({ company: '', position: '', message: '' });
                    // Refresh testimonials list after successful submission
                    fetchTestimonials();
                },
                onError: (errors) => {
                    console.error('Validation errors:', errors);
                    toast.error('Gagal menambahkan testimonial');
                },
                onFinish: () => setIsSubmitting(false),
            });
        } catch (error) {
            console.error('Error submitting testimonial:', error);
            toast.error('Gagal menambahkan testimonial');
            setIsSubmitting(false);
        }
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
                {/* Rating Summary - Left Side */}
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

                {/* Testimonials Grid - Right Side */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {isLoading ? (
                            <div className="col-span-3 flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                            </div>
                        ) : testimonials.length === 0 ? (
                            <div className="col-span-3 py-8 text-center text-gray-500">Belum ada testimonial</div>
                        ) : (
                            testimonials.map((t) => (
                                <Card key={t.id} className="shadow-md transition-shadow hover:shadow-lg">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-lg text-gray-800">{t.user.name}</CardTitle>
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

            {/* Form Testimonial */}
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
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                className="mb-4 border-gray-300"
                            />

                            <Input
                                placeholder="Perusahaan / Instansi"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="border-gray-300"
                            />

                            <Textarea
                                placeholder="Tulis pengalaman Anda bekerja dengan PT. PMP Karya Mandiri..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="min-h-[100px] border-gray-300"
                                rows={4}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-amber-600 py-3 font-medium text-white hover:bg-amber-700"
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
