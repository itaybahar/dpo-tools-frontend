import React, { useState } from 'react';
import './DPOApplicationPage.css';

const DPOApplicationPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        certifications: '',
        availability: '',
        rateType: '',
        hourlyRate: '',
        monthlyRate: '',
        projectRate: '',
        languages: [] as string[],
        timezone: '',
        specializations: [] as string[],
        complianceFrameworks: [] as string[],
        coverLetter: ''
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Application submitted:', formData);
        // Handle form submission
    };

    return (
        <div className="dpo-application-page">
            <div className="application-container">
                <div className="application-header">
                    <h1>Apply as a Data Protection Officer</h1>
                    <p>Join our network of certified DPO professionals and help organizations achieve GDPR compliance.</p>
                </div>

                <form onSubmit={handleSubmit} className="application-form">
                    <div className="form-section">
                        <h2>Personal Information</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name *</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Professional Experience</h2>
                        <div className="form-group">
                            <label htmlFor="experience">Years of Data Protection Experience *</label>
                            <select
                                id="experience"
                                value={formData.experience}
                                onChange={(e) => handleInputChange('experience', e.target.value)}
                                required
                            >
                                <option value="">Select experience level</option>
                                <option value="1-3">1-3 years</option>
                                <option value="3-5">3-5 years</option>
                                <option value="5-10">5-10 years</option>
                                <option value="10+">10+ years</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="certifications">Relevant Certifications</label>
                            <textarea
                                id="certifications"
                                rows={3}
                                value={formData.certifications}
                                onChange={(e) => handleInputChange('certifications', e.target.value)}
                                placeholder="List any GDPR, privacy, or data protection certifications..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Specializations</label>
                            <div className="checkbox-group">
                                {['GDPR Compliance', 'Data Privacy Impact Assessments', 'Privacy by Design', 'Data Breach Response', 'Privacy Training', 'International Data Transfers', 'Vendor Management'].map((spec) => (
                                    <label key={spec} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.specializations.includes(spec)}
                                            onChange={(e) => {
                                                const newSpecs = e.target.checked
                                                    ? [...formData.specializations, spec]
                                                    : formData.specializations.filter(s => s !== spec);
                                                handleInputChange('specializations', newSpecs);
                                            }}
                                        />
                                        {spec}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Availability & Rates</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="availability">Availability *</label>
                                <select
                                    id="availability"
                                    value={formData.availability}
                                    onChange={(e) => handleInputChange('availability', e.target.value)}
                                    required
                                >
                                    <option value="">Select availability</option>
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="project-based">Project-based</option>
                                    <option value="consultation">Consultation only</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="timezone">Timezone</label>
                                <select
                                    id="timezone"
                                    value={formData.timezone}
                                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                                >
                                    <option value="">Select timezone</option>
                                    <option value="UTC">UTC</option>
                                    <option value="EST">EST (Eastern)</option>
                                    <option value="PST">PST (Pacific)</option>
                                    <option value="CET">CET (Central European)</option>
                                    <option value="GMT">GMT (Greenwich Mean)</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Rate Structure</label>
                            <div className="rate-options">
                                <div className="form-grid rate-grid">
                                    <div className="form-group">
                                        <label htmlFor="hourlyRate">Hourly Rate (€)</label>
                                        <input
                                            type="number"
                                            id="hourlyRate"
                                            value={formData.hourlyRate}
                                            onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                                            placeholder="e.g., 150"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="monthlyRate">Monthly Rate (€)</label>
                                        <input
                                            type="number"
                                            id="monthlyRate"
                                            value={formData.monthlyRate}
                                            onChange={(e) => handleInputChange('monthlyRate', e.target.value)}
                                            placeholder="e.g., 5000"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="projectRate">Project Rate (€)</label>
                                        <input
                                            type="number"
                                            id="projectRate"
                                            value={formData.projectRate}
                                            onChange={(e) => handleInputChange('projectRate', e.target.value)}
                                            placeholder="e.g., 10000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Cover Letter</h2>
                        <div className="form-group">
                            <label htmlFor="coverLetter">Tell us about yourself and why you'd like to join our DPO network *</label>
                            <textarea
                                id="coverLetter"
                                rows={6}
                                value={formData.coverLetter}
                                onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                                placeholder="Describe your experience, approach to data protection, and what makes you a great DPO..."
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary-btn">Save as Draft</button>
                        <button type="submit" className="primary-btn">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DPOApplicationPage; 