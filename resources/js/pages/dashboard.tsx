import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BarChart3, Building2, Camera, ChevronUp, MessageSquareText, Star, UserCheck, Users } from 'lucide-react';

interface ServiceStats {
    reviews: number;
    users: number;
}

interface DashboardSummary {
    reviews: {
        total: number;
        average_rating: number;
        total_users: number;
        recent_change: number;
    };
    testimonials: {
        total: number;
        featured: number;
        total_users: number;
        recent_change: number;
    };
    galleries: {
        total: number;
        categories: {
            [key: string]: number;
        };
        recent_change: number;
    };
    services: {
        konstruksi: ServiceStats;
        kontraktor: ServiceStats;
        'alat-berat': ServiceStats;
    };
}

interface Props {
    summary: DashboardSummary;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

const defaultSummary: DashboardSummary = {
    reviews: {
        total: 0,
        average_rating: 0,
        total_users: 0,
        recent_change: 0,
    },
    testimonials: {
        total: 0,
        featured: 0,
        total_users: 0,
        recent_change: 0,
    },
    galleries: {
        total: 0,
        categories: {},
        recent_change: 0,
    },
    services: {
        konstruksi: {
            reviews: 0,
            users: 0,
        },
        kontraktor: {
            reviews: 0,
            users: 0,
        },
        'alat-berat': {
            reviews: 0,
            users: 0,
        },
    },
};

export default function Dashboard({ summary = defaultSummary }: Props) {
    const statsCards = [
        {
            title: 'Review & Rating',
            icon: <MessageSquareText className="h-6 w-6" />,
            iconBg: 'bg-blue-100 text-blue-600',
            stats: [
                {
                    label: 'Total Review',
                    value: summary.reviews.total,
                    change: summary.reviews.recent_change,
                },
                {
                    label: 'Rating Rata-rata',
                    value: summary.reviews.average_rating.toFixed(1),
                    suffix: '/ 5.0',
                },
                {
                    label: 'Total Pengguna',
                    value: summary.reviews.total_users,
                },
            ],
            link: '/dashboard/reviews',
            bgGradient: 'from-blue-50 to-blue-100 hover:to-blue-200',
        },
        {
            title: 'Testimonial',
            icon: <Star className="h-6 w-6" />,
            iconBg: 'bg-amber-100 text-amber-600',
            stats: [
                {
                    label: 'Total Testimonial',
                    value: summary.testimonials.total,
                    change: summary.testimonials.recent_change,
                },
                {
                    label: 'Featured',
                    value: summary.testimonials.featured,
                },
                {
                    label: 'Total Pengguna',
                    value: summary.testimonials.total_users,
                },
            ],
            link: '/dashboard/testimonials',
            bgGradient: 'from-amber-50 to-amber-100 hover:to-amber-200',
        },
        {
            title: 'Gallery',
            icon: <Camera className="h-6 w-6" />,
            iconBg: 'bg-green-100 text-green-600',
            stats: [
                {
                    label: 'Total Konten',
                    value: summary.galleries.total,
                    change: summary.galleries.recent_change,
                },
                {
                    label: 'Kategori',
                    value: Object.keys(summary.galleries.categories).length,
                },
            ],
            link: '/dashboard/galleries',
            bgGradient: 'from-green-50 to-green-100 hover:to-green-200',
        },
    ];

    const serviceStats = [
        {
            name: 'Konstruksi',
            icon: <Building2 className="h-5 w-5" />,
            iconBg: 'bg-purple-100 text-purple-600',
            reviews: summary.services?.konstruksi?.reviews || 0,
            users: summary.services?.konstruksi?.users || 0,
            bgGradient: 'from-purple-50 to-purple-100',
        },
        {
            name: 'Kontraktor & Supplier',
            icon: <Users className="h-5 w-5" />,
            iconBg: 'bg-indigo-100 text-indigo-600',
            reviews: summary.services?.kontraktor?.reviews || 0,
            users: summary.services?.kontraktor?.users || 0,
            bgGradient: 'from-indigo-50 to-indigo-100',
        },
        {
            name: 'Alat Berat',
            icon: <BarChart3 className="h-5 w-5" />,
            iconBg: 'bg-rose-100 text-rose-600',
            reviews: summary.services?.['alat-berat']?.reviews || 0,
            users: summary.services?.['alat-berat']?.users || 0,
            bgGradient: 'from-rose-50 to-rose-100',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard Overview</h1>
                    <p className="mt-2 text-gray-600">Ringkasan statistik dan performa dari semua layanan</p>
                </div>

                {/* Main Stats Grid */}
                <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {statsCards.map((card, index) => (
                        <Link key={card.title} href={card.link} className="block transform transition-all duration-200 hover:scale-[1.02]">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Card className={`bg-gradient-to-br ${card.bgGradient} h-full transition-all duration-200 lg:h-62`}>
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center justify-between">
                                            <div className={`rounded-lg ${card.iconBg} p-2`}>{card.icon}</div>
                                            <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {card.stats.map((stat) => (
                                                <div key={stat.label} className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl font-bold">
                                                            {stat.value}
                                                            {stat.suffix}
                                                        </span>
                                                        {stat.change && (
                                                            <div
                                                                className={`flex items-center ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}
                                                            >
                                                                <ChevronUp className={`h-4 w-4 ${stat.change < 0 ? 'rotate-180 transform' : ''}`} />
                                                                <span className="text-sm">{Math.abs(stat.change)}%</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Service Stats */}
                <div className="mb-6">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Statistik per Layanan</h2>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {serviceStats.map((service, index) => (
                            <motion.div
                                key={service.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                            >
                                <Card className={`bg-gradient-to-br ${service.bgGradient} min-h-[180px]`}>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <div className={`rounded-lg ${service.iconBg} p-2`}>{service.icon}</div>
                                            <CardTitle className="text-base font-medium">{service.name}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mt-1 grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-sm text-gray-600">Reviews</p>
                                                <p className="text-xl font-bold">{service.reviews}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Pengguna</p>
                                                <div className="flex items-center gap-1">
                                                    <UserCheck className="h-4 w-4 text-gray-500" />
                                                    <p className="text-xl font-bold">{service.users}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
