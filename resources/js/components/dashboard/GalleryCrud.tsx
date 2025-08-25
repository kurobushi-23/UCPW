import { useEffect, useState } from 'react';

type Gallery = {
    id: number;
    caption: string;
    description: string;
    image: string;
};

const emptyGallery: Omit<Gallery, 'id'> = {
    caption: '',
    description: '',
    image: '',
};

export default function GalleryCrud() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [galleryForm, setGalleryForm] = useState<Omit<Gallery, 'id'>>(emptyGallery);
    const [galleryEditId, setGalleryEditId] = useState<number | null>(null);
    const [showGalleryForm, setShowGalleryForm] = useState(false);

    const fetchGalleries = async () => {
        const res = await fetch('/dashboard/galleries');
        setGalleries(await res.json());
    };

    useEffect(() => {
        fetchGalleries();
    }, []);

    const handleGallerySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = galleryEditId ? `/dashboard/galleries/${galleryEditId}` : '/dashboard/galleries';
        const method = galleryEditId ? 'PUT' : 'POST';
        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '',
            },
            body: JSON.stringify(galleryForm),
        });
        if (res.ok) {
            setShowGalleryForm(false);
            setGalleryForm(emptyGallery);
            setGalleryEditId(null);
            fetchGalleries();
        } else {
            alert('Gagal menyimpan galeri');
        }
    };

    const handleGalleryEdit = (item: Gallery) => {
        setGalleryForm({ ...item });
        setGalleryEditId(item.id);
        setShowGalleryForm(true);
    };

    const handleGalleryDelete = async (id: number) => {
        if (!window.confirm('Hapus galeri ini?')) return;
        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
        const res = await fetch(`/dashboard/galleries/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': csrfToken || '',
                'Accept': 'application/json',
            },
        });
        if (res.ok) fetchGalleries();
        else alert('Gagal menghapus galeri');
    };

    return (
        <div>
            <div className="mt-12 mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Kelola Galeri</h2>
                <button
                    className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                    onClick={() => { setShowGalleryForm(true); setGalleryForm(emptyGallery); setGalleryEditId(null); }}
                >
                    Tambah Galeri
                </button>
            </div>
            {showGalleryForm && (
                <form onSubmit={handleGallerySubmit} className="mb-6 rounded border p-4 bg-white space-y-3">
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Caption"
                        value={galleryForm.caption}
                        onChange={e => setGalleryForm(f => ({ ...f, caption: e.target.value }))}
                        required
                    />
                    <textarea
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Deskripsi"
                        value={galleryForm.description}
                        onChange={e => setGalleryForm(f => ({ ...f, description: e.target.value }))}
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="URL Gambar"
                        value={galleryForm.image}
                        onChange={e => setGalleryForm(f => ({ ...f, image: e.target.value }))}
                        required
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700">
                            {galleryEditId ? 'Update' : 'Tambah'}
                        </button>
                        <button type="button" className="rounded bg-gray-300 px-4 py-2" onClick={() => setShowGalleryForm(false)}>
                            Batal
                        </button>
                    </div>
                </form>
            )}
            <div className="relative min-h-[40vh] flex-1 overflow-hidden rounded-xl border bg-white p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="border-b p-2">Caption</th>
                            <th className="border-b p-2">Deskripsi</th>
                            <th className="border-b p-2">Gambar</th>
                            <th className="border-b p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {galleries.map(item => (
                            <tr key={item.id}>
                                <td className="border-b p-2">{item.caption}</td>
                                <td className="border-b p-2">{item.description}</td>
                                <td className="border-b p-2">
                                    <img src={item.image} alt={item.caption} className="h-16 w-24 object-cover rounded" />
                                </td>
                                <td className="border-b p-2">
                                    <button
                                        className="mr-2 rounded bg-blue-500 px-3 py-1 text-white"
                                        onClick={() => handleGalleryEdit(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="rounded bg-red-500 px-3 py-1 text-white"
                                        onClick={() => handleGalleryDelete(item.id)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {galleries.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500">Belum ada galeri.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}