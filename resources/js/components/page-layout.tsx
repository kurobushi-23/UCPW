import Navbar from '@/components/navbar';
import { PropsWithChildren } from 'react';
import { Toaster } from './ui/sonner';

type PageLayoutProps = PropsWithChildren;

export function PageLayout({ children }: PageLayoutProps) {
    return (
        <main className="min-h-screen bg-white">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-50 w-full">
                <Navbar />
            </div>

            {/* Page Content */}
            <div className="w-full">{children}</div>
            <Toaster position="top-center" richColors closeButton />
        </main>
    );
}
