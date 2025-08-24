import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Eye, Heart } from 'lucide-react';
import { useState } from 'react';
import { PageLayout } from '../../components/page-layout';
import { usePage } from '@inertiajs/react';

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
    category?: string;
    subcategory?: string;
};

type UtamaSubCategory = 'proyek' | 'industri';
type LainnyaSubCategory = 'teknologi' | 'sosial';

export default function Index() {
    // Ambil data berita dari backend
    const { news = [] } = usePage().props as { news?: NewsItem[] };

    // State kategori, subkategori, filter
    const [activeCategory, setActiveCategory] = useState<'utama' | 'lainnya'>('utama');
    const [activeSub, setActiveSub] = useState<UtamaSubCategory | LainnyaSubCategory>('proyek');
    const [filter, setFilter] = useState<'terbaru' | 'disukai' | 'trending'>('terbaru');
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    // Subkategori sesuai kategori aktif
    const subCategories =
        activeCategory === 'utama'
            ? (['proyek', 'industri'] as UtamaSubCategory[])
            : (['teknologi', 'sosial'] as LainnyaSubCategory[]);

    // Filter berita dari tabel sesuai kategori & subkategori
    let newsList = news.filter((item) => {
        return (
            item.category === activeCategory &&
            item.subcategory === activeSub
        );
    });

    // Apply filter side menu
    if (filter === 'terbaru') {
        newsList = [...newsList].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (filter === 'disukai') {
        newsList = [...newsList].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
    } else if (filter === 'trending') {
        newsList = [...newsList].sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
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
                                    {selectedNews.likes?.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Eye className="h-5 w-5" />
                                    {selectedNews.views?.toLocaleString()}
                                </span>
                            </div>
                            <div className="prose prose-lg max-w-none">
                                <p className="mb-6 text-lg leading-relaxed text-gray-700">{selectedNews.description}</p>
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
                            {newsList.length === 0 && (
                                <div className="col-span-full text-center text-gray-500 py-10">Belum ada berita.</div>
                            )}
                        </motion.div>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}
