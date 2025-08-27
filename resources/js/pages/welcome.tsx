import { CardSquare } from '@/components/card-square';
import Carousel from '@/components/carousel';
import FAQSection from '@/components/faq-section';
import FooterSection from '@/components/footer-section';
import { ProfessionalGallery } from '@/components/gallery-grid';
import { HeroButtons } from '@/components/hero-button';
import Navbar from '@/components/navbar';
import NewsSection from '@/components/news-section';
import { CardShowcase } from '@/components/showcase';
import { Stats } from '@/components/stats';
import TestimonialSection from '@/components/testi-section';
import { Head } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, Cog, HardHat } from 'lucide-react';

export default function Welcome() {
    const images = ['/images/building-2.svg', '/images/exa-3.svg', '/images/kontraktor.svg'];

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* hero section */}
            <section id="hero" className="relative h-screen w-full font-montserrat">
                <Carousel images={images} interval={5000} />
                <div className="sticky top-0 z-50 w-full">
                    <Navbar />
                </div>
                <div className="absolute inset-0 mx-auto flex w-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2">
                        <h1 className="relative text-center font-sans text-3xl font-semibold drop-shadow-[2px_3px_5px_rgba(0,0,0,0.4)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl">
                            <span className="block text-amber-600 sm:inline">Keunggulan, Keandalan</span>
                            <br className="hidden sm:block" />
                            <span className="mt-2 block sm:mt-0 sm:inline">
                                <span
                                    className="mx-2 text-transparent"
                                    style={{ WebkitTextStroke: '2px white', WebkitTextStrokeWidth: window.innerWidth < 640 ? '2px' : '4px' }}
                                >
                                    &
                                </span>
                                Integritas
                            </span>
                        </h1>
                        <p className="mt-4 max-w-4xl text-center text-sm font-semibold text-gray-300 sm:mt-6 sm:text-base lg:text-lg">
                            Solusi profesional untuk konstruksi, pembangunan, kontraktor, dan supply alat berat.
                        </p>
                    </div>
                    <div className="mt-8 sm:mt-12">
                        <HeroButtons />
                    </div>
                </div>
            </section>

            {/* profile section */}
            <section
                id="profile"
                className="mx-auto mt-8 flex w-full max-w-6xl justify-center px-4 py-8 font-montserrat sm:mt-12 sm:px-6 sm:py-12 lg:px-8"
            >
                <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:gap-9">
                    <div className="relative h-64 w-full flex-shrink-0 overflow-hidden rounded-3xl shadow-xl sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[34rem]">
                        <img src="/images/building.jpg" alt="pic2" className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div className="flex max-w-xl flex-col justify-start gap-3 py-5 text-center lg:text-left">
                        <span className="text-sm font-semibold text-amber-600 sm:text-base">Memimpin dalam Bidang Konstruksi Bangunan dan Sipil</span>
                        <p className="text-2xl leading-tight font-semibold text-black sm:text-3xl lg:text-4xl dark:text-black">
                            Komitmen untuk Memberikan Hasil Terbaik dan Berkualitas Tinggi!
                        </p>
                        <div className="mt-8 flex w-full flex-col justify-center gap-5 sm:mt-12 sm:flex-row lg:justify-start">
                            <div className="flex flex-col items-center gap-5 lg:items-start">
                                <Stats value={2345} duration={2000} />
                                <div className="flex items-center gap-2">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-600">
                                        <Cog className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-sm text-black dark:text-black">Proyek yang selesai di 2023</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-5 lg:items-start">
                                <Stats value={2345} duration={2000} />
                                <div className="flex items-center gap-2">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-600">
                                        <HardHat className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-sm">Tenaga Kerja yang telah bergabung</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center justify-center gap-3 sm:mt-12 lg:justify-start">
                            <p className="text-sm">lihat selengkapnya</p>
                            <ArrowRight className="h-5 w-5 text-amber-600" />
                        </div>
                    </div>
                </div>
            </section>

            {/* layanan section */}
            <section id="layanan" className="mx-auto flex w-full justify-center px-4 py-8 font-montserrat sm:px-6 sm:py-12 lg:px-8">
                <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-3 py-5 sm:gap-6">
                    <span className="flex items-center gap-2 text-sm font-semibold text-amber-600 sm:text-base">
                        Layanan Kami
                        <ArrowUpRight className="h-4 w-4 text-amber-600" />
                    </span>
                    <p className="w-full max-w-6xl text-center text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl">
                        Kami menyediakan berbagai layanan konstruksi, pembangunan, kontraktor, dan supply alat berat yang profesional dan terpercaya.
                    </p>
                    <div className="mt-6 w-full sm:mt-8">
                        <CardShowcase />
                    </div>
                </div>
            </section>

            {/* penghargaan section */}
            <section id="penghargaan" className="mx-auto flex w-full max-w-6xl justify-center px-4 py-8 font-montserrat sm:px-6 sm:py-12 lg:px-8">
                <div className="flex w-full flex-col items-center justify-center gap-3 py-5 sm:gap-6">
                    <span className="flex items-center gap-2 text-sm font-semibold text-amber-600 sm:text-base">
                        Penghargaan dan Sertifikasi
                        <ArrowUpRight className="h-4 w-4 text-amber-600" />
                    </span>
                    <p className="w-full text-center text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl">
                        Komitmen kami terhadap mutu, keselamatan, dan keberlanjutan diwujudkan melalui penerapan standar nasional maupun
                        internasional.
                    </p>
                    <div className="mt-8 w-full sm:mt-12">
                        <CardSquare />
                    </div>
                </div>
            </section>

            {/* galeri section */}
            <section id="galeri" className="flex h-full w-full flex-col items-center justify-start bg-amber-600 pb-8 font-montserrat sm:pb-12">
                <div className="mt-8 flex w-full max-w-7xl flex-col justify-start gap-3 px-4 py-5 sm:mt-12 sm:gap-6 sm:px-6 lg:px-8">
                    <span className="flex items-center gap-2 text-sm font-semibold text-white sm:text-base">
                        Galeri Proyek
                        <ArrowUpRight className="h-4 w-4 text-white" />
                    </span>
                    <p className="w-full max-w-6xl text-2xl leading-tight font-semibold text-white sm:text-3xl lg:text-4xl">
                        Setiap foto mencerminkan proses kerja yang terencana dan sesuai standar. Mulai dari persiapan, pembangunan struktur, hingga
                        penyelesaian akhir.
                    </p>
                </div>
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <ProfessionalGallery />
                </div>
            </section>

            {/* faq section */}
            <div className="px-4 sm:px-6 lg:px-8">
                <FAQSection />
            </div>

            {/* testi section */}
            <div className="px-4 sm:px-6 lg:px-8">
                <TestimonialSection testimonials={[]} />
            </div>

            {/* news section */}
            <div className="px-4 sm:px-6 lg:px-8">
                <NewsSection news={[]} isLoading={false} />
            </div>

            {/* footer section */}
            <FooterSection />
        </>
    );
}
