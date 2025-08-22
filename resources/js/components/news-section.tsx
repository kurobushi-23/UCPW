import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

interface NewsItem {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    date: string;
    readTime: string;
    link: string;
    featured: boolean;
}

export default function NewsSection() {
    const [news] = useState<NewsItem[]>([
        {
            id: 1,
            title: 'PT. PMP Karya Mandiri Raih Penghargaan Best Construction Company 2024',
            category: 'Penghargaan',
            description:
                'Perusahaan berhasil meraih penghargaan bergengsi sebagai perusahaan konstruksi terbaik tahun 2024 berkat inovasi dan kualitas kerja yang konsisten dalam berbagai proyek infrastruktur.',
            image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80',
            date: '15 Agustus 2024',
            readTime: '5 min',
            link: '#',
            featured: true,
        },
        {
            id: 2,
            title: 'Proyek Pembangunan Jembatan Strategis Selesai Lebih Awal',
            category: 'Proyek',
            description:
                'Pembangunan jembatan penghubung antar kota yang menjadi salah satu proyek strategis nasional berhasil diselesaikan 2 bulan lebih awal dari jadwal yang direncanakan.',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80',
            date: '10 Agustus 2024',
            readTime: '4 min',
            link: '#',
            featured: false,
        },
        {
            id: 3,
            title: 'Teknologi Smart Construction Diterapkan dalam Proyek Terbaru',
            category: 'Teknologi',
            description:
                'Implementasi teknologi konstruksi pintar menggunakan IoT dan AI untuk monitoring real-time, meningkatkan efisiensi dan keamanan kerja di lokasi proyek.',
            image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80',
            date: '5 Agustus 2024',
            readTime: '6 min',
            link: '#',
            featured: false,
        },
        {
            id: 4,
            title: 'Program CSR: Pembangunan Fasilitas Pendidikan di Daerah Terpencil',
            category: 'CSR',
            description:
                'Sebagai bentuk tanggung jawab sosial, perusahaan membangun 10 unit sekolah dasar di daerah terpencil untuk mendukung pendidikan anak-anak Indonesia.',
            image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80',
            date: '28 Juli 2024',
            readTime: '3 min',
            link: '#',
            featured: false,
        },
        {
            id: 5,
            title: 'Ekspansi ke Wilayah Timur Indonesia dengan Proyek Infrastruktur Besar',
            category: 'Ekspansi',
            description:
                'Membuka cabang baru di Indonesia Timur untuk menangani proyek-proyek infrastruktur besar yang mendukung program pemerintah dalam pembangunan nasional.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80',
            date: '20 Juli 2024',
            readTime: '7 min',
            link: '#',
            featured: false,
        },
        {
            id: 6,
            title: 'Sertifikasi ISO 45001 untuk Keselamatan dan Kesehatan Kerja',
            category: 'Sertifikasi',
            description:
                'Berhasil meraih sertifikasi ISO 45001:2018 yang menunjukkan komitmen tinggi terhadap sistem manajemen keselamatan dan kesehatan kerja di semua proyek.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80',
            date: '12 Juli 2024',
            readTime: '4 min',
            link: '#',
            featured: false,
        },
    ]);

    const featuredNews = news.filter((item) => item.featured);
    const regularNews = news.filter((item) => !item.featured);

    const getCategoryColor = (category: string) => {
        const colors = {
            Penghargaan: 'bg-amber-100 text-amber-800',
            Proyek: 'bg-blue-100 text-blue-800',
            Teknologi: 'bg-green-100 text-green-800',
            CSR: 'bg-purple-100 text-purple-800',
            Ekspansi: 'bg-red-100 text-red-800',
            Sertifikasi: 'bg-indigo-100 text-indigo-800',
        };
        return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <section id="news" className="mx-auto w-full max-w-7xl px-4 py-16 font-montserrat">
            {/* Header */}
            <div className="mb-12 text-center">
                <span className="flex items-center justify-center gap-2 font-semibold text-amber-600">
                    Berita & Update
                    <ArrowUpRight className="h-4 w-4 text-amber-600" />
                </span>
                <h2 className="mx-auto mt-5 max-w-4xl text-2xl font-bold text-gray-900 md:text-4xl">
                    Ikuti perkembangan terkini dari <span className="text-amber-600">PT. PMP Karya Mandiri</span>
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    Dapatkan informasi terbaru tentang proyek, inovasi, dan pencapaian perusahaan
                </p>
            </div>

            {/* Featured News */}
            {featuredNews.length > 0 && (
                <div className="mb-12">
                    <h3 className="mb-6 text-xl font-semibold text-gray-800">Berita Utama</h3>
                    {featuredNews.map((item) => (
                        <Card key={item.id} className="overflow-hidden border-0 py-0 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-72 w-full rounded-tl-xl object-cover transition-transform duration-300 hover:scale-105 lg:h-full"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(item.category)}`}>
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between p-8">
                                    <div>
                                        <h3 className="mb-4 line-clamp-2 text-xl leading-tight font-bold text-gray-900 lg:text-2xl">{item.title}</h3>
                                        <p className="mb-6 line-clamp-3 leading-relaxed text-gray-600">{item.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{item.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{item.readTime}</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="p-2 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                                            onClick={() => (window.location.href = item.link)}
                                        >
                                            Baca Selengkapnya
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Regular News Grid */}
            <div className="mb-12">
                <h3 className="mb-6 text-xl font-semibold text-gray-800">Berita Lainnya</h3>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {regularNews.map((item) => (
                        <Card key={item.id} className="group overflow-hidden border-0 py-0 shadow-md transition-all duration-300 hover:shadow-lg">
                            <div className="relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-48 w-full rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rounded-t-xl"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(item.category)}`}>
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="mb-3 line-clamp-2 text-lg leading-tight font-semibold text-gray-900 transition-colors group-hover:text-amber-600">
                                    {item.title}
                                </h3>
                                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>{item.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{item.readTime}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="p-1 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                                        onClick={() => (window.location.href = item.link)}
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Load More Button */}
            <div className="text-center">
                <Button variant="outline" className="border-amber-600 px-8 py-3 text-amber-600 hover:bg-amber-600 hover:text-white">
                    Lihat Selengkapnya
                </Button>
            </div>
        </section>
    );
}
