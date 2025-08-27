/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddNewsModal } from '@/components/dashboard/news/add-news-modal';
import { EditNewsModal } from '@/components/dashboard/news/edit-news-modal';
import { NewsCard } from '@/components/dashboard/news/news-card';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomPagination } from '@/components/ui/custom-pagination';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, News, Pagination as PaginationType } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Calendar, Eye, Heart, Loader2, Plus, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    news: News[];
    pagination: PaginationType;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Berita', href: '/dashboard/news' }];

export default function Index({ news, pagination }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState<News | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleCreate = () => {
        setShowAddModal(true);
    };

    const handleEdit = (newsItem: News) => {
        setSelectedNews(newsItem);
        setShowEditModal(true);
    };

    const handleDeleteClick = (newsItem: News) => {
        setSelectedNews(newsItem);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedNews) return;

        setDeleteLoading(true);
        setDeletingId(selectedNews.id);

        try {
            router.delete(`/dashboard/news/${selectedNews.id}`, {
                onSuccess: () => {
                    // Reset state
                    setShowDeleteModal(false);
                    setSelectedNews(null);
                    setDeletingId(null);

                    toast('Berita berhasil dihapus');
                },
                onError: (errors) => {
                    // console.error('Error deleting news:', errors);
                    toast('Gagal menghapus berita');
                },
                onFinish: () => {
                    setDeleteLoading(false);
                },
            });
        } catch (error) {
            // console.error('Error deleting news:', error);
            toast('Gagal menghapus berita');
            setDeleteLoading(false);
            setDeletingId(null);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setSelectedNews(null);
        setDeleteLoading(false);
    };

    const handleViewDetail = (id: number) => {
        router.get(`/dashboard/news/${id}/detail`);
    };

    const handleNewsAdded = () => {
        setShowAddModal(false);
        window.location.reload();
    };

    const handleNewsUpdated = () => {
        setShowEditModal(false);
        setSelectedNews(null);
        window.location.reload();
    };

    // Fungsi untuk navigasi pagination
    const handlePageChange = (page: number) => {
        router.get(`/dashboard/news?page=${page}`);
    };

    // Hitung statistik
    const totalViews = news.reduce((acc, item) => acc + item.views, 0);
    const totalLikes = news.reduce((acc, item) => acc + item.likes, 0);
    const uniqueAuthors = new Set(news.map((item) => item.author)).size;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Berita" />
            <div className="container mx-auto px-5 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Kelola Berita</h1>
                        <p className="mt-1 text-gray-600">Kelola dan pantau semua berita yang telah dibuat</p>
                    </div>
                    <Button onClick={handleCreate} disabled={isLoading} size="lg">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Berita
                    </Button>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-blue-100 p-2">
                                    <Calendar className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Berita</p>
                                    <p className="text-2xl font-bold text-gray-900">{pagination.total.toLocaleString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-green-100 p-2">
                                    <Eye className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-red-100 p-2">
                                    <Heart className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Likes</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalLikes.toLocaleString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-purple-100 p-2">
                                    <User className="h-6 w-6 text-purple-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Penulis</p>
                                    <p className="text-2xl font-bold text-gray-900">{uniqueAuthors}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* News Grid */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl">Daftar Berita</CardTitle>
                        <div className="text-sm text-gray-600">
                            Menampilkan {pagination.from} - {pagination.to} dari {pagination.total} berita
                        </div>
                    </CardHeader>
                    <CardContent>
                        {news.length === 0 ? (
                            <div className="py-12 text-center">
                                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada berita</h3>
                                <p className="mt-1 text-sm text-gray-500">Mulai dengan menambahkan berita pertama Anda.</p>
                                <div className="mt-6">
                                    <Button onClick={handleCreate} disabled={isLoading}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Berita
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-6 border-0 md:grid-cols-2 lg:grid-cols-4">
                                    {news.map((item) => (
                                        <NewsCard
                                            key={item.id}
                                            news={item}
                                            onEdit={() => handleEdit(item)}
                                            onDelete={() => handleDeleteClick(item)}
                                            onViewDetail={() => handleViewDetail(item.id)}
                                            isLoading={isLoading || (deleteLoading && deletingId === item.id)}
                                        />
                                    ))}
                                </div>

                                <CustomPagination
                                    currentPage={pagination.current_page}
                                    lastPage={pagination.last_page}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Modals */}
            <AddNewsModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSuccess={handleNewsAdded} />

            {selectedNews && (
                <EditNewsModal
                    isOpen={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedNews(null);
                    }}
                    onSuccess={handleNewsUpdated}
                    news={selectedNews}
                />
            )}

            {/* Delete Confirmation Modal */}
            <AlertDialog open={showDeleteModal} onOpenChange={(open) => !open && handleDeleteCancel()}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-destructive" />
                            Hapus Berita
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base">
                            {selectedNews && (
                                <>
                                    Apakah Anda yakin ingin menghapus berita{' '}
                                    <span className="font-semibold text-foreground">"{selectedNews.title}"</span>? Tindakan ini tidak dapat
                                    dibatalkan.
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteLoading}>Batal</AlertDialogCancel>
                        <Button variant="destructive" onClick={handleDeleteConfirm} disabled={deleteLoading} className="gap-2">
                            {deleteLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                            {deleteLoading ? 'Menghapus...' : 'Hapus'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
