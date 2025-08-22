import FooterSection from '@/components/footer-section';
import OrganizationChart from '@/components/organization-structure';
import { motion } from 'framer-motion';
import { Award, Building2, CheckCircle, Download, MapPin, Star } from 'lucide-react';
import { PageLayout } from '../../components/page-layout';

export default function Index() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
                type: 'spring',
                duration: 0.5,
            },
        },
    } as const;

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 0.6,
                bounce: 0.3,
            },
        },
    } as const;

    return (
        <PageLayout>
            {/* Hero Section dengan Gradient yang Enhanced */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                className="relative mx-auto h-80 overflow-hidden bg-gradient-to-br from-gray-900 via-amber-900 to-amber-600 px-4 py-8"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-300/20 blur-2xl"></div>

                {/* Grid Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ffffff' stroke-opacity='0.05'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E\")",
                    }}
                ></div>
            </motion.div>

            {/* Main Content Container */}
            <div className="relative mx-auto -mt-20 w-full max-w-7xl px-4">
                {/* Profile Card dengan Enhanced Styling */}
                <motion.div
                    className="relative"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Company Logo/Avatar Circle */}
                    <div className="absolute -top-16 left-8 z-20">
                        <div className="relative">
                            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-amber-500 to-amber-600 shadow-2xl">
                                <Building2 className="h-12 w-12 text-white" />
                            </div>
                            {/* Verified Badge */}
                            <div className="absolute -right-2 -bottom-2 rounded-full border-4 border-white bg-green-500 p-2 shadow-lg">
                                <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Main Profile Card */}
                    <div className="transform rounded-2xl border border-gray-100 bg-white px-8 pt-20 pb-8 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
                        <motion.div className="grid gap-8 lg:grid-cols-3" variants={containerVariants} initial="hidden" animate="visible">
                            {/* Company Info - Left Side */}
                            <motion.div className="lg:col-span-2" variants={itemVariants}>
                                <div className="mb-6">
                                    <motion.h1
                                        className="mb-2 text-4xl font-bold text-gray-900 lg:text-5xl"
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                    >
                                        PT. PMP Karya Mandiri
                                    </motion.h1>

                                    <motion.div
                                        className="mb-4 flex flex-wrap items-center gap-4 text-gray-600"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-amber-600" />
                                            <span>Cilegon, Indonesia</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Award className="h-5 w-5 text-amber-600" />
                                            <span>Anggota GAPEKSINDO</span>
                                        </div>

                                        <motion.a
                                            href="/cp/company-profile-pmp.pdf"
                                            download
                                            title="Download Company Profile"
                                            className="flex items-center gap-2 rounded-xl bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Download className="h-5 w-5" />
                                            Download CP
                                        </motion.a>
                                    </motion.div>

                                    {/* Rating/Trust Indicator */}
                                    <motion.div
                                        className="mb-6 flex items-center gap-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-5 w-5 fill-current text-amber-400" />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">Reputasi Terbaik</span>
                                    </motion.div>
                                </div>

                                {/* Company Description */}
                                <motion.div className="prose prose-lg max-w-none" variants={itemVariants}>
                                    <p className="mb-4 leading-relaxed text-gray-700">
                                        <strong className="text-amber-600">PT. PMP KARYA MANDIRI</strong> merupakan badan usaha yang beroperasi di
                                        sektor implementasi dan menjadi anggota Asosiasi <strong className="text-amber-600">GAPEKSINDO</strong>,
                                        berdomisili di Kota Cilegon, Indonesia.
                                    </p>
                                    <p className="mb-4 leading-relaxed text-gray-700">
                                        Perusahaan memiliki{' '}
                                        <span className="rounded bg-amber-100 px-2 py-1 font-semibold text-amber-800">reputasi baik</span> dalam
                                        menawarkan jasa dengan standar terbaik di area development.
                                    </p>
                                    <p className="leading-relaxed text-gray-700">
                                        <strong className="text-gray-900">PT. PMP KARYA MANDIRI</strong> berkomitmen penuh untuk mewujudkan hasil yang
                                        maksimal dalam setiap tugas yang diberikan. Perusahaan ini senantiasa mempertahankan standar profesional dan
                                        kualitas sesuai dengan standar yang telah digariskan oleh asosiasi GAPEKSINDO.
                                    </p>
                                </motion.div>
                            </motion.div>

                            {/* Stats/Info Cards - Right Side */}
                            <motion.div className="space-y-6" variants={itemVariants}>
                                {/* Quick Stats */}
                                <div className="transform rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                                    <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                        <Award className="mr-2 h-5 w-5 text-amber-600" />
                                        Highlights
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Sektor</span>
                                            <span className="font-semibold text-gray-800">Implementasi</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Asosiasi</span>
                                            <span className="font-semibold text-amber-600">GAPEKSINDO</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Area Focus</span>
                                            <span className="font-semibold text-gray-800">Development</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Trust Indicators */}
                                <div className="transform rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                                    <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                        <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                                        Komitmen
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                            <span className="text-sm text-gray-700">Hasil Maksimal</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                            <span className="text-sm text-gray-700">Standar Profesional</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                            <span className="text-sm text-gray-700">Kualitas Terjamin</span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <motion.button
                                    className="w-full rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-amber-700 hover:to-amber-800"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Hubungi Kami
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Company History & Vision Section */}
                <motion.div
                    className="mt-16 grid gap-12 lg:grid-cols-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    {/* History Timeline */}
                    <div className="transform rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 ease-in-out hover:shadow-2xl">
                        <motion.h2
                            className="mb-8 flex items-center text-3xl font-bold text-gray-900"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <div className="mr-4 h-8 w-2 rounded-full bg-gradient-to-b from-amber-500 to-amber-600"></div>
                            Sejarah Perusahaan
                        </motion.h2>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600"></div>

                            {/* Timeline Items */}
                            <motion.div className="relative space-y-8" variants={containerVariants} initial="hidden" animate="visible">
                                {/* Establishment */}
                                <motion.div className="relative flex items-start" variants={itemVariants}>
                                    <div className="absolute left-4 z-10 h-4 w-4 rounded-full border-4 border-white bg-amber-600 shadow-lg"></div>
                                    <div className="ml-12 rounded-xl border-l-4 border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="rounded-full bg-amber-600 px-3 py-1 text-sm font-semibold text-white">26 Juli 2019</div>
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold text-gray-800">Pendirian Perusahaan</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            <strong className="text-amber-600">PT. PMP Karya Mandiri</strong> resmi berdiri dengan fokus awal pada
                                            pengadaan barang dan jasa.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Evolution */}
                                <motion.div className="relative flex items-start" variants={itemVariants}>
                                    <div className="absolute left-4 z-10 h-4 w-4 rounded-full border-4 border-white bg-amber-500 shadow-lg"></div>
                                    <div className="ml-12 rounded-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                                        <h3 className="mb-2 text-xl font-semibold text-gray-800">Ekspansi Bisnis</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            Berkembang menjadi perusahaan nasional terkemuka dengan fokus pada{' '}
                                            <span className="font-semibold text-blue-600">pengadaan alat-alat berat</span> dan{' '}
                                            <span className="font-semibold text-blue-600">jasa konstruksi</span>.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Values */}
                                <motion.div className="relative flex items-start" variants={itemVariants}>
                                    <div className="absolute left-4 z-10 h-4 w-4 rounded-full border-4 border-white bg-green-500 shadow-lg"></div>
                                    <div className="ml-12 rounded-xl border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                        <h3 className="mb-2 text-xl font-semibold text-gray-800">Prinsip Kerja</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                <span className="font-medium text-gray-700">Niat usaha yang tulus</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                <span className="font-medium text-gray-700">Cerdas dan penuh tanggung jawab</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                <span className="font-medium text-gray-700">Komitmen dalam setiap pekerjaan</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Vision & Mission */}
                    <div className="space-y-8">
                        {/* Vision */}
                        <motion.div
                            className="transform rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 ease-in-out hover:shadow-2xl"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 }}
                        >
                            <div className="mb-6 flex items-center">
                                <div className="mr-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 p-3 text-white">
                                    <Star className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Visi</h2>
                            </div>

                            <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 p-6">
                                <p className="mb-4 text-lg leading-relaxed font-medium text-gray-800">
                                    "Untuk menjadi perusahaan nasional terkemuka dalam pelayanan, pengadaan dan jasa konstruksi"
                                </p>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                                        <span className="text-gray-700">Menghasilkan nilai tambah bagi pemegang saham</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                                        <span className="text-gray-700">Memberdayakan pembangunan berkelanjutan melalui inovasi dan teknologi</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                                        <span className="text-gray-700">
                                            Menghasilkan produk dan layanan berkualitas tinggi yang ramah lingkungan
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mission Preview Card */}
                        <motion.div
                            className="rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 p-8 text-white shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 }}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Komitmen Berkelanjutan</h3>
                                <Award className="h-8 w-8 text-amber-200" />
                            </div>
                            <p className="leading-relaxed text-amber-100">
                                Kami terus berkomitmen untuk memberikan layanan terbaik dengan standar internasional, mendukung pembangunan
                                infrastruktur Indonesia yang berkelanjutan.
                            </p>
                            <div className="mt-6 flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-amber-200"></div>
                                    <span className="text-amber-200">Inovasi Teknologi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-amber-200"></div>
                                    <span className="text-amber-200">Ramah Lingkungan</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Additional decorative elements */}
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber-400/5 blur-2xl"></div>
                <div className="absolute bottom-10 left-10 h-24 w-24 rounded-full bg-orange-400/5 blur-xl"></div>
            </div>

            <OrganizationChart />
            <div className="mt-12">
                <FooterSection />
            </div>
        </PageLayout>
    );
}
