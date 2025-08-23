'use client';

import FooterSection from '@/components/footer-section';
import { motion } from 'framer-motion';
import { Award, Building, Calendar, Camera, Play, Send, Star, Truck, User, Wrench } from 'lucide-react';
import { useState } from 'react';
import { PageLayout } from '../../components/page-layout';

type Comment = {
    id: number;
    name: string;
    avatar: string;
    comment: string;
    rating: number;
    date: string;
};

type ServiceData = {
    title: string;
    description: string;
    heroImage: string;
    stats: {
        projects: number;
        clients: number;
        experience: number;
        rating: number;
    };
    features: string[];
    gallery: {
        id: number;
        image: string;
        title: string;
        description: string;
    }[];
    article: {
        title: string;
        content: string;
        author: string;
        date: string;
        readTime: number;
    };
    comments: Comment[];
};

const servicesData: Record<string, ServiceData> = {
    kontraktor: {
        title: 'Kontraktor & Supplier',
        description:
            'PT. PMP Karya Mandiri menyediakan layanan sebagai kontraktor dan supplier terpercaya dalam berbagai sektor konstruksi. Dengan jaringan supplier yang luas serta tim berpengalaman, kami menjamin kelancaran supply chain material dan pelaksanaan proyek.',
        heroImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop',
        stats: {
            projects: 250,
            clients: 150,
            experience: 15,
            rating: 4.8,
        },
        features: [
            'Supply material berkualitas tinggi',
            'Jaringan supplier terpercaya',
            'Manajemen rantai pasok profesional',
            'Kontrol kualitas ketat',
            'Delivery tepat waktu',
            'Tim ahli berpengalaman',
        ],
        gallery: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
                title: 'Warehouse & Storage Facility',
                description: 'Fasilitas penyimpanan material dengan sistem inventory modern',
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
                title: 'Quality Control Process',
                description: 'Proses kontrol kualitas material sebelum pengiriman',
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
                title: 'Logistics & Distribution',
                description: 'Sistem distribusi material yang efisien dan terorganisir',
            },
        ],
        article: {
            title: 'Strategi Supply Chain Management dalam Konstruksi Modern',
            content:
                'Dalam industri konstruksi yang terus berkembang, pengelolaan rantai pasok yang efektif menjadi kunci utama kesuksesan proyek. PT. PMP Karya Mandiri menerapkan sistem supply chain management terintegrasi yang menggabungkan teknologi digital dengan pengalaman bertahun-tahun di lapangan.',
            author: 'Ir. Bambang Suryanto, M.Eng',
            date: '2025-08-20',
            readTime: 8,
        },
        comments: [
            {
                id: 1,
                name: 'Andi Pratama',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                comment: 'Layanan kontraktor yang sangat profesional. Material selalu berkualitas dan pengiriman tepat waktu.',
                rating: 5,
                date: '2025-08-15',
            },
            {
                id: 2,
                name: 'Sari Dewi',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                comment: 'Tim supplier yang handal. Sudah bekerja sama untuk beberapa proyek besar dan hasilnya memuaskan.',
                rating: 5,
                date: '2025-08-10',
            },
            {
                id: 3,
                name: 'Rudi Hermawan',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                comment: 'Harga kompetitif dengan kualitas terjamin. Recommended untuk proyek konstruksi.',
                rating: 4,
                date: '2025-08-05',
            },
        ],
    },
    konstruksi: {
        title: 'Konstruksi',
        description:
            'Kami menghadirkan solusi konstruksi mulai dari gedung industri, infrastruktur jalan, hingga fasilitas publik dengan standar mutu dan keselamatan yang tinggi. Setiap proyek dikerjakan oleh tenaga ahli profesional dan bersertifikat.',
        heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
        stats: {
            projects: 180,
            clients: 95,
            experience: 20,
            rating: 4.9,
        },
        features: [
            'Gedung industri & perkantoran',
            'Infrastruktur jalan & jembatan',
            'Fasilitas publik',
            'Renovasi & maintenance',
            'Project management terintegrasi',
            'Sertifikat ISO & K3',
        ],
        gallery: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1541976590-713941681591?w=800&h=600&fit=crop',
                title: 'Industrial Building Construction',
                description: 'Pembangunan gedung industri dengan teknologi konstruksi modern',
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
                title: 'Infrastructure Development',
                description: 'Proyek infrastruktur jalan dan jembatan berkualitas tinggi',
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1583331987119-3a3ef8670a5b?w=800&h=600&fit=crop',
                title: 'Safety & Quality Management',
                description: 'Implementasi standar keselamatan dan quality control',
            },
        ],
        article: {
            title: 'Inovasi Teknologi dalam Konstruksi Berkelanjutan',
            content:
                'Konstruksi berkelanjutan bukan lagi pilihan, tetapi keharusan di era modern ini. PT. PMP Karya Mandiri mengintegrasikan teknologi hijau dan metode konstruksi ramah lingkungan dalam setiap proyeknya, menciptakan bangunan yang tidak hanya kokoh tetapi juga bertanggung jawab terhadap lingkungan.',
            author: 'Dr. Eng. Lisa Handayani',
            date: '2025-08-18',
            readTime: 12,
        },
        comments: [
            {
                id: 1,
                name: 'Budi Santoso',
                avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
                comment: 'Konstruksi gedung pabrik kami diselesaikan dengan sempurna. Kualitas bangunan sangat memuaskan.',
                rating: 5,
                date: '2025-08-12',
            },
            {
                id: 2,
                name: 'Maya Sari',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
                comment: 'Tim konstruksi yang sangat profesional. Pengerjaan sesuai jadwal dan standar keselamatan tinggi.',
                rating: 5,
                date: '2025-08-08',
            },
        ],
    },
    'alat-berat': {
        title: 'Alat Berat',
        description:
            'PT. PMP Karya Mandiri menyediakan berbagai alat berat untuk mendukung kelancaran proyek, termasuk excavator, bulldozer, crane, dan peralatan konstruksi lainnya yang terjamin kualitas dan perawatannya.',
        heroImage: 'https://images.unsplash.com/photo-1565611419350-5828474feee1?w=1200&h=600&fit=crop',
        stats: {
            projects: 320,
            clients: 200,
            experience: 18,
            rating: 4.7,
        },
        features: [
            'Excavator & Bulldozer',
            'Crane & Tower Crane',
            'Concrete Mixer & Pump',
            'Rental & maintenance service',
            'Operator berpengalaman',
            'Fleet management system',
        ],
        gallery: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1621905252472-e2b36c6e8036?w=800&h=600&fit=crop',
                title: 'Heavy Equipment Fleet',
                description: 'Armada alat berat lengkap dan terawat dengan baik',
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1585834017331-4ab7c2b8fab1?w=800&h=600&fit=crop',
                title: 'Maintenance Workshop',
                description: 'Fasilitas workshop dan maintenance berkelas internasional',
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
                title: 'On-Site Operations',
                description: 'Operasional alat berat di berbagai lokasi proyek konstruksi',
            },
        ],
        article: {
            title: 'Teknologi Smart Fleet Management untuk Alat Berat',
            content:
                'Pengelolaan armada alat berat yang efisien memerlukan teknologi canggih dan sistem monitoring real-time. PT. PMP Karya Mandiri mengimplementasikan smart fleet management system yang mengintegrasikan IoT, GPS tracking, dan predictive maintenance untuk mengoptimalkan performa alat berat.',
            author: 'Ir. Joko Widodo, M.T.',
            date: '2025-08-16',
            readTime: 10,
        },
        comments: [
            {
                id: 1,
                name: 'Hendra Gunawan',
                avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
                comment: 'Alat berat yang disewakan dalam kondisi prima. Operator juga sangat berpengalaman.',
                rating: 4,
                date: '2025-08-14',
            },
            {
                id: 2,
                name: 'Linda Kusuma',
                avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
                comment: 'Service maintenance yang excellent. Alat berat selalu dalam kondisi optimal.',
                rating: 5,
                date: '2025-08-09',
            },
        ],
    },
};

