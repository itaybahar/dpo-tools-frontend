import { DPOApplication, DPOProfile } from './types';
import { ApiResponse, PaginatedResponse } from '../common/types';

const API_BASE = '/api/dpo';

export const dpoService = {
    async submitApplication(application: Partial<DPOApplication>): Promise<ApiResponse<DPOApplication>> {
        const response = await fetch(`${API_BASE}/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(application)
        });

        if (!response.ok) {
            throw new Error('Failed to submit application');
        }

        return response.json();
    },

    async getApplication(id: string): Promise<ApiResponse<DPOApplication>> {
        const response = await fetch(`${API_BASE}/applications/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get application');
        }

        return response.json();
    },

    async updateApplication(id: string, data: Partial<DPOApplication>): Promise<ApiResponse<DPOApplication>> {
        const response = await fetch(`${API_BASE}/applications/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update application');
        }

        return response.json();
    },

    async getDPOProfile(id: string): Promise<ApiResponse<DPOProfile>> {
        const response = await fetch(`${API_BASE}/profiles/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get DPO profile');
        }

        return response.json();
    },

    async searchDPOs(query: string, page: number = 1): Promise<ApiResponse<PaginatedResponse<DPOProfile>>> {
        const response = await fetch(`${API_BASE}/search?q=${query}&page=${page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to search DPOs');
        }

        return response.json();
    }
}; 