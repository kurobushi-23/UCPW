import { useEffect, useState } from 'react';

interface CarouselProps {
    images: string[];
    interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 5000 }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
            {images.map((src, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 h-full w-full transition-opacity duration-700 ${
                        index === activeIndex ? 'opacity-90' : 'opacity-0'
                    }`}
                >
                    <img src={src} alt={`Slide ${index}`} className="h-full w-full object-cover object-center" />
                    {/* Responsive vignette */}
                    <div className="absolute bottom-0 left-0 h-3/4 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent sm:h-2/3" />
                </div>
            ))}

            {/* Responsive indicators */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-6 sm:gap-2 md:bottom-8 lg:bottom-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-1 w-6 rounded-full transition-all duration-300 sm:h-1.5 sm:w-8 md:w-10 ${
                            index === activeIndex ? 'scale-110 bg-amber-600' : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
