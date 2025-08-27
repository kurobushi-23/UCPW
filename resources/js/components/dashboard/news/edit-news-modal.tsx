import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { News } from '@/types';
import { router } from '@inertiajs/react';
import { Loader2, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EditNewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    news: News;
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

export function EditNewsModal({ isOpen, onClose, onSuccess, news }: EditNewsModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        image: null,
        date: '',
        author: '',
        category: '',
        subcategory: '',
        readTime: '',
    });

    // Initialize form data when news prop changes
    useEffect(() => {
        if (news) {
            setFormData({
                title: news.title || '',
                description: news.description || '',
                image: null,
                date: news.date ? news.date.split('T')[0] : '',
                author: news.author || '',
                category: news.category || '',
                subcategory: news.subcategory || '',
                readTime: news.readTime ? news.readTime.toString() : '',
            });
        }
    }, [news]);

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
            data.append('date', formData.date);
            data.append('author', formData.author);
            data.append('category', formData.category);
            data.append('subcategory', formData.subcategory);
            data.append('readTime', formData.readTime || '0');
            data.append('likes', news.likes.toString());
            data.append('views', news.views.toString());

            if (formData.image) {
                data.append('image', formData.image);
            }

            // ini kuncinya ➝ Laravel akan baca sebagai PUT
            data.append('_method', 'PUT');

            router.post(`/dashboard/news/${news.id}`, data, {
                forceFormData: true,
                onSuccess: () => {
                    onSuccess();
                },
                onError: (errors) => {
                    console.error('Error updating news:', errors);
                    alert('Gagal mengupdate berita: ' + Object.values(errors).flat().join(''));
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        } catch (error) {
            console.error('Error updating news:', error);
            alert('Gagal mengupdate berita');
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
                        Edit Berita
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-title">Judul Berita *</Label>
                            <Input
                                id="edit-title"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Masukkan judul berita"
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
                            {news.image && (
                                <img
                                    src={news.image.startsWith('http') ? news.image : `/${news.image}`}
                                    alt={news.title}
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

                        {/* Author & Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-author">Penulis *</Label>
                                <Input
                                    id="edit-author"
                                    value={formData.author}
                                    onChange={(e) => handleInputChange('author', e.target.value)}
                                    placeholder="Nama penulis"
                                    required
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

                        {/* Category & Subcategory */}
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
                                <Label htmlFor="edit-subcategory">Sub Kategori</Label>
                                <Input
                                    id="edit-subcategory"
                                    value={formData.subcategory}
                                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                                    placeholder="Sub kategori berita"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Read Time */}
                        <div className="hidden space-y-2">
                            <Label htmlFor="edit-readTime">Waktu Baca (menit)</Label>
                            <Input
                                id="edit-readTime"
                                type="hidden"
                                value={formData.readTime}
                                onChange={(e) => handleInputChange('readTime', e.target.value)}
                                placeholder="5"
                                min="1"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Current Stats */}
                    <div className="rounded-lg bg-gray-50 p-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-700">Statistik Saat Ini</h4>
                        <div className="flex gap-4 text-sm text-gray-600">
                            <span>Views: {news.views.toLocaleString()}</span>
                            <span>Likes: {news.likes.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t pt-4">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Berita
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
