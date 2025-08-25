import { useEffect, useState } from 'react';

type Testimonial = {
    id: number;
    user_id: number;
    position: string;
    company: string;
    message: string;
    avatar: string;
    is_featured: boolean;
    user?: { name: string };
};

const emptyTestimonial: Omit<Testimonial, 'id' | 'user'> = {
    user_id: 1,
    position: '',
    company: '',
    message: '',
    avatar: '',
    is_featured: false,
};

export default function TestimonialCrud() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [testimonialForm, setTestimonialForm] = useState<Omit<Testimonial, 'id' | 'user'>>(emptyTestimonial);
    const [testimonialEditId, setTestimonialEditId] = useState<number | null>(null);
    const [showTestimonialForm, setShowTestimonialForm] = useState(false);

    // Fetch testimonials
    const fetchTestimonials = async () => {
        const res = await fetch('/dashboard/CrudTestimonials');
        setTestimonials(await res.json());
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    // Submit testimonial
    const handleTestimonialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = testimonialEditId
            ? `/dashboard/CrudTestimonials/${testimonialEditId}`
            : '/dashboard/CrudTestimonials';
        const method = testimonialEditId ? 'PUT' : 'POST';
        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '',
            },
            body: JSON.stringify(testimonialForm),
        });
        if (res.ok) {
            setShowTestimonialForm(false);
            setTestimonialForm(emptyTestimonial);
            setTestimonialEditId(null);
            fetchTestimonials();
        } else {
            alert('Gagal menyimpan testimonial');
        }
    };

    // Edit testimonial
    const handleTestimonialEdit = (item: Testimonial) => {
        setTestimonialForm({
            user_id: item.user_id,
            position: item.position,
            company: item.company,
            message: item.message,
            avatar: item.avatar,
            is_featured: item.is_featured,
        });
        setTestimonialEditId(item.id);
        setShowTestimonialForm(true);
    };

    // Delete testimonial
    const handleTestimonialDelete = async (id: number) => {
        if (!window.confirm('Hapus testimonial ini?')) return;
        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
        const res = await fetch(`/dashboard/CrudTestimonials/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': csrfToken || '',
                'Accept': 'application/json',
            },
        });
        if (res.ok) fetchTestimonials();
        else alert('Gagal menghapus testimonial');
    };

    return (
        <div>
            <div className="mt-12 mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Kelola Testimoni</h2>
                <button
                    className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                    onClick={() => { setShowTestimonialForm(true); setTestimonialForm(emptyTestimonial); setTestimonialEditId(null); }}
                >
                    Tambah Testimoni
                </button>
            </div>
            {showTestimonialForm && (
                <form onSubmit={handleTestimonialSubmit} className="mb-6 rounded border p-4 bg-white space-y-3">
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="User ID"
                        type="number"
                        value={testimonialForm.user_id}
                        onChange={e => setTestimonialForm(f => ({ ...f, user_id: Number(e.target.value) }))}
                        required
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Posisi"
                        value={testimonialForm.position}
                        onChange={e => setTestimonialForm(f => ({ ...f, position: e.target.value }))}
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Perusahaan"
                        value={testimonialForm.company}
                        onChange={e => setTestimonialForm(f => ({ ...f, company: e.target.value }))}
                    />
                    <textarea
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Pesan"
                        value={testimonialForm.message}
                        onChange={e => setTestimonialForm(f => ({ ...f, message: e.target.value }))}
                        required
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="URL Avatar"
                        value={testimonialForm.avatar}
                        onChange={e => setTestimonialForm(f => ({ ...f, avatar: e.target.value }))}
                    />
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={testimonialForm.is_featured}
                            onChange={e => setTestimonialForm(f => ({ ...f, is_featured: e.target.checked }))}
                        />
                        Featured
                    </label>
                    <div className="flex gap-2">
                        <button type="submit" className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700">
                            {testimonialEditId ? 'Update' : 'Tambah'}
                        </button>
                        <button type="button" className="rounded bg-gray-300 px-4 py-2" onClick={() => setShowTestimonialForm(false)}>
                            Batal
                        </button>
                    </div>
                </form>
            )}
            <div className="relative min-h-[40vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border bg-white p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="border-b p-2">User</th>
                            <th className="border-b p-2">Posisi</th>
                            <th className="border-b p-2">Perusahaan</th>
                            <th className="border-b p-2">Pesan</th>
                            <th className="border-b p-2">Avatar</th>
                            <th className="border-b p-2">Featured</th>
                            <th className="border-b p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map(item => (
                            <tr key={item.id}>
                                <td className="border-b p-2">{item.user?.name || item.user_id}</td>
                                <td className="border-b p-2">{item.position}</td>
                                <td className="border-b p-2">{item.company}</td>
                                <td className="border-b p-2">{item.message}</td>
                                <td className="border-b p-2">
                                    {item.avatar && (
                                        <img src={item.avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                                    )}
                                </td>
                                <td className="border-b p-2">{item.is_featured ? 'Ya' : 'Tidak'}</td>
                                <td className="border-b p-2">
                                    <button
                                        className="mr-2 rounded bg-blue-500 px-3 py-1 text-white"
                                        onClick={() => handleTestimonialEdit(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="rounded bg-red-500 px-3 py-1 text-white"
                                        onClick={() => handleTestimonialDelete(item.id)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {testimonials.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">Belum ada testimonial.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}