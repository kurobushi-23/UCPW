import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

// Import komponen CRUD
import NewsCrud from '@/components/dashboard/NewsCrud';
import ReviewCrud from '@/components/dashboard/ReviewCrud';
import TestimonialCrud from '@/components/dashboard/TestimonialCrud';
import GalleryCrud from '@/components/dashboard/GalleryCrud';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <NewsCrud />
                <ReviewCrud />
                <TestimonialCrud />
                <GalleryCrud />
            </div>
        </AppLayout>
    );
}
