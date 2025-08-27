import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Testimonial } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    testimonials: {
        data: Testimonial[];
        current_page: number;
        per_page: number;
        last_page: number;
        total: number;
    };
}

export default function TestimonialsList({ testimonials }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelola Testimonial', href: '/dashboard/testimonials' },
    ];

    const handleDelete = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus testimonial ini?')) {
            return;
        }

        setIsDeleting(true);
        try {
            await router.delete(`/dashboard/testimonials/${id}`, {
                onSuccess: () => {
                    toast.success('Testimonial berhasil dihapus');
                },
                onError: (errors) => {
                    toast.error(errors.message || 'Gagal menghapus testimonial');
                },
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Terjadi kesalahan saat menghapus testimonial');
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Testimonial" />

            <div className="container mx-auto p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Testimonial</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">No.</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Message</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead className="w-24">Status</TableHead>
                                        <TableHead className="w-24 text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {testimonials.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center">
                                                Tidak ada data testimonial
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        testimonials.data.map((testimonial, index) => (
                                            <TableRow key={testimonial.id}>
                                                <TableCell>{(testimonials.current_page - 1) * testimonials.per_page + index + 1}</TableCell>
                                                <TableCell>{testimonial.user?.name}</TableCell>
                                                <TableCell>{testimonial.user?.email}</TableCell>
                                                <TableCell className="max-w-xs truncate">{testimonial.message}</TableCell>
                                                <TableCell>{testimonial.rating} / 5</TableCell>
                                                <TableCell>{formatDate(testimonial.created_at || '')}</TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                            testimonial.is_featured ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                    >
                                                        {testimonial.is_featured ? 'Featured' : 'Regular'}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        disabled={isDeleting}
                                                        onClick={() => handleDelete(testimonial.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Info */}
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                            <div>
                                Menampilkan {testimonials.data.length} dari {testimonials.total} testimonial
                            </div>
                            <div>
                                Halaman {testimonials.current_page} dari {testimonials.last_page}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
