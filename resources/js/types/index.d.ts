import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

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

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
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

export interface Testimonial {
    id: number;
    user_id: number;
    user: User;
    position: string;
    company: string;
    message: string;
    avatar?: string;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
}
