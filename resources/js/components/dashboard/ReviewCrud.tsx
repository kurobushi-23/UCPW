import { useEffect, useState } from 'react';

type Review = {
    id: number;
    service: string;
    name: string;
    comment: string;
    rating: number;
};

const emptyReview: Omit<Review, 'id'> = {
    service: '',
    name: '',
    comment: '',
    rating: 5,
};

export default function ReviewCrud() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewForm, setReviewForm] = useState<Omit<Review, 'id'>>(emptyReview);
    const [reviewEditId, setReviewEditId] = useState<number | null>(null);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const fetchReviews = async () => {
        const res = await fetch('/dashboard/reviews');
        setReviews(await res.json());
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = reviewEditId ? `/dashboard/reviews/${reviewEditId}` : '/dashboard/reviews';
        const method = reviewEditId ? 'PUT' : 'POST';
        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '',
            },
            body: JSON.stringify(reviewForm),
        });
        if (res.ok) {
            setShowReviewForm(false);
            setReviewForm(emptyReview);
            setReviewEditId(null);
            fetchReviews();
        } else {
            alert('Gagal menyimpan review');
        }
    };

    const handleReviewEdit = (item: Review) => {
        setReviewForm({ ...item });
        setReviewEditId(item.id);
        setShowReviewForm(true);
    };

    const handleReviewDelete = async (id: number) => {
        if (!window.confirm('Hapus review ini?')) return;
        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
        const res = await fetch(`/dashboard/reviews/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': csrfToken || '',
                'Accept': 'application/json',
            },
        });
        if (res.ok) fetchReviews();
        else alert('Gagal menghapus review');
    };

    return (
        <div>
            <div className="mt-12 mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Kelola Review</h2>
                <button
                    className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                    onClick={() => { setShowReviewForm(true); setReviewForm(emptyReview); setReviewEditId(null); }}
                >
                    Tambah Review
                </button>
            </div>
            {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="mb-6 rounded border p-4 bg-white space-y-3">
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Service"
                        value={reviewForm.service}
                        onChange={e => setReviewForm(f => ({ ...f, service: e.target.value }))}
                        required
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Nama"
                        value={reviewForm.name}
                        onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))}
                        required
                    />
                    <textarea
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Komentar"
                        value={reviewForm.comment}
                        onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                        required
                    />
                    <input
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Rating (1-5)"
                        type="number"
                        min={1}
                        max={5}
                        value={reviewForm.rating}
                        onChange={e => setReviewForm(f => ({ ...f, rating: Number(e.target.value) }))}
                        required
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700">
                            {reviewEditId ? 'Update' : 'Tambah'}
                        </button>
                        <button type="button" className="rounded bg-gray-300 px-4 py-2" onClick={() => setShowReviewForm(false)}>
                            Batal
                        </button>
                    </div>
                </form>
            )}
            <div className="relative min-h-[40vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border bg-white p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="border-b p-2">Service</th>
                            <th className="border-b p-2">Nama</th>
                            <th className="border-b p-2">Komentar</th>
                            <th className="border-b p-2">Rating</th>
                            <th className="border-b p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(item => (
                            <tr key={item.id}>
                                <td className="border-b p-2">{item.service}</td>
                                <td className="border-b p-2">{item.name}</td>
                                <td className="border-b p-2">{item.comment}</td>
                                <td className="border-b p-2">{item.rating}</td>
                                <td className="border-b p-2">
                                    <button
                                        className="mr-2 rounded bg-blue-500 px-3 py-1 text-white"
                                        onClick={() => handleReviewEdit(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="rounded bg-red-500 px-3 py-1 text-white"
                                        onClick={() => handleReviewDelete(item.id)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {reviews.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">Belum ada review.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}