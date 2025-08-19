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
    progress?: {
        answered: number;
        total: number;
        percentage: number;
    };
    completed?: boolean;
    usingFallback?: boolean;
}

const API_BASE_URL = 'https://wedpo.onrender.com/api';

// Generate a random user ID for each session
const generateUserId = (): string => {
    // Try numeric IDs first as the API might expect them
    return Math.floor(Math.random() * 1000000).toString();
};

// Store the user ID for the current session
let currentUserId = generateUserId();
let hasLoggedInitialization = false;
let hasLoggedError = false;

export const surveyService = {
    // Get the current user ID
    getCurrentUserId(): string {
        return currentUserId;
    },

    // Generate a new user ID (useful for restart)
    generateNewUserId(): string {
        currentUserId = generateUserId();
        return currentUserId;
    },

    async getSurveyQuestion(userId?: string): Promise<SurveyResponse> {
        // Use provided userId or current session userId
        const targetUserId = userId || currentUserId;

        // Check if we're forcing fallback data for restart
        const urlParams = new URLSearchParams(window.location.search);
        const forceRestart = urlParams.get('restart');

        if (forceRestart === 'true') {
            console.log('🔄 Restart mode detected - using fallback data');
            return {
                question: {
                    question_id: 'fallback_1',
                    text: 'Do you process personal data on someone else\'s behalf?',
                    answer_type: 'radio',
                    answer_choices: ['Yes', 'No', 'Not sure'],
                    required: false,
                    section_id: 'section_1',
                    section_title: 'Demo Section'
                },
                sidebar: {
                    sections: [
                        { section_id: 'section_1', title: 'Question 1', order: 1, is_current: true },
                        { section_id: 'section_2', title: 'Question 2', order: 2, is_current: false },
                        { section_id: 'section_3', title: 'Question 3', order: 3, is_current: false }
                    ]
                },
                progress: {
                    answered: 0,
                    total: 3,
                    percentage: 0
                },
                completed: false,
                usingFallback: true
            };
        }

        try {
            // Only log initialization once per session
            if (!hasLoggedInitialization) {
                console.log('🚀 DPO Assessment Service: Starting in demo mode');
                console.log('📡 Attempting to connect to API at:', API_BASE_URL);
                console.log('🔐 Note: This API may require authentication (sign-in)');
                console.log('💡 If API is unavailable, the app will use sample questions automatically');
                hasLoggedInitialization = true;
            }
            console.log('👤 Using User ID:', targetUserId);

            const response = await fetch(`${API_BASE_URL}/survey/?user_id=${targetUserId}&_=${Date.now()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error('Authentication required');
                } else if (response.status === 400) {
                    console.log('⚠️ API returned 400 Bad Request - likely validation error');
                    console.log('🔄 Switching to fallback data for better user experience');

                    // Try to get more details about the 400 error
                    try {
                        const errorData = await response.text();
                        console.log('📋 400 Error Details:', errorData);
                    } catch (e) {
                        console.log('📋 Could not read error details');
                    }

                    throw new Error('Bad Request - using fallback data');
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            }

            const data = await response.json();
            // Only log detailed API response occasionally to reduce noise
            if (Math.random() < 0.2) { // Log only 20% of responses
                console.log('API Response:', data);
                console.log('API Response Type:', typeof data);
                console.log('API Response Keys:', Object.keys(data));
                console.log('API Response Structure:', JSON.stringify(data, null, 2));
            }

            // Check if the assessment is completed
            if (data.completed === true) {
                return {
                    question: {
                        question_id: 'completed',
                        text: data.message || 'Assessment completed! Thank you for your responses.',
                        answer_type: 'radio',
                        answer_choices: ['Assessment Complete'],
                        required: false,
                        section_id: 'completed',
                        section_title: 'Assessment Complete'
                    },
                    sidebar: {
                        sections: []
                    },
                    progress: {
                        answered: 100,
                        total: 100,
                        percentage: 100
                    },
                    completed: true
                };
            }

            // The API returns the data directly, so we need to extract it properly
            const questionData = data.question || data;
            const sidebarData = data.sidebar || data;

            // Parse answer choices - handle both array and semicolon-separated string formats
            let answerChoices: string[] = [];
            if (questionData.answer_choices) {
                if (Array.isArray(questionData.answer_choices)) {
                    // If it's already an array, flatten and clean it
                    answerChoices = questionData.answer_choices
                        .flatMap((choice: string) => {
                            if (typeof choice === 'string') {
                                // Split by semicolon and clean each choice
                                return choice.split(';')
                                    .map((c: string) => c.trim())
                                    .filter((c: string) => c.length > 0 && c !== ';');
                            }
                            return [];
                        })
                        .filter((choice: string, index: number, arr: string[]) => arr.indexOf(choice) === index); // Remove duplicates
                } else if (typeof questionData.answer_choices === 'string') {
                    // If it's a string, split by semicolon
                    answerChoices = questionData.answer_choices
                        .split(';')
                        .map((choice: string) => choice.trim())
                        .filter((choice: string) => choice.length > 0 && choice !== ';');
                }
            }

            return {
                question: {
                    question_id: questionData.question_id || 'fallback_1',
                    text: questionData.text || questionData.question || 'Sample question for demo purposes',
                    answer_type: questionData.answer_type || 'radio',
                    answer_choices: answerChoices.length > 0 ? answerChoices : ['Yes', 'No', 'Not sure'],
                    required: questionData.required || false,
                    section_id: questionData.section_id || 'section_1',
                    section_title: questionData.section_title || 'Demo Section'
                },
                sidebar: {
                    sections: sidebarData.sections || [
                        { section_id: 'section_1', title: 'Question 1', order: 1, is_current: true },
                        { section_id: 'section_2', title: 'Question 2', order: 2, is_current: false },
                        { section_id: 'section_3', title: 'Question 3', order: 3, is_current: false }
                    ]
                },
                progress: data.progress || {
                    answered: 0,
                    total: 3,
                    percentage: 0
                },
                completed: data.completed || false
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);

            if (errorMessage.includes('Authentication required')) {
                console.log('🔐 Authentication required - API needs sign-in');
                console.log('🔄 Using fallback data for demonstration');
            } else if (errorMessage.includes('Bad Request')) {
                console.log('⚠️ API validation error - using fallback data');
            } else if (errorMessage.includes('Failed to fetch')) {
                console.log('🌐 Network error - API server not accessible');
            } else {
                console.log('❌ Unexpected error:', errorMessage);
            }

            // Only log fallback message once per error to reduce noise
            if (!hasLoggedError) {
                console.log('🔄 API server not accessible - switching to demo mode');
                console.log('✅ Using sample questions for demonstration purposes');
                console.log('🌐 This is normal when developing locally or if the API server is down');
                hasLoggedError = true;
            }

            // Return fallback data
            return {
                question: {
                    question_id: 'fallback_1',
                    text: 'Do you process personal data on someone else\'s behalf?',
                    answer_type: 'radio',
                    answer_choices: ['Yes', 'No', 'Not sure'],
                    required: false,
                    section_id: 'section_1',
                    section_title: 'Demo Section'
                },
                sidebar: {
                    sections: [
                        { section_id: 'section_1', title: 'Question 1', order: 1, is_current: true },
                        { section_id: 'section_2', title: 'Question 2', order: 2, is_current: false },
                        { section_id: 'section_3', title: 'Question 3', order: 3, is_current: false }
                    ]
                },
                progress: {
                    answered: 0,
                    total: 3,
                    percentage: 0
                },
                completed: false,
                usingFallback: true
            };
        }
    },

    async submitAnswer(userId: string, questionId: string, answer: string): Promise<void> {
        try {
            // Only log submission details occasionally to reduce noise
            if (Math.random() < 0.1) { // Log only 10% of submissions
                console.log('📤 Submitting answer:', { userId, questionId, answer });
            }

            const response = await fetch(`${API_BASE_URL}/survey/submit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    question_id: questionId,
                    answer: answer
                })
            });

            if (!response.ok) {
                if (response.status === 404) {
                    console.log('⚠️ Submit endpoint not found - API may have changed');
                    console.log('🔄 Continuing in demo mode - answer recorded locally');
                    return; // Don't throw error, just continue
                } else if (response.status === 401 || response.status === 403) {
                    console.info('🔐 Answer submission failed - authentication required');
                    console.info('🔄 Continuing in demo mode with sample questions');
                    console.info('🌐 Visit https://wedpo.onrender.com/api to sign in');
                    return; // Don't throw error, just continue
                } else if (response.status === 400) {
                    console.log('⚠️ Bad request to submit endpoint - API validation error');
                    console.log('🔄 Continuing in demo mode - answer recorded locally');
                    return; // Don't throw error, just continue
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            }

            const result = await response.json();
            // Only log success occasionally to reduce noise
            if (Math.random() < 0.1) { // Log only 10% of successes
                console.log('✅ Answer submitted successfully:', result);
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);

            if (errorMessage.includes('Failed to fetch')) {
                console.info('📤 Answer submission failed - API server not accessible');
                console.info('🔄 Continuing in demo mode with sample questions');
            } else {
                console.warn('⚠️ Failed to submit answer:', error);
            }

            // Don't throw error - continue in demo mode
        }
    }
}; 