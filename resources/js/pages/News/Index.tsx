import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Eye, Heart } from 'lucide-react';
import { useState } from 'react';
import { PageLayout } from '../../components/page-layout';

type NewsItem = {
    id: number;
    title: string;
    description: string;
    image: string;
    likes: number;
    views: number;
    date: string;
    author: string;
    readTime: number;
};

type UtamaSubCategory = 'proyek' | 'industri';
type LainnyaSubCategory = 'teknologi' | 'sosial';

type NewsData = {
    utama: Record<UtamaSubCategory, NewsItem[]>;
    lainnya: Record<LainnyaSubCategory, NewsItem[]>;
};

const newsData: NewsData = {
    utama: {
        proyek: [
            {
                id: 1,
                title: 'Proyek Jalan Tol Trans Jawa Fase 2 Dimulai',
                description:
                    'Pembangunan jalan tol sepanjang 150 km yang menghubungkan Jakarta-Surabaya memasuki fase kedua dengan investasi Rp 25 triliun.',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop',
                likes: 450,
                views: 2100,
                date: '2025-08-22',
                author: 'Ahmad Surya',
                readTime: 5,
            },
            {
                id: 2,
                title: 'Gedung Industri Modern di Karawang Diresmikan',
                description:
                    'Kompleks industri seluas 50 hektar dengan teknologi ramah lingkungan resmi beroperasi dan menciptakan 3000 lapangan kerja.',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
                likes: 380,
                views: 1800,
                date: '2025-08-21',
                author: 'Siti Nurhaliza',
                readTime: 4,
            },
            {
                id: 3,
                title: 'Pembangunan Pelabuhan Patimban Tahap III',
                description: 'Proyek ekspansi pelabuhan dengan kapasitas 2 juta TEUs per tahun untuk mendukung perdagangan internasional.',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
                likes: 520,
                views: 2800,
                date: '2025-08-20',
                author: 'Budi Santoso',
                readTime: 6,
            },
            {
                id: 4,
                title: 'Proyek MRT Jakarta Fase 4 Groundbreaking',
                description: 'Peresmian pembangunan jalur MRT baru sepanjang 25 km yang akan melayani rute Jakarta Timur - Jakarta Barat.',
                image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=400&fit=crop',
                likes: 680,
                views: 3200,
                date: '2025-08-19',
                author: 'Dewi Lestari',
                readTime: 7,
            },
        ],
        industri: [
            {
                id: 5,
                title: 'Pabrik Baja Terbesar di Cilegon Beroperasi Penuh',
                description: 'Fasilitas produksi dengan kapasitas 2 juta ton per tahun mulai beroperasi penuh setelah investasi USD 1.5 miliar.',
                image: 'https://images.unsplash.com/photo-1565611419350-5828474feee1?w=800&h=400&fit=crop',
                likes: 420,
                views: 2400,
                date: '2025-08-18',
                author: 'Rudi Hartono',
                readTime: 5,
            },
            {
                id: 6,
                title: 'Kolaborasi Strategis dengan Supplier Global',
                description: 'Kemitraan dengan 15 supplier internasional untuk meningkatkan kualitas dan efisiensi rantai pasok manufaktur.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
                likes: 290,
                views: 1600,
                date: '2025-08-17',
                author: 'Maya Sari',
                readTime: 4,
            },
            {
                id: 7,
                title: 'Zona Industri Hijau Batam Resmi Dibuka',
                description: 'Kawasan industri ramah lingkungan seluas 200 hektar dengan standar internasional mulai menerima investor.',
                image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop',
                likes: 340,
                views: 1900,
                date: '2025-08-16',
                author: 'Joko Widodo',
                readTime: 6,
            },
            {
                id: 8,
                title: 'Ekspansi Pabrik Otomotif ke Kalimantan',
                description: 'Pembukaan fasilitas produksi kendaraan bermotor baru dengan teknologi hybrid untuk pasar domestik dan ekspor.',
                image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&h=400&fit=crop',
                likes: 510,
                views: 2700,
                date: '2025-08-15',
                author: 'Indra Gunawan',
                readTime: 5,
            },
        ],
    },
    lainnya: {
        teknologi: [
            {
                id: 9,
                title: 'Implementasi AI dalam Konstruksi Meningkat 300%',
                description: 'Penggunaan kecerdasan buatan untuk optimalisasi proyek konstruksi menunjukkan peningkatan efisiensi yang signifikan.',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
                likes: 720,
                views: 4200,
                date: '2025-08-22',
                author: 'Dr. Andi Pratama',
                readTime: 8,
            },
            {
                id: 10,
                title: 'Robot Konstruksi Masa Depan Hadir di Indonesia',
                description: 'Teknologi robotika canggih untuk konstruksi otomatis mulai diujicoba di beberapa proyek percontohan.',
                image: 'https://images.unsplash.com/photo-1561144257-e32e6282ceda?w=800&h=400&fit=crop',
                likes: 580,
                views: 3100,
                date: '2025-08-20',
                author: 'Prof. Lisa Handayani',
                readTime: 6,
            },
            {
                id: 11,
                title: 'IoT untuk Monitoring Infrastruktur Real-time',
                description: 'Sistem pemantauan berbasis Internet of Things diterapkan untuk mengawasi kondisi jembatan dan gedung tinggi.',
                image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
                likes: 450,
                views: 2600,
                date: '2025-08-18',
                author: 'Ir. Bambang Susilo',
                readTime: 7,
            },
            {
                id: 12,
                title: 'Blockchain untuk Transparansi Proyek Publik',
                description: 'Implementasi teknologi blockchain dalam pengelolaan anggaran dan progress proyek infrastruktur pemerintah.',
                image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
                likes: 390,
                views: 2200,
                date: '2025-08-16',
                author: 'Sarah Wijaya',
                readTime: 5,
            },
        ],
        sosial: [
            {
                id: 13,
                title: 'Program CSR Pendidikan di 100 Sekolah',
                description: 'Inisiatif renovasi dan pembangunan fasilitas pendidikan untuk meningkatkan akses pendidikan berkualitas.',
                image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop',
                likes: 620,
                views: 3500,
                date: '2025-08-21',
                author: 'Nina Karlina',
                readTime: 4,
            },
            {
                id: 14,
                title: 'Pemberdayaan Masyarakat Lokal Melalui UMKM',
                description: 'Program pelatihan dan bantuan modal untuk 500 UMKM di sekitar lokasi proyek konstruksi besar.',
                image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
                likes: 480,
                views: 2900,
                date: '2025-08-19',
                author: 'Hendra Setiawan',
                readTime: 5,
            },
            {
                id: 15,
                title: 'Kampanye Go Green di Lingkungan Kerja',
                description: 'Implementasi program ramah lingkungan dan pengurangan jejak karbon di semua fasilitas perusahaan.',
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop',
                likes: 350,
                views: 1800,
                date: '2025-08-17',
                author: 'Luki Hermawan',
                readTime: 6,
            },
            {
                id: 16,
                title: 'Bantuan Korban Bencana Alam NTB',
                description: 'Program bantuan darurat dan pembangunan kembali infrastruktur untuk korban gempa bumi di Lombok.',
                image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=400&fit=crop',
                likes: 890,
                views: 4800,
                date: '2025-08-15',
                author: 'Maria Gonzales',
                readTime: 8,
            },
        ],
    },
};

