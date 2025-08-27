import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Gallery } from '@/types';
import { router } from '@inertiajs/react';
import { Loader2, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EditGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    gallery: Gallery;
}

interface FormData {
    caption: string;
    description: string;
    image: File | null;
    date: string;
    category: string;
}

export function EditGalleryModal({ isOpen, onClose, onSuccess, gallery }: EditGalleryModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        caption: '',
        description: '',
        image: null,
        date: '',

        category: '',
    });

    useEffect(() => {
        if (gallery) {
            setFormData({
                caption: gallery.caption || '',
                description: gallery.description || '',
                image: null,
                date: gallery.date ? gallery.date.split('T')[0] : '',
                category: gallery.category || '',
            });
        }
    }, [gallery]);

    const handleInputChange = (field: keyof FormData, value: string | File | null) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = new FormData();
            data.append('caption', formData.caption);
            data.append('description', formData.description);
            data.append('date', formData.date);
            data.append('category', formData.category);

            if (formData.image) {
                data.append('image', formData.image);
            }

            // ini kuncinya ➝ Laravel akan baca sebagai PUT
            data.append('_method', 'PUT');

            router.post(`/dashboard/galleries/${gallery.id}`, data, {
                forceFormData: true,
                onSuccess: () => {
                    onSuccess();
                },
                onError: (errors) => {
                    console.error('Error updating galleries:', errors);
                    alert('Gagal mengupdate gallery: ' + Object.values(errors).flat().join(''));
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        } catch (error) {
            console.error('Error updating galleries:', error);
            alert('Gagal mengupdate gallery');
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Pencil className="h-5 w-5" />
                        Edit Gallery
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-title">Judul Berita *</Label>
                            <Input
                                id="edit-title"
                                value={formData.caption}
                                onChange={(e) => handleInputChange('caption', e.target.value)}
                                placeholder="Masukkan judul gallery"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-description">Deskripsi *</Label>
                            <Textarea
                                id="edit-description"
                                className="h-24 md:h-52"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Masukkan deskripsi berita"
                                rows={4}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Image URL */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-image">URL Gambar</Label>
                            {gallery.image && (
                                <img
                                    src={gallery.image.startsWith('http') ? gallery.image : `/${gallery.image}`}
                                    alt={gallery.caption}
                                    className="mb-2 h-32 w-full rounded object-cover"
                                />
                            )}

                            <Input
                                id="edit-image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleInputChange('image', e.target.files?.[0] || null)}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Category & Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-category">Kategori</Label>
                                <Input
                                    id="edit-category"
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    placeholder="Kategori berita"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-date">Tanggal *</Label>
                                <Input
                                    id="edit-date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t pt-4">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Gallery
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
