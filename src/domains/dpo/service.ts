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

export interface SurveyQuestion {
    question_id: string;
    text: string;
    answer_type: 'radio' | 'dropdown';
    answer_choices: string[];
    required?: boolean;
    section_id?: string;
    section_title?: string;
}

export interface SurveySection {
    section_id: string;
    title: string;
    order?: number;
    is_current: boolean;
}

export interface SurveyResponse {
    question: SurveyQuestion;
    sidebar: {
        sections: SurveySection[];
    };
}

const API_BASE_URL = 'https://wedpo.onrender.com/api/demo';

export const surveyService = {
    async getSurveyQuestion(userId: string): Promise<SurveyResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/survey/?user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // Remove mode: 'cors' to avoid preflight issues
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            // Parse answer choices from semicolon-separated string
            const answerChoices = data.answer_choices ? data.answer_choices.split(';').map((choice: string) => choice.trim()) : [];

            return {
                question: {
                    question_id: data.question_id || 'fallback_1',
                    text: data.question || 'Sample question for demo purposes',
                    answer_type: data.answer_type || 'radio',
                    answer_choices: answerChoices.length > 0 ? answerChoices : ['Yes', 'No', 'Not sure'],
                    required: data.required || false,
                    section_id: data.section_id || 'section_1',
                    section_title: data.section_title || 'Demo Section'
                },
                sidebar: {
                    sections: [
                        {
                            section_id: 'section_1',
                            title: 'Question 1',
                            order: 1,
                            is_current: true
                        },
                        {
                            section_id: 'section_2',
                            title: 'Question 2',
                            order: 2,
                            is_current: false
                        },
                        {
                            section_id: 'section_3',
                            title: 'Question 3',
                            order: 3,
                            is_current: false
                        }
                    ]
                }
            };
        } catch (error) {
            console.warn('API call failed, using fallback data:', error);

            // Fallback data for demo purposes
            return {
                question: {
                    question_id: 'fallback_1',
                    text: 'Are you a public authority or body?',
                    answer_type: 'radio',
                    answer_choices: ['Yes', 'No'],
                    required: false,
                    section_id: 'section_1',
                    section_title: 'Demo Section'
                },
                sidebar: {
                    sections: [
                        {
                            section_id: 'section_1',
                            title: 'Question 1',
                            order: 1,
                            is_current: true
                        },
                        {
                            section_id: 'section_2',
                            title: 'Question 2',
                            order: 2,
                            is_current: false
                        },
                        {
                            section_id: 'section_3',
                            title: 'Question 3',
                            order: 3,
                            is_current: false
                        }
                    ]
                }
            };
        }
    },

    async submitAnswer(userId: string, questionId: string, answer: string): Promise<void> {
        try {
            const response = await fetch(`${API_BASE_URL}/survey/submit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // Remove mode: 'cors' to avoid preflight issues
                body: JSON.stringify({
                    user_id: userId,
                    question_id: questionId,
                    answer: answer
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Answer submitted successfully');
        } catch (error) {
            console.warn('Failed to submit answer:', error);
            // Don't throw error, just log it and continue
            // This allows the app to continue working even if API is down
        }
    }
}; 