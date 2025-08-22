const isoLogos = ['1.svg', '2.svg', '3.svg', '4.svg', '5.svg', '6.svg', '7.svg'];

export function CardSquare() {
    return (
        <div className="mx-auto flex w-full max-w-7xl">
            {/* Mobile: 2 columns */}
            <div className="grid w-full grid-cols-2 place-items-center gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 md:gap-8 lg:grid-cols-5 xl:grid-cols-7">
                {isoLogos.map((logo, index) => (
                    <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-4 md:p-6"
                    >
                        <img
                            src={`/images/ISO/${logo}`}
                            alt={`ISO Logo ${logo}`}
                            className="mx-auto h-12 w-auto object-contain brightness-100 filter transition-all duration-300 sm:h-16 md:h-20 lg:h-24"
                        />
                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
