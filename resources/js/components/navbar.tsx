import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { AlignRight, LogOut, Milestone, SquareArrowOutUpRight, XIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import AuthModal from './auth-modal';

const Navbar = () => {
    const { auth } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const currentRouteName = route().current();

    const menuItems = [
        { name: 'Home', route: 'home' },
        { name: 'Profil', route: 'profile' },
        { name: 'Layanan', route: 'services' },
        { name: 'Berita', route: 'news' },
    ];

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = useCallback(() => {
        router.post(route('logout'));
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <header
            className={`fixed top-0 z-50 w-full text-sm transition-colors duration-300 ${
                isScrolled ? 'bg-white/10 backdrop-blur' : 'bg-transparent'
            }`}
        >
            <nav className="mx-auto flex w-full items-center justify-between px-7 lg:max-w-7xl">
                {/* Logo */}
                <Link href={route('home')}>
                    <img src="/logo-tr.png" alt="logo" className="h-16 w-16 lg:h-24 lg:w-24" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden items-center justify-between gap-6 md:flex">
                    {menuItems.map((item) => {
                        const active =
                            currentRouteName === item.route || (item.route === 'home' && (currentRouteName === null || currentRouteName === 'home'));
                        return (
                            <Link
                                key={item.name}
                                href={route(item.route)}
                                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                                    active ? 'text-amber-600' : 'text-[#1b1b18] dark:text-[#EDEDEC]'
                                } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amber-600 after:transition-all after:duration-300 hover:after:w-full ${
                                    active ? 'after:w-full' : 'after:w-0'
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Auth Section Desktop */}
                    {auth.user ? (
                        auth.user.role === 'admin' ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-sm border border-[#19140035] px-4 py-1 text-sm text-[#1b1b18] transition-colors hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                title="Dashboard"
                            >
                                <SquareArrowOutUpRight className="mr-2 h-7 w-7 text-amber-600" />
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="rounded-sm border border-[#19140035] px-4 py-1 text-sm text-[#1b1b18] transition-colors hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                title="Keluar"
                            >
                                <LogOut className="mr-2 h-7 w-7 text-amber-600" />
                            </button>
                        )
                    ) : (
                        <AuthModal>
                            <button className="flex cursor-pointer items-center rounded px-4 py-1 text-sm text-[#1b1b18] transition-colors hover:bg-amber-600/10 dark:text-[#EDEDEC]">
                                <Milestone className="mr-2 h-7 w-7 text-amber-600" />
                            </button>
                        </AuthModal>
                    )}
                </div>

                {/* Hamburger Button */}
                <button
                    className="flex items-center rounded border border-[#19140035] px-2 py-1 text-[#1b1b18] transition-colors hover:border-[#1915014a] md:hidden dark:text-[#EDEDEC]"
                    onClick={toggleMenu}
                >
                    {isOpen ? <XIcon className="h-4 w-4" /> : <AlignRight className="h-4 w-4" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="bg-white/10 px-4 pb-4 backdrop-blur md:hidden">
                    {/* Menu Items */}
                    {menuItems.map((item) => {
                        const active =
                            currentRouteName === item.route || (item.route === 'home' && (currentRouteName === null || currentRouteName === 'home'));
                        return (
                            <Link
                                key={item.name}
                                href={route(item.route)}
                                className={`relative block px-3 py-2 text-sm font-medium transition-colors ${
                                    active ? 'text-amber-600' : 'text-[#1b1b18] dark:text-[#EDEDEC]'
                                } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amber-600 after:transition-all after:duration-300 hover:after:w-full ${
                                    active ? 'after:w-full' : 'after:w-0'
                                }`}
                                onClick={closeMenu}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Auth Section Mobile */}
                    <div className="mt-4 border-t border-gray-300/20 pt-4">
                        {auth.user ? (
                            auth.user.role === 'admin' ? (
                                <Link
                                    href={route('dashboard')}
                                    className="flex items-center rounded-sm border border-[#19140035] px-4 py-2 text-sm text-[#1b1b18] transition-colors hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    onClick={closeMenu}
                                >
                                    <SquareArrowOutUpRight className="mr-2 h-5 w-5 text-amber-600" />
                                    Dashboard
                                </Link>
                            ) : (
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleLogout();
                                    }}
                                    className="flex w-full items-center rounded-sm border border-[#19140035] px-4 py-2 text-sm text-[#1b1b18] transition-colors hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    <LogOut className="mr-2 h-5 w-5 text-amber-600" />
                                    Keluar
                                </button>
                            )
                        ) : (
                            <div className="flex justify-center">
                                <AuthModal>
                                    <button
                                        onClick={closeMenu}
                                        className="flex cursor-pointer items-center rounded px-4 py-1 text-sm text-[#1b1b18] transition-colors hover:bg-amber-600/10 dark:text-[#EDEDEC]"
                                    >
                                        <Milestone className="mr-2 h-7 w-7 text-amber-600" />
                                        <span>Masuk</span>
                                    </button>
                                </AuthModal>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
