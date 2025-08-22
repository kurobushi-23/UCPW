import Navbar from '@/components/navbar';
import { PropsWithChildren } from 'react';

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
        </main>
    );
}
