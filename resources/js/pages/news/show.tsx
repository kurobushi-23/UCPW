import { PageLayout } from '@/components/page-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { News } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Eye, Heart, Share2, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    news: News;
    isLiked: boolean;
    relatedNews: News[];
}

export default function NewsShow({ news, isLiked: initialIsLiked, relatedNews }: Props) {
    const [currentNews, setCurrentNews] = useState(news);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likeCount, setLikeCount] = useState(news.likes);

    const handleLike = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/news/${currentNews.id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'include', // Penting untuk mengirim cookies
            });

            if (response.ok) {
                const data = await response.json();
                setIsLiked(data.liked);
                setLikeCount(data.likeCount);
                setCurrentNews((prev) => ({ ...prev, likes: data.likeCount }));
            } else if (response.status === 401) {
                toast.error('Silakan login untuk menyukai berita');
            } else {
                toast.error('Terjadi kesalahan saat menyukai berita');
            }
        } catch (error) {
            console.error('Error liking news:', error);
            toast.error('Terjadi kesalahan saat menyukai berita');
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: currentNews.title,
                    text: currentNews.description,
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

    const formatReadTime = (minutes: number) => {
        return `${minutes} menit baca`;
    };

    return (
        <PageLayout>
            <Head title={`${currentNews.title} - Berita`} />

            <div className="relative mx-auto mt-24 w-full max-w-6xl px-4 py-8 font-montserrat">
                {/* Back Button */}
                <Button variant="ghost" onClick={() => router.get('/news')} className="mb-6 pl-0 text-amber-600 hover:text-amber-700">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Berita
                </Button>

                <Card className="overflow-hidden shadow-xl">
                    {/* Header Image */}
                    {currentNews.image && (
                        <div className="relative h-96 overflow-hidden">
                            <img
                                src={currentNews.image.startsWith('http') ? currentNews.image : `/${currentNews.image}`}
                                alt={currentNews.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute top-6 left-6">
                                {currentNews.category && (
                                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                                        {currentNews.category}
                                        {currentNews.subcategory && ` - ${currentNews.subcategory}`}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}

                    <CardHeader className="pb-4">
                        <CardTitle className="text-3xl leading-tight font-bold text-gray-900">{currentNews.title}</CardTitle>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-6 border-t pt-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span className="font-medium">{currentNews.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(currentNews.date)}</span>
                            </div>
                            {currentNews.readTime && (
                                <div className="flex items-center gap-2">
                                    <span>{formatReadTime(currentNews.readTime)}</span>
                                </div>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                <span>{currentNews.views.toLocaleString()} views</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLike}
                                className={`h-auto gap-2 p-0 font-normal ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                            >
                                <Heart className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
                                <span>{likeCount.toLocaleString()} likes</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleShare}
                                className="h-auto gap-2 p-0 font-normal text-gray-600 hover:text-blue-600"
                            >
                                <Share2 className="h-4 w-4" />
                                Bagikan
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* Content */}
                        <div className="prose prose-lg max-w-none">
                            <div className="text-lg leading-relaxed whitespace-pre-wrap text-gray-700">{currentNews.description}</div>
                        </div>

                        {/* Related News */}
                        {relatedNews.length > 0 && (
                            <div className="mt-12 border-t pt-8">
                                <h3 className="mb-6 text-2xl font-bold text-gray-900">Berita Terkait</h3>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {relatedNews.map((related) => (
                                        <Card key={related.id} className="cursor-pointer transition-shadow hover:shadow-lg">
                                            <div className="h-48 overflow-hidden">
                                                <img
                                                    src={related.image?.startsWith('http') ? related.image : `/${related.image}`}
                                                    alt={related.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <CardContent className="p-4">
                                                <h4 className="mb-2 line-clamp-2 font-semibold text-gray-900">{related.title}</h4>
                                                <p className="mb-3 line-clamp-3 text-sm text-gray-600">{related.description}</p>
                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <span>{formatDate(related.date)}</span>
                                                    <Button
                                                        variant="link"
                                                        className="h-auto p-0 text-amber-600"
                                                        onClick={() => router.get(`/news/${related.id}`)}
                                                    >
                                                        Baca selengkapnya
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </PageLayout>
    );
}
