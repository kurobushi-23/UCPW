interface User {
    id: number;
    name: string;
    email: string;
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
