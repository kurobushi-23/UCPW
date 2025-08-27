import { NewsSidebar } from '@/components/dashboard/news/news-sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, News } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Eye, Heart, Share2, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    news: News;
    allNews: News[];
}

export default function NewsDetail({ news, allNews }: Props) {
    const [selectedNews, setSelectedNews] = useState<News>(news);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelola Berita', href: '/dashboard/news' },
        { title: selectedNews.title, href: `/dashboard/news/${selectedNews.id}/detail` },
    ];

    const handleNewsSelect = (newsItem: News) => {
        setSelectedNews(newsItem);
        // Update URL without full page reload
        window.history.pushState({}, '', `/dashboard/news/${newsItem.id}/detail`);
    };

    const handleBack = () => {
        router.get('/dashboard/news');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: selectedNews.title,
                    text: selectedNews.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // fallback: copy link
            navigator.clipboard.writeText(window.location.href);
            toast('Link berhasil disalin!', {
                description: 'Bagikan link ini ke temanmu sekarang.',
                duration: 3000,
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${selectedNews.title} - Detail Berita`} />
            <div className="container mx-auto px-5 py-8">
                <div className="flex gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Back Button */}
                        <Button variant="ghost" onClick={handleBack} className="mb-6 pl-0">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Daftar Berita
                        </Button>

                        <Card className="overflow-hidden">
                            {/* Header Image */}
                            {selectedNews.image && (
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={selectedNews.image.startsWith('http') ? selectedNews.image : `/${selectedNews.image}`}
                                        alt={selectedNews.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-6 left-6">
                                        {selectedNews.category && (
                                            <Badge variant="secondary" className="bg-white/90 text-gray-800">
                                                {selectedNews.category}
                                                {selectedNews.subcategory && ` - ${selectedNews.subcategory}`}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}

                            <CardHeader className="pb-4">
                                <CardTitle className="text-3xl leading-tight font-bold">{selectedNews.title}</CardTitle>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-6 border-t pt-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span className="font-medium">{selectedNews.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(selectedNews.date)}</span>
                                    </div>
                                    {/* {selectedNews.readTime && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{selectedNews.readTime} menit baca</span>
                                        </div>
                                    )} */}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        <span>{selectedNews.views.toLocaleString()} views</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Heart className="h-4 w-4" />
                                        <span>{selectedNews.likes.toLocaleString()} likes</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleShare}
                                        className="h-auto p-0 font-normal text-gray-600 hover:text-blue-600"
                                    >
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Bagikan
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent>
                                {/* Content */}
                                <div className="prose prose-gray max-w-none">
                                    <div className="text-lg leading-relaxed whitespace-pre-wrap">{selectedNews.description}</div>
                                </div>

                                {/* Additional Actions */}
                                <div className="mt-8 border-t pt-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">ID Berita: #{selectedNews.id}</div>
                                        {/* <div className="flex gap-3">
                                            <Button variant="outline" size="sm" onClick={() => router.get(`/dashboard/news/${selectedNews.id}/edit`)}>
                                                Edit Berita
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => window.open(`/news/${selectedNews.id}`, '_blank')}>
                                                <BookOpen className="mr-2 h-4 w-4" />
                                                Lihat di Frontend
                                            </Button>
                                        </div> */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="sticky top-20 right-0 hidden w-80 lg:block">
                        <NewsSidebar allNews={allNews} currentNewsId={selectedNews.id} onNewsSelect={handleNewsSelect} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
