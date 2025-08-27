import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

interface AddGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormData {
    caption: string;
    description: string;
    image: File | null;
    date: string;
    category: string;
}

export function AddGalleryModal({ isOpen, onClose, onSuccess }: AddGalleryModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        caption: '',
        description: '',
        image: null,
        date: new Date().toISOString().split('T')[0],
        category: '',
    });

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
            if (formData.image) {
                data.append('image', formData.image);
            }
            data.append('date', formData.date);
            data.append('category', formData.category);
            router.post('/dashboard/galleries', data, {
                forceFormData: true,
                onSuccess: () => {
                    // Reset form
                    setFormData({
                        caption: '',
                        description: '',
                        image: null,
                        date: new Date().toISOString().split('T')[0],
                        category: '',
                    });
                    onSuccess();
                },
                onError: (errors) => {
                    console.error('Error creating news:', errors);
                    alert('Gagal menyimpan berita: ' + Object.values(errors).flat().join('\n'));
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        } catch (error) {
            console.error('Error creating news:', error);
            alert('Gagal menyimpan berita');
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
                        <Plus className="h-5 w-5" />
                        Tambah Konten Baru
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Konten *</Label>
                            <Input
                                id="title"
                                value={formData.caption}
                                onChange={(e) => handleInputChange('caption', e.target.value)}
                                placeholder="Masukkan judul gallery"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi *</Label>
                            <Textarea
                                id="description"
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
                            <Label htmlFor="image">URL Gambar</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleInputChange('image', e.target.files?.[0] || null)}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Category & Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Kategori</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    placeholder="Kategori berita"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Tanggal *</Label>
                                <Input
                                    id="date"
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
                            Simpan Konten
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
