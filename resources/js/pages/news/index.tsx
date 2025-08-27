/* eslint-disable @typescript-eslint/no-explicit-any */
import { router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Eye, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    category?: string;
    subcategory?: string;
    isLiked?: boolean;
};

export default function Index() {
    // Ambil data dari backend
    const {
        news: initialNews = [],
        categories: initialCategories = [],
        subcategories: initialSubcategories = [],
        filters = {},
    } = usePage().props as {
        news?: NewsItem[];
        categories?: string[];
        subcategories?: string[];
        filters?: {
            category?: string;
            subcategory?: string;
        };
    };

    // State untuk data
    const [news, setNews] = useState<NewsItem[]>(initialNews);
    const [categories, setCategories] = useState<string[]>(initialCategories);
    const [subcategories, setSubcategories] = useState<string[]>(initialSubcategories);
    const [isLoading, setIsLoading] = useState(false);

    // State filter
    const [activeCategory, setActiveCategory] = useState<string>(filters?.category || 'all');
    const [activeSubcategory, setActiveSubcategory] = useState<string>(filters?.subcategory || 'all');
    const [filter, setFilter] = useState<'terbaru' | 'disukai' | 'trending'>('terbaru');

    // Fetch data berdasarkan kategori dan subkategori
    useEffect(() => {
        fetchNewsByCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory, activeSubcategory]);

    const fetchNewsByCategory = async () => {
        setIsLoading(true);
        try {
            let url = '/news';
            const params = new URLSearchParams();

            if (activeCategory !== 'all') {
                params.append('category', activeCategory);
            }

            if (activeSubcategory !== 'all') {
                params.append('subcategory', activeSubcategory);
            }

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setNews(data.news || []);
                setCategories(data.categories || []);
                setSubcategories(data.subcategories || []);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter berita sesuai dengan pilihan sorting
    const getFilteredNews = () => {
        // eslint-disable-next-line prefer-const
        let filteredNews = [...news];

        if (filter === 'terbaru') {
            filteredNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (filter === 'disukai') {
            filteredNews.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
        } else if (filter === 'trending') {
            filteredNews.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
        }

        return filteredNews;
    };

    const handleNewsClick = (newsItem: NewsItem) => {
        router.get(`/news/${newsItem.id}`);
    };

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setActiveSubcategory('all'); // Reset subcategory ketika category berubah
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatReadTime = (minutes: number) => {
        return `${minutes} min read`;
    };

    // Dapatkan subkategori yang tersedia untuk kategori aktif
    const getAvailableSubcategories = () => {
        if (activeCategory === 'all') {
            return Array.from(new Set(subcategories)).filter((sub) => sub);
        }

        // Filter subkategori berdasarkan berita yang ada di kategori aktif
        const availableSubs = news
            .filter((item) => item.category === activeCategory && item.subcategory)
            .map((item) => item.subcategory)
            .filter((sub): sub is string => sub !== undefined && sub !== '');

        return Array.from(new Set(availableSubs));
    };

    const filteredNews = getFilteredNews();
    const availableSubcategories = getAvailableSubcategories();

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
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleCategoryChange('all')}
                                        className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                                            activeCategory === 'all'
                                                ? 'scale-105 transform bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                                        }`}
                                    >
                                        Semua Kategori
                                    </button>
                                    {categories
                                        .filter((cat) => cat)
                                        .map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => handleCategoryChange(category)}
                                                className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                                                    activeCategory === category
                                                        ? 'scale-105 transform bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                </div>
                            </div>

                            {/* Sub Categories */}
                            {availableSubcategories.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Sub Kategori</h3>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => setActiveSubcategory('all')}
                                            className={`rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
                                                activeSubcategory === 'all'
                                                    ? 'border border-amber-300 bg-amber-100 text-amber-700'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            Semua Subkategori
                                        </button>
                                        {availableSubcategories.map((subcategory) => (
                                            <button
                                                key={subcategory}
                                                onClick={() => setActiveSubcategory(subcategory)}
                                                className={`rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
                                                    activeSubcategory === subcategory
                                                        ? 'border border-amber-300 bg-amber-100 text-amber-700'
                                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {subcategory}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Filter */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">Urutkan Berdasarkan</h3>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { key: 'terbaru', label: 'Terbaru' },
                                        { key: 'disukai', label: 'Paling Disukai' },
                                        { key: 'trending', label: 'Trending' },
                                    ].map(({ key, label }) => (
                                        <button
                                            key={key}
                                            onClick={() => setFilter(key as any)}
                                            className={`rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
                                                filter === key ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Info Filter Aktif */}
                            <div className="mt-6 rounded-lg bg-amber-50 p-3">
                                <h4 className="mb-2 text-sm font-semibold text-amber-800">Filter Aktif:</h4>
                                <div className="text-xs text-amber-700">
                                    <p>Kategori: {activeCategory === 'all' ? 'Semua' : activeCategory}</p>
                                    <p>Subkategori: {activeSubcategory === 'all' ? 'Semua' : activeSubcategory}</p>
                                    <p>Urutan: {filter === 'terbaru' ? 'Terbaru' : filter === 'disukai' ? 'Paling Disukai' : 'Trending'}</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* News Content */}
                    <section className="flex-1">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-amber-600"></div>
                                <span className="ml-3 text-gray-600">Memuat berita...</span>
                            </div>
                        ) : (
                            <>
                                {/* Header Info */}
                                <div className="mb-6 rounded-lg bg-white p-4 shadow">
                                    <h2 className="mb-2 text-xl font-bold text-gray-800">
                                        {activeCategory === 'all' ? 'Semua Berita' : `Berita ${activeCategory}`}
                                        {activeSubcategory !== 'all' && ` - ${activeSubcategory}`}
                                    </h2>
                                    <p className="text-gray-600">Menampilkan {filteredNews.length} berita</p>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2"
                                >
                                    {filteredNews.map((newsItem) => (
                                        <motion.div
                                            key={newsItem.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                            onClick={() => handleNewsClick(newsItem)}
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={newsItem.image.startsWith('http') ? newsItem.image : `/${newsItem.image}`}
                                                    alt={newsItem.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                                <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                                                    {formatReadTime(newsItem.readTime)}
                                                </div>
                                                {(newsItem.category || newsItem.subcategory) && (
                                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                                        {newsItem.category && (
                                                            <span className="rounded-full border border-amber-200 bg-amber-600/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                                                {newsItem.category}
                                                            </span>
                                                        )}
                                                        {newsItem.subcategory && (
                                                            <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                                                {newsItem.subcategory}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-amber-600">
                                                    {newsItem.title}
                                                </h3>
                                                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">{newsItem.description}</p>
                                                <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(newsItem.date)}
                                                    </span>
                                                    <span className="font-medium">{newsItem.author}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Heart
                                                                className="h-4 w-4 text-red-500"
                                                                fill={newsItem.isLiked ? 'currentColor' : 'none'}
                                                            />
                                                            {newsItem.likes.toLocaleString()}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="h-4 w-4" />
                                                            {newsItem.views.toLocaleString()}
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
                                    {filteredNews.length === 0 && !isLoading && (
                                        <div className="col-span-full py-20 text-center text-gray-500">
                                            <div className="mb-2 text-2xl font-semibold">Tidak ada berita</div>
                                            <p className="text-gray-600">
                                                {activeCategory !== 'all' || activeSubcategory !== 'all'
                                                    ? `Tidak ditemukan berita untuk filter yang dipilih.`
                                                    : `Belum ada berita yang tersedia.`}
                                            </p>
                                            {(activeCategory !== 'all' || activeSubcategory !== 'all') && (
                                                <button
                                                    onClick={() => {
                                                        setActiveCategory('all');
                                                        setActiveSubcategory('all');
                                                    }}
                                                    className="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700"
                                                >
                                                    Tampilkan Semua Berita
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </>
                        )}
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}
