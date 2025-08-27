import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const FooterSection = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info & Logo */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            {/* Logo Placeholder - Replace with your actual logo */}
                            <div className="mb-4 flex items-center">
                                <div className="mr-3 flex items-center justify-center rounded-lg">
                                    <img src="/logo-tr.png" alt="logo" className="h-16 w-16 lg:h-24 lg:w-24" />
                                </div>
                                <span className="text-xl font-bold">PT.PMP Karya Mandiri</span>
                            </div>

                            <p className="mb-4 leading-relaxed text-gray-300">
                                Solusi terbaik untuk kebutuhan bisnis Anda dengan layanan profesional dan berkualitas tinggi.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start">
                                    <MapPin className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-amber-400" />
                                    <span className="text-gray-300">Link.cikuasa No.03/01, Gerem, Kec. Gerogol, Kota Cilegon, Banten</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4 text-amber-400" />
                                    <span className="text-gray-300">+62 254 1234 567</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4 text-amber-400" />
                                    <span className="text-gray-300">info@pmpkaryamandiri.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Menu */}
                    <div className="lg:col-span-1">
                        <h3 className="mb-6 text-lg font-semibold text-white">Menu Utama</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href={route('home')}
                                    className="flex items-center text-gray-300 transition-colors duration-200 hover:text-amber-400"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('profile')}
                                    className="flex items-center text-gray-300 transition-colors duration-200 hover:text-amber-400"
                                >
                                    Profil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('services.index')}
                                    className="flex items-center text-gray-300 transition-colors duration-200 hover:text-amber-400"
                                >
                                    Layanan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('news.index')}
                                    className="flex items-center text-gray-300 transition-colors duration-200 hover:text-amber-400"
                                >
                                    Berita
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="lg:col-span-1">
                        <h3 className="mb-6 text-lg font-semibold text-white">Ikuti Kami</h3>
                        <div className="mb-6 flex space-x-4">
                            <a
                                href="#facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors duration-200 hover:bg-amber-600"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#twitter"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors duration-200 hover:bg-amber-600"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors duration-200 hover:bg-amber-600"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#linkedin"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors duration-200 hover:bg-amber-600"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>

                        <p className="text-sm text-gray-400">Dapatkan update terbaru dan informasi menarik dari kami</p>
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-1">
                        <h3 className="mb-6 text-lg font-semibold text-white">Lokasi Kami</h3>
                        <div className="relative">
                            {/* Map Container */}
                            <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-800">
                                {/* Simple Map Placeholder - Replace with actual map integration */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-900 to-gray-800">
                                    <div className="text-center">
                                        <MapPin className="mx-auto mb-2 h-8 w-8 text-amber-400" />
                                        <p className="text-sm text-gray-300">Cilegon, Banten</p>
                                        <p className="text-xs text-gray-400">Klik untuk melihat peta</p>
                                    </div>
                                </div>

                                {/* Overlay for clickable map */}
                                <div className="bg-opacity-20 hover:bg-opacity-10 absolute inset-0 cursor-pointer bg-black transition-all duration-200"></div>

                                {/* Real Google Maps Embed */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7936.575957913318!2d105.99035549357912!3d-5.955003499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4191daf0da4cf5%3A0xa4c8087ef7305d18!2sPT.PMP%20Karya%20Mandiri!5e0!3m2!1sid!2sid!4v1755843656249!5m2!1sid!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="PT.PMP Karya Mandiri Location"
                                    className="rounded-lg"
                                ></iframe>
                            </div>

                            <button className="mt-3 w-full rounded-lg bg-amber-600 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-amber-700">
                                Lihat di Google Maps
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="mb-4 text-sm text-gray-400 md:mb-0">© 2024 PT.PMP Karya Mandiri. All rights reserved.</div>

                        <div className="flex space-x-6 text-sm">
                            <a href="#privacy" className="text-gray-400 transition-colors duration-200 hover:text-white">
                                Kebijakan Privasi
                            </a>
                            <a href="#terms" className="text-gray-400 transition-colors duration-200 hover:text-white">
                                Syarat & Ketentuan
                            </a>
                            <a href="#sitemap" className="text-gray-400 transition-colors duration-200 hover:text-white">
                                Peta Situs
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
