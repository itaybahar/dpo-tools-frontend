import { AuthCredentials, AuthResponse, SignUpData, User } from './types';
import { ApiResponse } from '../common/types';

const API_BASE = '/api/auth';

export const authService = {
    async login(credentials: AuthCredentials): Promise<ApiResponse<AuthResponse>> {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    },

    async signUp(data: SignUpData): Promise<ApiResponse<AuthResponse>> {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Sign up failed');
        }

        return response.json();
    },

    async getCurrentUser(): Promise<ApiResponse<User>> {
        const response = await fetch(`${API_BASE}/me`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get current user');
        }

        return response.json();
    },

    async logout(): Promise<void> {
        localStorage.removeItem('token');
    }
}; 