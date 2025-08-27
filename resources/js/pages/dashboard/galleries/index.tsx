/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddGalleryModal } from '@/components/dashboard/galleries/add-gallery-modal';
import { EditGalleryModal } from '@/components/dashboard/galleries/edit-gallery-modal';
import { GalleryCard } from '@/components/dashboard/galleries/gallery-card';
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
import { BreadcrumbItem, Gallery, Pagination as PaginationType } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Calendar, Loader2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    galleries: Gallery[];
    pagination: PaginationType;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gallery', href: '/dashboard/galleries' }];

export default function Index({ galleries, pagination }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleCreate = () => {
        setShowAddModal(true);
    };

    const handleEdit = (galleryItem: Gallery) => {
        setSelectedGallery(galleryItem);
        setShowEditModal(true);
    };

    const handleDeleteClick = (galleryItem: Gallery) => {
        setSelectedGallery(galleryItem);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedGallery) return;

        setIsLoading(true);
        setDeletingId(selectedGallery.id);

        try {
            router.delete(`/dashboard/galleries/${selectedGallery.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedGallery(null);
                    setDeletingId(null);

                    toast('Konten berhasil dihapus');
                },
                onError: (errors) => {
                    // console.error('Error deleting gallery:', errors);
                    toast('Gagal menghapus konten');
                },
                onFinish: () => {
                    setDeleteLoading(false);
                },
            });
        } catch (error) {
            // console.error('Error deleting gallery:', error);
            toast('Gagal menghapus konten');
            setDeleteLoading(false);
            setDeletingId(null);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setSelectedGallery(null);
        setDeleteLoading(false);
    };

    const handleViewDetail = (id: number) => {
        router.get(`/dashboard/galleries/${id}/detail`);
    };

    const handleGalleryAdded = () => {
        setShowAddModal(false);
        window.location.reload();
    };

    const handleGalleryUpdated = () => {
        setShowEditModal(false);
        setSelectedGallery(null);
        window.location.reload();
    };

    // Fungsi untuk navigasi pagination
    const handlePageChange = (page: number) => {
        router.get(`/dashboard/gallery?page=${page}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Berita" />
            <div className="container mx-auto px-5 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Kelola Gallery</h1>
                        <p className="mt-1 text-gray-600">Kelola dan pantau semua gallery yang telah dibuat</p>
                    </div>
                    <Button onClick={handleCreate} disabled={isLoading} size="lg">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Konten
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
                                    <p className="text-sm font-medium text-gray-600">Total konten</p>
                                    <p className="text-2xl font-bold text-gray-900">{pagination.total.toLocaleString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-green-100 p-2">
                                    <Eye className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {gallery.reduce((acc, item) => acc + item.views, 0).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}

                    {/* <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-red-100 p-2">
                                    <Heart className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Likes</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {gallery.reduce((acc, item) => acc + item.likes, 0).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}

                    {/* <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-purple-100 p-2">
                                    <User className="h-6 w-6 text-purple-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Penulis</p>
                                    <p className="text-2xl font-bold text-gray-900">{new Set(gallery.map((item) => item.author)).size}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}
                </div>

                {/* gallery Grid */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl">Daftar Gallery</CardTitle>
                        <div className="text-sm text-gray-600">
                            Menampilkan {pagination.from} - {pagination.to} dari {pagination.total} konten
                        </div>
                    </CardHeader>
                    <CardContent>
                        {galleries.length === 0 ? (
                            <div className="py-12 text-center">
                                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada konten</h3>
                                <p className="mt-1 text-sm text-gray-500">Mulai dengan menambahkan konten pertama Anda.</p>
                                <div className="mt-6">
                                    <Button onClick={handleCreate} disabled={isLoading}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Konten
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-6 border-0 md:grid-cols-2 lg:grid-cols-4">
                                    {galleries.map((item) => (
                                        <GalleryCard
                                            key={item.id}
                                            gallery={item}
                                            onEdit={() => handleEdit(item)}
                                            onDelete={() => handleDeleteClick(item)}
                                            onViewDetail={() => handleViewDetail(item.id)}
                                            isLoading={isLoading}
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
            <AddGalleryModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSuccess={handleGalleryAdded} />

            {selectedGallery && (
                <EditGalleryModal
                    isOpen={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedGallery(null);
                    }}
                    onSuccess={handleGalleryUpdated}
                    gallery={selectedGallery}
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
                            {selectedGallery && (
                                <>
                                    Apakah Anda yakin ingin menghapus berita{' '}
                                    <span className="font-semibold text-foreground">"{selectedGallery.caption}"</span>? Tindakan ini tidak dapat
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
