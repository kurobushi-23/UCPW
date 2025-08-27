import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { News } from '@/types';
import { usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, Eye, Heart, Pencil, Trash2, User } from 'lucide-react';

interface NewsCardProps {
    news: News;
    onEdit?: () => void;
    onDelete?: () => void;
    onViewDetail?: () => void;
    isLoading: boolean;
}

interface PageProps {
    user?: {
        role: string;
    };
    [key: string]: unknown;
}

export function NewsCard({ news, onEdit, onDelete, onViewDetail, isLoading }: NewsCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const { props } = usePage<PageProps>();
    const userRole = props.user?.role;

    return (
        <Card className="group flex flex-col justify-between border-0 shadow-md transition-all duration-200 hover:shadow-lg">
            {/* Image */}
            {news.image && (
                <div className="relative overflow-hidden rounded-t-lg">
                    <img
                        src={news.image.startsWith('http') ? news.image : `/${news.image}`}
                        alt={news.title}
                        className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                        {news.category && (
                            <Badge variant="secondary" className="bg-white/90 text-gray-800">
                                {news.category}
                            </Badge>
                        )}
                    </div>
                </div>
            )}

            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-lg leading-tight font-semibold transition-colors group-hover:text-blue-600">{news.title}</h3>
                </div>
            </CardHeader>

            <CardContent className="pb-4">
                <p className="mb-4 line-clamp-3 text-sm text-gray-600">{news.description}</p>

                {/* Metadata */}
                <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center justify-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(news.date)}</span>
                        </div>
                    </div>

                    <div className="flex h-full items-center gap-1 text-xs text-gray-500">
                        <User className="h-3 w-3" />
                        <span>{news.author}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{news.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{news.likes.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2 pt-0">
                <Button variant="ghost" size="sm" onClick={onViewDetail} disabled={isLoading} className="flex-1 justify-start">
                    <ArrowRight className="mr-1 h-4 w-4" />
                    lihat selengkapnya
                </Button>

                {/* Hanya tampil kalau admin */}
                {userRole === 'admin' && (
                    <>
                        <Button variant="ghost" size="sm" onClick={onEdit} disabled={isLoading} className="hover:bg-blue-50 hover:text-blue-600">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={onDelete} disabled={isLoading} className="hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
