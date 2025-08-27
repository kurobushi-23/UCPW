import { GallerySidebar } from '@/components/dashboard/galleries/gallery-sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Gallery } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    gallery: Gallery;
    allGalleries: Gallery[];
}

export default function GalleryDetail({ gallery, allGalleries }: Props) {
    const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(gallery || null);

    // If no gallery data, show loading or error state
    if (!selectedGallery) {
        return (
            <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
                <div className="container mx-auto px-5 py-8">
                    <Card>
                        <CardContent className="p-8 text-center">
                            <p className="text-gray-600">Gallery tidak ditemukan.</p>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelola Gallery', href: '/dashboard/galleries' },
        { title: selectedGallery.caption, href: `/dashboard/galleries/${selectedGallery.id}/detail` },
    ];

    const handleGallerySelect = (galleryItem: Gallery) => {
        setSelectedGallery(galleryItem);
        // Update URL without full page reload
        window.history.pushState({}, '', `/dashboard/galleries/${galleryItem.id}/detail`);
    };

    const handleBack = () => {
        router.get('/dashboard/galleries');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: selectedGallery.caption,
                    text: selectedGallery.description,
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
            <Head title={`${selectedGallery.caption} - Detail Konten`} />
            <div className="container mx-auto px-5 py-8">
                <div className="flex gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Back Button */}
                        <Button variant="ghost" onClick={handleBack} className="mb-6 pl-0">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Daftar Gallery
                        </Button>

                        <Card className="overflow-hidden">
                            {/* Header Image */}
                            {selectedGallery.image && (
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={selectedGallery.image.startsWith('http') ? selectedGallery.image : `/${selectedGallery.image}`}
                                        alt={selectedGallery.caption}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-6 left-6">
                                        {selectedGallery.category && (
                                            <Badge variant="secondary" className="bg-white/90 text-gray-800">
                                                {selectedGallery.category}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}

                            <CardHeader className="pb-4">
                                <CardTitle className="text-3xl leading-tight font-bold">{selectedGallery.caption}</CardTitle>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-6 border-t pt-4 text-sm text-gray-600">
                                    {/* <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span className="font-medium">{selectedGallery.author}</span>
                                    </div> */}
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(selectedGallery.date)}</span>
                                    </div>
                                    {/* {selectedGallery.readTime && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{selectedGallery.readTime} menit baca</span>
                                        </div>
                                    )} */}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6 text-sm text-gray-600">
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
                                    <div className="text-lg leading-relaxed whitespace-pre-wrap">{selectedGallery.description}</div>
                                </div>

                                {/* Additional Actions */}
                                <div className="mt-8 border-t pt-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">ID Konten: #{selectedGallery.id}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="sticky top-20 right-0 hidden w-80 lg:block">
                        <GallerySidebar allGallery={allGalleries} currentGalleryId={selectedGallery.id} onGallerySelect={handleGallerySelect} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
