import { AnimatePresence, motion } from 'framer-motion';
import { Cog, Package, Phone } from 'lucide-react';
import { useState } from 'react';

export function HeroButtons() {
    const [hoverLayanan, setHoverLayanan] = useState(false);
    const [hoverPhone, setHoverPhone] = useState(false);

    return (
        <div className="flex w-full max-w-sm justify-center gap-2 px-4 sm:max-w-md sm:gap-3 md:max-w-lg md:gap-4">
            {/* Layanan Button */}
            <motion.button
                onMouseEnter={() => setHoverLayanan(true)}
                onMouseLeave={() => setHoverLayanan(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-white bg-white/35 p-2.5 px-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/45 sm:flex-none sm:justify-between sm:gap-3 sm:p-3 sm:px-4 sm:text-base md:p-4 md:px-6"
            >
                <AnimatePresence mode="wait">
                    {hoverLayanan ? (
                        <motion.div
                            key="cog"
                            initial={{ x: -40, opacity: 0, rotate: -180 }}
                            animate={{ x: 0, opacity: 1, rotate: 0 }}
                            exit={{ x: 40, opacity: 0, rotate: 180 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <Cog className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="package"
                            initial={{ x: -40, opacity: 0, rotate: -180 }}
                            animate={{ x: 0, opacity: 1, rotate: 0 }}
                            exit={{ x: 40, opacity: 0, rotate: 180 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <Package className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <span className="hidden sm:inline">Layanan</span>
                <span className="sm:hidden">Layanan</span>
            </motion.button>

            {/* Hubungi Kami Button */}
            <motion.button
                onMouseEnter={() => setHoverPhone(true)}
                onMouseLeave={() => setHoverPhone(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-amber-700 bg-amber-900/35 p-2.5 px-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-amber-900/50 sm:flex-none sm:justify-between sm:gap-3 sm:p-3 sm:px-4 sm:text-base md:p-4 md:px-6"
            >
                <motion.div
                    animate={
                        hoverPhone
                            ? {
                                  y: [-2, -6, -2],
                                  rotate: [0, -15, 15, -15, 15, 0],
                              }
                            : { y: 0, rotate: 0 }
                    }
                    transition={{
                        duration: 0.8,
                        repeat: hoverPhone ? Infinity : 0,
                        repeatDelay: 0.3,
                        ease: 'easeInOut',
                    }}
                >
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </motion.div>
                <span className="hidden sm:inline">Hubungi Kami</span>
                <span className="sm:hidden">Kontak</span>
            </motion.button>
        </div>
    );
}
