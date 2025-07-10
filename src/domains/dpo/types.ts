export interface DPOApplication {
    id: string;
    userId: string;
    status: ApplicationStatus;
    experience: number; // years of experience
    specializations: string[];
    certifications: Certification[];
    currentRole?: string;
    company?: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum ApplicationStatus {
    DRAFT = 'DRAFT',
    SUBMITTED = 'SUBMITTED',
    UNDER_REVIEW = 'UNDER_REVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    issueDate: Date;
    expiryDate?: Date;
    verificationUrl?: string;
}

export interface DPOProfile extends DPOApplication {
    user: {
        firstName: string;
        lastName: string;
        email: string;
    };
    rating: number;
    completedProjects: number;
    activeClients: number;
    expertise: ExpertiseArea[];
}

export interface ExpertiseArea {
    id: string;
    name: string;
    description: string;
    yearsOfExperience: number;
}

export interface DPOState {
    application: DPOApplication | null;
    profile: DPOProfile | null;
    isLoading: boolean;
    error: string | null;
} 