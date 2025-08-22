import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUpRight, Star } from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
    id: number;
    name: string;
    company: string;
    message: string;
    rating: number;
}

interface RatingSummary {
    totalReviews: number;
    averageRating: number;
    ratingBreakdown: {
        stars: number;
        count: number;
        percentage: number;
    }[];
}

export default function TestimonialSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        {
            id: 1,
            name: 'Budi Santoso',
            company: 'PT. Maju Jaya',
            message: 'Pelayanan sangat profesional, proyek selesai tepat waktu dengan kualitas terbaik. Tim sangat responsif dan komunikatif.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Siti Aminah',
            company: 'CV. Cipta Karya',
            message: 'Sangat puas dengan komunikasi tim dan hasil pekerjaan yang memuaskan. Akan menggunakan jasa mereka lagi.',
            rating: 5,
        },
        {
            id: 3,
            name: 'Andi Wijaya',
            company: 'PT. Sumber Makmur',
            message: 'Pekerjaan rapi, terorganisir, dan sesuai dengan standar yang kami harapkan. Highly recommended!',
            rating: 4,
        },
        {
            id: 4,
            name: 'Maya Sari',
            company: 'CV. Berkah Jaya',
            message: 'Kualitas kerja bagus, namun ada sedikit keterlambatan dalam pengiriman. Overall tetap memuaskan.',
            rating: 4,
        },
        {
            id: 5,
            name: 'Rizki Pratama',
            company: 'PT. Indo Sukses',
            message: 'Excellent service! Proyek berjalan lancar dan hasilnya melebihi ekspektasi kami.',
            rating: 5,
        },
        {
            id: 6,
            name: 'Dewi Kartika',
            company: 'UD. Mandiri',
            message: 'Pelayanan cukup baik, tapi masih ada ruang untuk improvement dalam hal komunikasi.',
            rating: 3,
        },
    ]);

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        message: '',
        rating: 0,
    });

    // Calculate rating summary
    const calculateRatingSummary = (): RatingSummary => {
        const totalReviews = testimonials.length;
        const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0);
        const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

        const ratingCounts = [5, 4, 3, 2, 1].map((stars) => {
            const count = testimonials.filter((t) => t.rating === stars).length;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return { stars, count, percentage };
        });

        return {
            totalReviews,
            averageRating,
            ratingBreakdown: ratingCounts,
        };
    };

    const ratingSummary = calculateRatingSummary();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.company || !formData.message || formData.rating === 0) return;

        setTestimonials([
            ...testimonials,
            {
                id: testimonials.length + 1,
                name: formData.name,
                company: formData.company,
                message: formData.message,
                rating: formData.rating,
            },
        ]);
        setFormData({ name: '', company: '', message: '', rating: 0 });
    };

    const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm') => {
        const sizeClass = size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6';
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`${sizeClass} ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                ))}
            </div>
        );
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
                            <CardTitle className="text-lg text-gray-800">Rating & Review</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Overall Rating */}
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-amber-600">{ratingSummary.averageRating.toFixed(1)}</div>
                                {renderStars(Math.round(ratingSummary.averageRating), 'lg')}
                                <p className="mt-2 text-sm text-gray-600">Berdasarkan {ratingSummary.totalReviews} review</p>
                            </div>

                            {/* Rating Breakdown */}
                            <div className="space-y-2">
                                {ratingSummary.ratingBreakdown.map(({ stars, count, percentage }) => (
                                    <div key={stars} className="flex items-center gap-2 text-sm">
                                        <span className="w-2">{stars}</span>
                                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                                            <div className="h-2 rounded-full bg-amber-400 transition-all" style={{ width: `${percentage}%` }} />
                                        </div>
                                        <span className="w-8 text-gray-600">{count}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quality Indicators */}
                            <div className="border-t border-amber-200 pt-4">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">95%</div>
                                        <div className="text-xs text-gray-600">Puas</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">98%</div>
                                        <div className="text-xs text-gray-600">Recommend</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Testimonials Grid - Right Side */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {testimonials.map((t) => (
                            <Card key={t.id} className="shadow-md transition-shadow hover:shadow-lg">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-lg text-gray-800">{t.name}</CardTitle>
                                            <p className="text-sm text-gray-500">{t.company}</p>
                                        </div>
                                        {renderStars(t.rating)}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed text-gray-700">{t.message}</p>
                                </CardContent>
                            </Card>
                        ))}
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
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    placeholder="Nama Anda"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="border-gray-300"
                                />
                                <Input
                                    placeholder="Perusahaan / Instansi"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="border-gray-300"
                                />
                            </div>

                            {/* Rating Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Rating Kepuasan</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-8 w-8 transition-colors ${
                                                    star <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 hover:text-amber-300'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

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
                                disabled={!formData.name || !formData.company || !formData.message || formData.rating === 0}
                            >
                                Kirim Testimoni
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
