import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Gallery } from '@/types';
import { Calendar, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface GallerySidebarProps {
    allGallery: Gallery[];
    currentGalleryId: number;
    onGallerySelect: (galleries: Gallery) => void;
}

export function GallerySidebar({ allGallery, currentGalleryId, onGallerySelect }: GallerySidebarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Filter and search functionality
    const filteredGallery = useMemo(() => {
        let filtered = (allGallery ?? []).filter((galleries) => galleries.id !== currentGalleryId);

        if (searchQuery) {
            filtered = filtered.filter(
                (galleries) =>
                    galleries.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    galleries.description.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((galleries) => galleries.category === selectedCategory);
        }

        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [allGallery, currentGalleryId, searchQuery, selectedCategory]);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set(allGallery.map((galleries) => galleries.category).filter(Boolean));
        return Array.from(cats);
    }, [allGallery]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="space-y-6">
            {/* Search */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Cari Konten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Cari judul, penulis, atau konten..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Kategori</label>
                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                className="cursor-pointer"
                                onClick={() => setSelectedCategory('all')}
                            >
                                Semua
                            </Badge>
                            {categories.map(
                                (category) =>
                                    category && (
                                        <Badge
                                            key={category}
                                            variant={selectedCategory === category ? 'default' : 'outline'}
                                            className="cursor-pointer"
                                            onClick={() => setSelectedCategory(category as string)}
                                        >
                                            {category}
                                        </Badge>
                                    ),
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Statistik</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Total Konten</span>
                        <span className="font-medium">{allGallery.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Kategori</span>
                        <span className="font-medium">{categories.length}</span>
                    </div>
                </CardContent>
            </Card>

            {/* News List */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Gallery Lainnya ({filteredGallery.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-96">
                        <div className="space-y-1 p-6 pt-0">
                            {filteredGallery.length === 0 ? (
                                <div className="py-8 text-center text-gray-500">
                                    <Search className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                    <p className="text-sm">Tidak ada konten ditemukan</p>
                                </div>
                            ) : (
                                filteredGallery.map((gallery) => (
                                    <div
                                        key={gallery.id}
                                        onClick={() => onGallerySelect(gallery)}
                                        className="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-gray-50"
                                    >
                                        <div className="flex gap-3">
                                            {gallery.image && (
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={gallery.image.startsWith('http') ? gallery.image : `/${gallery.image}`}
                                                        alt={gallery.caption}
                                                        className="h-12 w-16 rounded object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-sm leading-tight font-medium text-gray-900 transition-colors group-hover:text-blue-600">
                                                    {truncateText(gallery.caption, 60)}
                                                </h4>
                                                <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{formatDate(gallery.date)}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                                                    {gallery.category && (
                                                        <Badge variant="outline" className="px-2 py-0 text-xs">
                                                            {gallery.category}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