const menuItems = [
    {
        key: 'kontraktor',
        title: 'Kontraktor & Supplier',
        icon: Truck,
    },
    {
        key: 'konstruksi',
        title: 'Konstruksi',
        icon: Building,
    },
    {
        key: 'alat-berat',
        title: 'Alat Berat',
        icon: Wrench,
    },
];

export default function Index() {
    const [activeMenu, setActiveMenu] = useState('kontraktor');
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [newName, setNewName] = useState('');
    const [comments, setComments] = useState<Record<string, Comment[]>>({
        kontraktor: servicesData.kontraktor.comments,
        konstruksi: servicesData.konstruksi.comments,
        'alat-berat': servicesData['alat-berat'].comments,
    });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const activeService = servicesData[activeMenu];

    const handleSubmitComment = () => {
        if (!newComment.trim() || !newName.trim()) return;

        const comment: Comment = {
            id: Date.now(),
            name: newName,
            avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face`,
            comment: newComment,
            rating: newRating,
            date: new Date().toISOString().split('T')[0],
        };

        setComments((prev) => ({
            ...prev,
            [activeMenu]: [comment, ...prev[activeMenu]],
        }));

        setNewComment('');
        setNewName('');
        setNewRating(5);
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

    return (
        <PageLayout>
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                className="relative mx-auto h-96 overflow-hidden bg-gradient-to-br from-gray-900 via-amber-900 to-amber-600"
            >
                <div className="absolute inset-0">
                    <img src={activeService.heroImage} alt={activeService.title} className="h-full w-full object-cover opacity-30" />
                </div>
                <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-300/20 blur-2xl"></div>

                <div className="relative z-10 flex h-full items-center justify-center px-4">
                    <div className="text-center text-white">
                        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Layanan Kami</h1>
                        <p className="text-lg opacity-90 md:text-xl">Solusi Konstruksi Terpadu dan Profesional</p>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="relative mx-auto -mt-20 w-full max-w-7xl px-4 font-montserrat">
                <div className="flex flex-col lg:flex-row lg:gap-8">
                    {/* Sidebar */}
                    <aside className="mb-8 w-full lg:mb-0 lg:w-1/4">
                        <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
                            <h3 className="mb-6 text-lg font-semibold text-gray-800">Pilih Layanan</h3>
                            <nav className="flex flex-row gap-3 lg:flex-col">
                                {menuItems.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <button
                                            key={item.key}
                                            onClick={() => setActiveMenu(item.key)}
                                            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                                activeMenu === item.key
                                                    ? 'scale-105 transform bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                                            }`}
                                        >
                                            <IconComponent className="h-5 w-5" />
                                            <span className="hidden sm:block">{item.title}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1">
                        <motion.div
                            key={activeMenu}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            {/* Service Overview */}
                            <div className="rounded-2xl bg-white p-8 shadow-lg">
                                <h2 className="mb-4 text-3xl font-bold text-amber-700">{activeService.title}</h2>
                                <p className="mb-6 leading-relaxed text-gray-700">{activeService.description}</p>

                                {/* Stats */}
                                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-amber-600">{activeService.stats.projects}+</div>
                                        <div className="text-sm text-gray-600">Proyek Selesai</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-amber-600">{activeService.stats.clients}+</div>
                                        <div className="text-sm text-gray-600">Klien Puas</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-amber-600">{activeService.stats.experience}</div>
                                        <div className="text-sm text-gray-600">Tahun Pengalaman</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-amber-600">{activeService.stats.rating}</div>
                                        <div className="text-sm text-gray-600">Rating Klien</div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className="mb-3 text-lg font-semibold text-gray-800">Keunggulan Layanan:</h3>
                                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                        {activeService.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Award className="h-4 w-4 text-amber-600" />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Gallery */}
                            <div className="rounded-2xl bg-white p-8 shadow-lg">
                                <h3 className="mb-6 text-2xl font-bold text-gray-800">Galeri Kegiatan</h3>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    {activeService.gallery.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            whileHover={{ scale: 1.02 }}
                                            className="group cursor-pointer"
                                            onClick={() => setSelectedImage(item.image)}
                                        >
                                            <div className="relative overflow-hidden rounded-xl">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                    <Camera className="h-8 w-8 text-white" />
                                                </div>
                                            </div>
                                            <h4 className="mt-3 font-semibold text-gray-800">{item.title}</h4>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Article */}
                            <div className="rounded-2xl bg-white p-8 shadow-lg">
                                <div className="mb-4 flex items-center gap-2">
                                    <Play className="h-5 w-5 text-amber-600" />
                                    <h3 className="text-2xl font-bold text-gray-800">Artikel Terkini</h3>
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-amber-700">{activeService.article.title}</h4>
                                <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        {activeService.article.author}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(activeService.article.date)}
                                    </span>
                                    <span>{activeService.article.readTime} min read</span>
                                </div>
                                <p className="leading-relaxed text-gray-700">{activeService.article.content}</p>
                            </div>




                            {/* Comments Section */}
                            <div className="rounded-2xl bg-white p-8 shadow-lg">
                                <h3 className="mb-6 text-2xl font-bold text-gray-800">Ulasan & Rating</h3>


<form
    className="mb-8 rounded-lg border border-gray-200 p-4"
    onSubmit={async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !newName.trim()) return;

        // Kirim data ke backend
    await fetch('http://127.0.0.1:8000/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            service: activeMenu,
            name: newName,
            comment: newComment,
            rating: newRating,
        }),
    });
        // Setelah submit, fetch ulang ulasan dari backend (atau bisa langsung push ke state)
        // ...opsional: fetch ulang data ulasan...

        setNewComment('');
        setNewName('');
        setNewRating(5);
    }}
