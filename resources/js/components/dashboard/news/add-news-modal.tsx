import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

interface AddNewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormData {
    title: string;
    description: string;
    image: File | null;
    date: string;
    author: string;
    category: string;
    subcategory: string;
    readTime: string;
}

export function AddNewsModal({ isOpen, onClose, onSuccess }: AddNewsModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        image: null,
        date: new Date().toISOString().split('T')[0],
        author: '',
        category: '',
        subcategory: '',
        readTime: '0',
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
            data.append('title', formData.title);
            data.append('description', formData.description);
            if (formData.image) {
                data.append('image', formData.image);
            }
            data.append('date', formData.date);
            data.append('author', formData.author);
            data.append('category', formData.category);
            data.append('subcategory', formData.subcategory);
            data.append('readTime', formData.readTime);
            data.append('likes', '0');
            data.append('views', '0');

            router.post('/dashboard/news', data, {
                forceFormData: true,
                onSuccess: () => {
                    // Reset form
                    setFormData({
                        title: '',
                        description: '',
                        image: null,
                        date: new Date().toISOString().split('T')[0],
                        author: '',
                        category: '',
                        subcategory: '',
                        readTime: '0',
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
                        Tambah Berita Baru
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Berita *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Masukkan judul berita"
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

                        {/* Author & Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="author">Penulis *</Label>
                                <Input
                                    id="author"
                                    value={formData.author}
                                    onChange={(e) => handleInputChange('author', e.target.value)}
                                    placeholder="Nama penulis"
                                    required
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

                        {/* Category & Subcategory */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Kategori */}
                            <div className="space-y-2">
                                <Label htmlFor="category">Kategori</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => handleInputChange('category', value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="utama">Utama</SelectItem>
                                        <SelectItem value="lainnya">Lainnya</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sub Kategori */}
                            <div className="space-y-2">
                                <Label htmlFor="subcategory">Sub Kategori</Label>
                                <Input
                                    id="subcategory"
                                    value={formData.subcategory}
                                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                                    placeholder="Sub kategori berita"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Read Time */}
                        <div className="hidden space-y-2">
                            <Label htmlFor="readTime">Waktu Baca (menit)</Label>
                            <Input
                                id="readTime"
                                type="hidden"
                                value={formData.readTime}
                                onChange={(e) => handleInputChange('readTime', e.target.value)}
                                placeholder="5"
                                min="1"
                                disabled={isLoading}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t pt-4">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Simpan Berita
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
