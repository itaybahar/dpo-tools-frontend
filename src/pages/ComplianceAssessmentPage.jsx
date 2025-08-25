import React, { useState } from 'react';
import './ComplianceAssessmentPage.css';

const ComplianceAssessmentPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        purpose: '',
        companyName: '',
        websiteUrl: '',
        placeOfIncorporation: '',
        organizationType: '',
        organizationSize: '',
        corporateStructure: '',
        targetJurisdictions: [],
        marketSegments: [],
        primaryAudience: '',
        targetChildren: '',
        userBaseVolume: '',
        productsCount: '2',
        productTypes: [],
        processPersonalData: '',
        processSensitiveData: '',
        thirdPartyProcessing: '',
        dataDecisionMaker: '',
        processForOthers: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="form-step">
                        <div className="step-content">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    value={formData.role}
                                    onChange={(e) => handleInputChange('role', e.target.value)}
                                >
                                    <option value="">Role</option>
                                    <option value="CEO">CEO</option>
                                    <option value="COO">COO</option>
                                    <option value="CFO">CFO</option>
                                    <option value="CISO">CISO</option>
                                    <option value="HR Executive">HR Executive</option>
                                    <option value="Project Manager">Project Manager</option>
                                    <option value="Product Manager">Product Manager</option>
                                    <option value="Data Protection Officer">Data Protection Officer</option>
                                    <option value="Legal professional">Legal professional</option>
                                    <option value="Consultant">Consultant</option>
                                    <option value="Other">Other (open text)</option>
                                </select>
                            </div>
                            <button className="next-btn" onClick={handleNext}>Let's Get started</button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="form-step">
                        <h2>About you</h2>
                        <p className="step-description">Here we explain to the user about the purpose of each step and why we ask for these details</p>

                        <div className="step-content">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <select value={formData.role} onChange={(e) => handleInputChange('role', e.target.value)}>
                                    <option value="">Role</option>
                                    <option value="CEO">CEO</option>
                                    <option value="COO">COO</option>
                                    <option value="CFO">CFO</option>
                                    <option value="CISO">CISO</option>
                                </select>
                            </div>

                            <div className="purpose-section">
                                <h3>What are you using WeDPO for? <span className="note">you can choose more than one option</span></h3>
                                <div className="radio-group">
                                    <label>
                                        <input type="radio" name="purpose" value="manage" onChange={(e) => handleInputChange('purpose', e.target.value)} />
                                        To manage privacy and data protection in the organization
                                    </label>
                                    <label>
                                        <input type="radio" name="purpose" value="assess" onChange={(e) => handleInputChange('purpose', e.target.value)} />
                                        To assess my organization's compliance level and gaps
                                    </label>
                                    <label>
                                        <input type="radio" name="purpose" value="learn" onChange={(e) => handleInputChange('purpose', e.target.value)} />
                                        To learn about privacy and data protection governance
                                    </label>
                                    <label>
                                        <input type="radio" name="purpose" value="other" onChange={(e) => handleInputChange('purpose', e.target.value)} />
                                        Other: ___________________
                                    </label>
                                </div>
                            </div>

                            <div className="navigation-buttons">
                                <button className="back-btn" onClick={handleBack}>Back</button>
                                <button className="next-btn" onClick={handleNext}>Next</button>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="form-step">
                        <h2>01 About your organization</h2>
                        <p className="step-description">Here we explain to the user about the purpose of each step and why we ask for these details</p>

                        <div className="step-content">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Company name"
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Website URL"
                                    value={formData.websiteUrl}
                                    onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Place of incorporation"
                                    value={formData.placeOfIncorporation}
                                    onChange={(e) => handleInputChange('placeOfIncorporation', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <select value={formData.organizationType} onChange={(e) => handleInputChange('organizationType', e.target.value)}>
                                    <option value="">Type</option>
                                    <option value="Non-profit">Non-profit</option>
                                    <option value="Commercial/For-profit">Commercial/For-profit</option>
                                    <option value="Public Authority or Body">Public Authority or Body</option>
                                    <option value="Other">Other: __________</option>
                                </select>
                            </div>

                            <div className="navigation-buttons">
                                <button className="back-btn" onClick={handleBack}>Back</button>
                                <button className="next-btn" onClick={handleNext}>Next</button>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="form-step">
                        <h2>04 Data Processing activities</h2>
                        <p className="step-description">Here we explain to the user about the purpose of each step and why we ask for these details</p>

                        <div className="step-content">
                            <div className="question-group">
                                <h3>Do you process <span className="highlight">personal data</span> of <span className="highlight">consumers</span> (or their users)?</h3>
                                <div className="radio-group">
                                    <label>
                                        <input type="radio" name="processPersonalData" value="yes" onChange={(e) => handleInputChange('processPersonalData', e.target.value)} />
                                        Yes
                                    </label>
                                    <label>
                                        <input type="radio" name="processPersonalData" value="no" onChange={(e) => handleInputChange('processPersonalData', e.target.value)} />
                                        No
                                    </label>
                                    <label>
                                        <input type="radio" name="processPersonalData" value="not-sure" onChange={(e) => handleInputChange('processPersonalData', e.target.value)} />
                                        Not sure
                                    </label>
                                </div>
                            </div>

                            <div className="question-group">
                                <h3>Do you process <span className="highlight">sensitive</span> or <span className="highlight">special categories</span> or criminal conviction data?</h3>
                                <div className="radio-group">
                                    <label>
                                        <input type="radio" name="processSensitiveData" value="yes" onChange={(e) => handleInputChange('processSensitiveData', e.target.value)} />
                                        Yes
                                    </label>
                                    <label>
                                        <input type="radio" name="processSensitiveData" value="no" onChange={(e) => handleInputChange('processSensitiveData', e.target.value)} />
                                        No
                                    </label>
                                    <label>
                                        <input type="radio" name="processSensitiveData" value="not-sure" onChange={(e) => handleInputChange('processSensitiveData', e.target.value)} />
                                        Not sure
                                    </label>
                                </div>
                            </div>

                            <div className="navigation-buttons">
                                <button className="back-btn" onClick={handleBack}>Back</button>
                                <button className="next-btn" onClick={handleNext}>Next</button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="form-step">
                        <h2>Assessment Complete</h2>
                        <p>Thank you for completing the assessment. We'll process your information and provide recommendations.</p>
                        <div className="navigation-buttons">
                            <button className="finish-btn">Finish and start later</button>
                            <button className="start-audit-btn">Start Audit Now</button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="compliance-assessment-page">
            <div className="assessment-container">
                <div className="sidebar">
                    <div className="step-indicator">
                        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                            <div className="step-number">01</div>
                            <div className="step-label">Personal Info</div>
                        </div>
                        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                            <div className="step-number">02</div>
                            <div className="step-label">About You</div>
                        </div>
                        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                            <div className="step-number">03</div>
                            <div className="step-label">Organization</div>
                        </div>
                        <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
                            <div className="step-number">04</div>
                            <div className="step-label">Data Processing</div>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
                    </div>
                </div>

                <div className="main-content">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default ComplianceAssessmentPage; 