>
    <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Nama</label>
        <input
            type="text"
            className="mt-1 w-full rounded border px-3 py-2"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
        />
    </div>

    <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Ulasan</label>
        <textarea
            className="mt-1 w-full rounded border px-3 py-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
        />
    </div>
    <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        {renderStars(newRating, true, setNewRating)}
    </div>
    <button
        type="submit"
        className="mt-2 rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
    >
        Kirim Ulasan
    </button>
</form>




                               


                                

                                {/* Comments List */}
                                <div className="space-y-4">
                                    {comments[activeMenu].map((comment) => (
                                        <motion.div
                                            key={comment.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="rounded-lg border border-gray-200 p-4"
                                        >
                                            <div className="flex items-start gap-4">
                                                <img src={comment.avatar} alt={comment.name} className="h-10 w-10 rounded-full object-cover" />
                                                <div className="flex-1">
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <h5 className="font-semibold text-gray-800">{comment.name}</h5>
                                                        <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                                                    </div>
                                                    <div className="mb-2">{renderStars(comment.rating)}</div>
                                                    <p className="text-gray-700">{comment.comment}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.img
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        src={selectedImage}
                        alt="Gallery Image"
                        className="max-h-full max-w-full rounded-lg object-contain"
                    />
                </motion.div>
            )}

            {/* Footer */}
            <div className="mt-12">
                <FooterSection />
            </div>
        </PageLayout>
    );
}
