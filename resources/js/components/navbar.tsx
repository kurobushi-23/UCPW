import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { AlignRight, Milestone, SquareArrowOutUpRight, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';

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
        // { name: 'Tentang Kami', route: 'about' },
    ];

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Component untuk Modal Auth (untuk reusability di desktop dan mobile)
    const AuthModal = () => (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex cursor-pointer items-center rounded px-4 py-1 text-sm text-[#1b1b18] dark:text-[#EDEDEC]">
                    <Milestone className="mr-2 h-7 w-7 text-amber-600" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Masuk atau Daftar</DialogTitle>
                    <DialogDescription>Pilih tab untuk masuk atau daftar</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="masuk" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="masuk">Masuk</TabsTrigger>
                        <TabsTrigger value="daftar">Daftar</TabsTrigger>
                    </TabsList>

                    <TabsContent value="masuk">
                        <form className="mt-4 flex h-52 flex-col justify-between gap-3">
                            <div className="flex flex-col gap-3">
                                <Input type="email" placeholder="Email" />
                                <Input type="password" placeholder="Password" />
                            </div>
                            <button className="mt-2 rounded-2xl bg-amber-600 px-3 py-2 text-white hover:bg-orange-600">Masuk</button>
                        </form>
                    </TabsContent>

                    <TabsContent value="daftar">
                        <form className="mt-4 flex h-52 flex-col justify-between gap-3">
                            <div className="flex flex-col gap-3">
                                <Input type="text" placeholder="Nama" />
                                <Input type="email" placeholder="Email" />
                                <Input type="password" placeholder="Password" />
                            </div>
                            <button className="mt-2 rounded-2xl bg-amber-600 px-3 py-2 text-white hover:bg-orange-600">Daftar</button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );

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
                        // Perbaiki logika pengecekan active route
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
                                } `}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Auth Links */}
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-sm border border-[#19140035] px-4 py-1 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            <SquareArrowOutUpRight className="mr-2 h-7 w-7 text-amber-600" />
                        </Link>
                    ) : (
                        <AuthModal />
                    )}
                </div>

                {/* Hamburger Button */}
                <button
                    className="flex items-center rounded border border-[#19140035] px-2 py-1 text-[#1b1b18] hover:border-[#1915014a] md:hidden dark:text-[#EDEDEC]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <XIcon className="h-4 w-4" /> : <AlignRight className="h-4 w-4" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="bg-white/10 px-4 pb-4 backdrop-blur md:hidden">
                    {/* Menu Items dengan style hover yang sama seperti desktop */}
                    {menuItems.map((item) => {
                        // Perbaiki logika pengecekan active route untuk mobile
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
                                } `}
                                onClick={() => setIsOpen(false)} // Close mobile menu when link clicked
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Auth Section di Mobile */}
                    <div className="mt-4 border-t border-gray-300/20 pt-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="flex items-center rounded-sm border border-[#19140035] px-4 py-2 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                onClick={() => setIsOpen(false)}
                            >
                                <SquareArrowOutUpRight className="mr-2 h-5 w-5 text-amber-600" />
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex justify-center">
                                <AuthModal />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
