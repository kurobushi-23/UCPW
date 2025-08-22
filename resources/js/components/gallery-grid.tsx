import { motion, useInView, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

const galleryItems = [
    {
        id: 1,
        src: '/images/building.svg',
        alt: 'Konstruksi Gedung Bertingkat',
        title: 'Gedung Perkantoran Modern',
        category: 'Konstruksi',
        gridArea: { mobile: 'span 1 / span 2', desktop: 'span 2 / span 2' },
    },
    {
        id: 2,
        src: '/images/building-2.svg',
        alt: 'Renovasi Interior',
        title: 'Renovasi Kantor Executive',
        category: 'Renovasi',
        gridArea: { mobile: 'span 1 / span 1', desktop: 'span 1 / span 1' },
    },
    {
        id: 3,
        src: '/images/exa-3.svg',
        alt: 'Alat Berat Excavator',
        title: 'Operasional Alat Berat',
        category: 'Alat Berat',
        gridArea: { mobile: 'span 1 / span 1', desktop: 'span 2 / span 1' },
    },
    {
        id: 4,
        src: '/images/kontraktor.svg',
        alt: 'Tim Kontraktor',
        title: 'Tim Profesional',
        category: 'Kontraktor',
        gridArea: { mobile: 'span 1 / span 2', desktop: 'span 1 / span 2' },
    },
    {
        id: 5,
        src: '/images/worker-3.svg',
        alt: 'Struktur Bangunan',
        title: 'Pembangunan Struktur',
        category: 'Konstruksi',
        gridArea: { mobile: 'span 1 / span 1', desktop: 'span 1 / span 1' },
    },
    {
        id: 6,
        src: '/images/worker-2.svg',
        alt: 'Finishing Interior',
        title: 'Detail Finishing',
        category: 'Renovasi',
        gridArea: { mobile: 'span 1 / span 1', desktop: 'span 1 / span 1' },
    },
    {
        id: 7,
        src: '/images/exa-2.svg',
        alt: 'Crane Tower',
        title: 'Crane Konstruksi',
        category: 'Alat Berat',
        gridArea: { mobile: 'span 1 / span 2', desktop: 'span 1 / span 2' },
    },
    {
        id: 8,
        src: '/images/kontraktor-2.svg',
        alt: 'Pengerjaan Detail',
        title: 'Presisi Detail',
        category: 'Kontraktor',
        gridArea: { mobile: 'span 1 / span 1', desktop: 'span 1 / span 1' },
    },
];

const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            delayChildren: 0.3,
            staggerChildren: 0.08,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.8,
        rotateY: -15,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

export function ProfessionalGallery() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
                ref={ref}
                className="overflow-hidden rounded-2xl border border-white/20 bg-white p-2 sm:rounded-3xl sm:p-3 md:p-4"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Mobile Grid: 2 columns */}
                <div className="grid auto-rows-fr grid-cols-2 gap-2 sm:gap-3 md:hidden">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl"
                            style={{ gridArea: item.gridArea.mobile }}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                zIndex: 10,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <GalleryItem item={item} index={index} />
                        </motion.div>
                    ))}
                </div>

                {/* Desktop Grid: 6 columns */}
                <div className="hidden min-h-[600px] auto-rows-fr grid-cols-6 grid-rows-3 gap-3 md:grid lg:min-h-[700px] lg:gap-4">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="group relative min-h-0 cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl"
                            style={{ gridArea: item.gridArea.desktop }}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                zIndex: 10,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <GalleryItem item={item} index={index} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

// Gallery Item Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GalleryItem({ item, index }: { item: any; index: number }) {
    return (
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-red-600">
            <img src={item.src} alt={item.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

            {/* Content Overlay */}
            <div className="absolute right-0 bottom-0 left-0 translate-y-1 transform p-2 text-white transition-transform duration-300 group-hover:translate-y-0 sm:p-3 lg:p-4">
                <div className="mb-1 sm:mb-2">
                    <span className="inline-block rounded-full bg-white/25 px-2 py-0.5 text-xs font-medium backdrop-blur-sm sm:py-1">
                        {item.category}
                    </span>
                </div>
                <h3 className="text-xs leading-tight font-semibold opacity-90 transition-opacity group-hover:opacity-100 sm:text-sm lg:text-base">
                    {item.title}
                </h3>
            </div>

            {/* Hover Icon */}
            <div className="absolute top-2 right-2 scale-75 transform opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 sm:top-3 sm:right-3 lg:top-4 lg:right-4">
                <div className="rounded-full bg-white/25 p-1 backdrop-blur-sm sm:p-1.5 lg:p-2">
                    <ArrowUpRight className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                </div>
            </div>

            {/* Shimmer Effect */}
            <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                    x: ['100%', '100%', '-100%'],
                }}
                transition={{
                    duration: 1.8,
                    delay: index * 0.1 + 0.8,
                    repeat: 0,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}
