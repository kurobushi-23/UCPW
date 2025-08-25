import { useEffect, useState } from 'react';

type NewsItem = {
    id: number;
    title: string;
    description: string;
    image: string;
    likes: number;
    views: number;
    date: string;
    author: string;
    category: string;
    subcategory: string;
    readTime: number;
};

const emptyNews: Omit<NewsItem, 'id'> = {
    title: '',
    description: '',
    image: '',
    likes: 0,
    views: 0,
    date: '',
    author: '',
    category: '',
    subcategory: '',
    readTime: 0,
};

export default function NewsCrud() {
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<Omit<NewsItem, 'id'>>(emptyNews);
    const [editId, setEditId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Fetch news
    const fetchNews = async () => {
        setIsLoading(true);
        const res = await fetch('/dashboard/news');
        const data = await res.json();
        setNewsList(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Handle form submit (add or edit)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editId ? `/dashboard/news/${editId}` : '/dashboard/news';
        const method = editId ? 'PUT' : 'POST';
        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '',
            },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            setShowForm(false);
            setForm(emptyNews);
            setEditId(null);
            fetchNews();
        } else {
            alert('Gagal menyimpan berita');
        }
    };

    // Handle edit
    const handleEdit = (item: NewsItem) => {
        setForm({ ...item });
        setEditId(item.id);
        setShowForm(true);
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        if (!window.confirm('Hapus berita ini?')) return;
        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
        const res = await fetch(`/dashboard/news/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': csrfToken || '',
                'Accept': 'application/json',
            },
        });
        if (res.ok) fetchNews();
        else alert('Gagal menghapus berita');
    };

    return (
        <div>
            {/* === CRUD Berita === */}
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Kelola Berita</h2>
                <button
                    className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                    onClick={() => { setShowForm(true); setForm(emptyNews); setEditId(null); }}
                >
                    Tambah Berita
                </button>
            </div>
            {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 rounded border p-4 bg-white space-y-3">
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Judul"
                        value={form.title}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        required
                    />
                    <textarea
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Deskripsi"
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        required
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="URL Gambar"
                        value={form.image}
                        onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Tanggal (YYYY-MM-DD)"
                        value={form.date}
                        onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                        required
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Penulis"
                        value={form.author}
                        onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                        required
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Kategori"
                        value={form.category}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Subkategori"
                        value={form.subcategory}
                        onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
                        required
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Waktu Baca (menit)"
                        type="number"
                        value={form.readTime}
                        onChange={e => setForm(f => ({ ...f, readTime: Number(e.target.value) }))}
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700">
                            {editId ? 'Update' : 'Tambah'}
                        </button>
                        <button type="button" className="rounded bg-gray-300 px-4 py-2" onClick={() => setShowForm(false)}>
                            Batal
                        </button>
                    </div>
                </form>
            )}
            <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border bg-white p-4">
                {isLoading ? (
                    <div>Memuat data...</div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Judul</th>
                                <th className="border-b p-2">Penulis</th>
                                <th className="border-b p-2">Tanggal</th>
                                <th className="border-b p-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsList.map(item => (
                                <tr key={item.id}>
                                    <td className="border-b p-2">{item.title}</td>
                                    <td className="border-b p-2">{item.author}</td>
                                    <td className="border-b p-2">{item.date}</td>
                                    <td className="border-b p-2">
                                        <button
                                            className="mr-2 rounded bg-blue-500 px-3 py-1 text-white"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="rounded bg-red-500 px-3 py-1 text-white"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {newsList.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-gray-500">Belum ada berita.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}