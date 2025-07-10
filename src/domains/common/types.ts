export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ApiError {
    message: string;
    code: string;
    status: number;
    details?: Record<string, any>;
}

export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export interface ContactInfo {
    email: string;
    phone?: string;
    alternativeEmail?: string;
} 