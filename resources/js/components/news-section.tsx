import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { News } from '@/types';
import { ArrowUpRight } from 'lucide-react';
import { NewsCard } from './dashboard/news/news-card';

interface Props {
    news: News[];
    isLoading: boolean;
}

export default function NewsSection({ news, isLoading }: Props) {
    return (
        <section id="news" className="mx-auto w-full max-w-7xl px-4 py-16 font-montserrat">
            {/* Header */}
            <div className="mb-12 text-center">
                <span className="flex items-center justify-center gap-2 font-semibold text-amber-600">
                    Berita & Update
                    <ArrowUpRight className="h-4 w-4 text-amber-600" />
                </span>
                <h2 className="mx-auto mt-5 max-w-4xl text-2xl font-bold text-gray-900 md:text-4xl">
                    Ikuti perkembangan terkini dari <span className="text-amber-600">PT. PMP Karya Mandiri</span>
                </h2>
            </div>

            {/* Loading state */}
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-amber-600"></div>
                </div>
            ) : news.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-600">Belum ada berita yang tersedia.</p>
                </div>
            ) : (
                <>
                    {/* Index 0 → Featured big layout */}
                    <div className="mb-12">
                        <Card className="overflow-hidden border-0 py-0 shadow-lg hover:shadow-xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative h-full overflow-hidden">
                                    <img
                                        src={news[0].image}
                                        alt={news[0].title}
                                        className="h-full max-h-96 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                    />
                                    {news[0].category && (
                                        <div className="absolute top-4 left-4">
                                            <span className="rounded-full bg-amber-600 px-3 py-1 text-xs font-medium text-white">
                                                {news[0].category}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-between p-8">
                                    <div>
                                        <h3 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">{news[0].title}</h3>
                                        <p className="mb-6 line-clamp-6 text-gray-600">{news[0].description}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="ghost" className="text-amber-600 hover:bg-amber-50 hover:text-amber-700">
                                            Lihat Selengkapnya
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sisanya → pakai NewsCard style */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {news.slice(1).map((item) => (
                            <NewsCard key={item.id} news={item} isLoading={isLoading} />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
