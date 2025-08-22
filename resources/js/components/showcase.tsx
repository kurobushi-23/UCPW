import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, ChevronLeft, ChevronRight, HardHat, Home, Truck } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

const cards = [
    {
        id: 1,
        title: 'Konstruksi',
        desc: 'Kami menyediakan jasa pembangunan gedung bertingkat dengan standar internasional.',
        img: '/images/worker.svg',
        icon: Building2,
    },
    {
        id: 2,
        title: 'Pembangunan',
        desc: 'Layanan renovasi rumah modern dan minimalis sesuai kebutuhan Anda.',
        img: '/images/worker-2.svg',
        icon: Home,
    },
    {
        id: 3,
        title: 'Alat Berat',
        desc: 'Penyewaan alat berat profesional untuk menunjang proyek besar Anda.',
        img: '/images/exa.svg',
        icon: Truck,
    },
    {
        id: 4,
        title: 'Jasa Kontraktor',
        desc: 'Kontraktor berpengalaman dengan tenaga kerja profesional.',
        img: '/images/worker-3.svg',
        icon: HardHat,
    },
];

export function CardShowcase() {
    const [activeCard, setActiveCard] = useState(cards[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const nextCard = () => {
        const nextIndex = (currentIndex + 1) % cards.length;
        setCurrentIndex(nextIndex);
        setActiveCard(cards[nextIndex]);
    };

    const prevCard = () => {
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        setCurrentIndex(prevIndex);
        setActiveCard(cards[prevIndex]);
    };

    // Mouse drag handlers
    const handleMouseDown = (e: globalThis.MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(false);
        isDown.current = true;
        startX.current = e.pageX - containerRef.current.offsetLeft;
        scrollLeft.current = containerRef.current.scrollLeft;
        containerRef.current.style.cursor = 'grabbing';
        containerRef.current.style.userSelect = 'none';
    };

    const handleMouseLeave = () => {
        if (!containerRef.current) return;
        isDown.current = false;
        containerRef.current.style.cursor = 'grab';
        containerRef.current.style.userSelect = 'auto';
    };

    const handleMouseUp = () => {
        if (!containerRef.current) return;
        isDown.current = false;
        containerRef.current.style.cursor = 'grab';
        containerRef.current.style.userSelect = 'auto';

        // Prevent click if was dragging
        if (isDragging) {
            setTimeout(() => setIsDragging(false), 10);
        }
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
        if (!isDown.current || !containerRef.current) return;
        e.preventDefault();
        setIsDragging(true);
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        containerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    // Touch drag handlers
    const handleTouchStart = (e: globalThis.TouchEvent) => {
        if (!containerRef.current) return;
        setIsDragging(false);
        isDown.current = true;
        startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
        scrollLeft.current = containerRef.current.scrollLeft;
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
        if (!isDown.current || !containerRef.current) return;
        setIsDragging(true);
        const x = e.touches[0].pageX - containerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        containerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleTouchEnd = () => {
        isDown.current = false;
        if (isDragging) {
            setTimeout(() => setIsDragging(false), 10);
        }
    };

    const handleCardClick = (card: (typeof cards)[0]) => {
        if (!isDragging) {
            setActiveCard(card);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove);
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl sm:rounded-3xl">
            {/* Background Image */}
            <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[32rem] xl:h-[40rem]">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeCard.id}
                        src={activeCard.img}
                        alt={activeCard.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                            duration: 0.6,
                            ease: 'easeInOut',
                        }}
                    />
                </AnimatePresence>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute bottom-0 left-0 h-2/3 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent sm:h-3/5" />
            <div className="absolute top-0 left-0 h-1/3 w-full bg-gradient-to-b from-black/60 to-transparent sm:h-2/5" />

            {/* Mobile Navigation Arrows */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 sm:left-6 md:hidden">
                <motion.button
                    onClick={prevCard}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                >
                    <ChevronLeft className="h-5 w-5" />
                </motion.button>
            </div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 sm:right-6 md:hidden">
                <motion.button
                    onClick={nextCard}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                >
                    <ChevronRight className="h-5 w-5" />
                </motion.button>
            </div>

            {/* Desktop Card Container with Grab Scroll */}
            <div className="hidden md:block">
                <div
                    ref={containerRef}
                    className="absolute bottom-6 left-0 flex h-fit w-full gap-3 px-4 sm:gap-4 sm:px-6 lg:bottom-10 lg:gap-6 lg:px-8"
                    style={
                        {
                            cursor: 'grab',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            '::-webkit-scrollbar': { display: 'none' },
                        } as React.CSSProperties
                    }
                >
                    {cards.map((card) => {
                        const IconComponent = card.icon;
                        return (
                            <motion.div
                                key={card.id}
                                className={`min-w-[240px] cursor-pointer rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-300 select-none sm:min-w-[280px] sm:rounded-2xl sm:p-5 lg:min-w-[320px] lg:p-6 ${
                                    activeCard.id === card.id
                                        ? 'scale-105 bg-white/95 text-black'
                                        : 'bg-white/20 text-white hover:scale-102 hover:bg-white/30'
                                }`}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleCardClick(card)}
                                layout
                                style={{
                                    pointerEvents: isDragging ? 'none' : 'auto',
                                }}
                            >
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div
                                        className={`rounded-lg p-2 sm:rounded-xl sm:p-3 ${
                                            activeCard.id === card.id ? 'bg-amber-100' : 'bg-white/20'
                                        }`}
                                    >
                                        <IconComponent
                                            size={window.innerWidth < 640 ? 20 : 24}
                                            className={activeCard.id === card.id ? 'text-amber-600' : 'text-white'}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="mb-2 truncate text-lg font-bold sm:text-xl">{card.title}</h3>
                                        <p className="line-clamp-2 text-sm leading-relaxed sm:line-clamp-3 sm:text-base">{card.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Card Indicator */}
            <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-2 md:hidden">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            setActiveCard(cards[index]);
                        }}
                        className={`h-2 w-2 rounded-full transition-all ${currentIndex === index ? 'scale-125 bg-amber-600' : 'bg-white/50'}`}
                    />
                ))}
            </div>

            {/* Title and Description */}
            <div className="absolute top-4 right-4 left-4 text-white sm:top-6 sm:right-6 sm:left-6 lg:top-10 lg:right-10 lg:left-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCard.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="mb-2 text-2xl leading-tight font-bold sm:mb-3 sm:text-3xl lg:text-4xl xl:text-5xl">{activeCard.title}</h2>
                        <p className="mb-4 max-w-2xl text-sm leading-relaxed sm:mb-6 sm:text-base lg:text-lg">{activeCard.desc}</p>
                        <motion.div
                            className="flex cursor-pointer items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300 sm:text-base"
                            whileHover={{ x: 5 }}
                        >
                            <span>Lihat selengkapnya</span>
                            <ArrowRight size={16} />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Mobile Bottom Card Info */}
            <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-white/20 p-4 backdrop-blur-sm md:hidden">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-amber-600/20 p-2">
                        {(() => {
                            const IconComponent = activeCard.icon;
                            return <IconComponent size={20} className="text-white" />;
                        })()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-lg font-semibold text-white">{activeCard.title}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
