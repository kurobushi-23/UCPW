import { LucideIcon } from 'lucide-react';

export interface User {
    id: number;
    name: string;
    email: string;
    role?: 'admin' | 'user';
}

export interface SharedData {
    [key: string]: unknown;
    auth: {
        user: User | null;
    };
    ziggy: {
        location: string;
        url: string;
        port: null | number;
        defaults: [];
        routes: Record<string, string>;
    };
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export interface News {
    id: number;
    title: string;
    description: string;
    image?: string;
    date: string;
    author: string;
    category?: string;
    subcategory?: string;
    readTime?: number;
    likes: number;
    views: number;
}

export interface Gallery {
    id: number;
    caption: string;
    description: string;
    image?: string;
    category?: string;
    date: string;
}

export interface Review {
    id: number;
    user_id: number;
    user?: User;
    service: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: number;
    user_id: number;
    user: User;
    position: string;
    company: string;
    message: string;
    rating: number;
    avatar?: string;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
}

export interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    title?: string;
    description?: string;
    itemName?: string;
    itemType?: string;
    isLoading?: boolean;
    variant?: 'danger' | 'warning';
    confirmText?: string;
    cancelText?: string;
    showItemPreview?: boolean;
    itemPreview?: {
        image?: string;
        title?: string;
        subtitle?: string;
    };
}