export default function Index() {
    const [activeCategory, setActiveCategory] = useState<'utama' | 'lainnya'>('utama');
    const [activeSub, setActiveSub] = useState<UtamaSubCategory | LainnyaSubCategory>('proyek');
    const [filter, setFilter] = useState<'terbaru' | 'disukai' | 'trending'>('terbaru');
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    const subCategories = Object.keys(newsData[activeCategory]) as UtamaSubCategory[] | LainnyaSubCategory[];
    let newsList: NewsItem[] = [];

    if (activeCategory === 'utama') {
        newsList = newsData.utama[activeSub as UtamaSubCategory];
    } else {
        newsList = newsData.lainnya[activeSub as LainnyaSubCategory];
    }

    // Apply filter
    if (filter === 'terbaru') {
        newsList = [...newsList].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (filter === 'disukai') {
        newsList = [...newsList].sort((a, b) => b.likes - a.likes);
    } else if (filter === 'trending') {
        newsList = [...newsList].sort((a, b) => b.views - a.views);
    }

    const handleNewsClick = (news: NewsItem) => {
        setSelectedNews(news);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Detail View Component
    if (selectedNews) {
        return (
            <PageLayout>
                <div className="relative mx-auto mt-24 w-full max-w-4xl px-4 py-8 font-montserrat">
                    <button onClick={() => setSelectedNews(null)} className="mb-6 flex items-center gap-2 text-amber-600 hover:text-amber-700">
                        ← Kembali ke Berita
                    </button>

                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg"
                    >
                        <div className="relative h-64 md:h-96">
                            <img src={selectedNews.image} alt={selectedNews.title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(selectedNews.date)}
                                </span>
                                <span>By {selectedNews.author}</span>
                                <span>{selectedNews.readTime} min read</span>
                            </div>

                            <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-4xl">{selectedNews.title}</h1>

                            <div className="mb-6 flex items-center gap-6 text-gray-600">
                                <span className="flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-red-500" />
                                    {selectedNews.likes.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Eye className="h-5 w-5" />
                                    {selectedNews.views.toLocaleString()}
                                </span>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <p className="mb-6 text-lg leading-relaxed text-gray-700">{selectedNews.description}</p>

                                {/* Placeholder for additional content */}
                                <div className="space-y-4 text-gray-700">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat.
                                    </p>
                                    <p>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                                        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.article>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                className="relative mx-auto h-64 overflow-hidden bg-gradient-to-br from-gray-900 via-amber-900 to-amber-600 px-4 py-8 md:h-80"
            >
                <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl md:h-96 md:w-96"></div>
                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-amber-300/20 blur-2xl md:h-64 md:w-64"></div>

                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="mb-2 text-3xl font-bold md:text-5xl">Pusat Berita</h1>
                        <p className="text-lg opacity-90 md:text-xl">Informasi Terkini Seputar Industri & Konstruksi</p>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="relative mx-auto mt-16 w-full max-w-7xl px-4 font-montserrat md:-mt-20">
                <div className="flex flex-col lg:flex-row lg:gap-8">
                    {/* Sidebar */}
                    <aside className="mb-8 w-full lg:mb-0 lg:w-1/4">
                        <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
                            {/* Main Categories */}
                            <div className="mb-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">Kategori Utama</h3>
                                <div className="flex flex-row gap-2 lg:flex-col">
                                    {['utama', 'lainnya'].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                const category = cat as 'utama' | 'lainnya';
                                                setActiveCategory(category);
                                                if (category === 'utama') {
                                                    setActiveSub('proyek' as UtamaSubCategory);
                                                } else {
                                                    setActiveSub('teknologi' as LainnyaSubCategory);
                                                }
                                            }}
                                            className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                                activeCategory === cat
                                                    ? 'scale-105 transform bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                                            }`}
                                        >
                                            {cat === 'utama' ? 'Berita Utama' : 'Berita Lainnya'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sub Categories */}
                            <div className="mb-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">Sub Kategori</h3>
                                <div className="flex flex-row gap-2 lg:flex-col">
                                    {subCategories.map((sub) => (
                                        <button
                                            key={sub}
                                            onClick={() => setActiveSub(sub)}
                                            className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                                                activeSub === sub
                                                    ? 'border border-amber-300 bg-amber-100 text-amber-700'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {sub.charAt(0).toUpperCase() + sub.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filter */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">Filter</h3>
                                <div className="flex flex-row gap-2 lg:flex-col">
                                    {[
                                        { key: 'terbaru', label: 'Terbaru' },
                                        { key: 'disukai', label: 'Paling Disukai' },
                                        { key: 'trending', label: 'Trending' },
                                    ].map(({ key, label }) => (
                                        <button
                                            key={key}
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            onClick={() => setFilter(key as any)}
                                            className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                                                filter === key ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* News Content */}
                    <section className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2"
                        >
                            {newsList.map((news) => (
                                <motion.div
                                    key={news.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: news.id * 0.1 }}
                                    className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                    onClick={() => handleNewsClick(news)}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                                            {news.readTime} min read
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-amber-600">
                                            {news.title}
                                        </h3>
                                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">{news.description}</p>

                                        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(news.date)}
                                            </span>
                                            <span className="font-medium">{news.author}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Heart className="h-4 w-4 text-red-500" />
                                                    {news.likes}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-4 w-4" />
                                                    {news.views}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-amber-600 transition-colors duration-200 group-hover:text-amber-700">
                                                <span className="mr-1 text-sm font-medium">Baca Selengkapnya</span>
                                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}
