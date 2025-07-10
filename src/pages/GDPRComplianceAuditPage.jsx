import React, { useState } from 'react';
import './GDPRComplianceAuditPage.css';

const GDPRComplianceAuditPage = () => {
    const [currentSection, setCurrentSection] = useState('overview');
    const [answers, setAnswers] = useState({});

    const auditSections = [
        { id: 'core-principles', label: 'Core Principles', number: '01', status: 'completed' },
        { id: 'lawful-basis', label: 'Lawful Basis for Processing', number: '02', status: 'active' },
        { id: 'data-subject-rights', label: 'Data Subject Rights', number: '03', status: 'pending' },
        { id: 'controller-responsibilities', label: 'Controller Responsibilities', number: '04', status: 'pending' },
        { id: 'processor-responsibilities', label: 'Processor Responsibilities', number: '05', status: 'pending' },
        { id: 'security-processing', label: 'Security of Processing', number: '06', status: 'pending' },
        { id: 'dpia', label: 'Data Protection Impact Assessment (DPIA)', number: '07', status: 'pending' },
        { id: 'international-transfers', label: 'International Data Transfers', number: '08', status: 'pending' },
        { id: 'special-categories', label: 'Special Categories & Automated Decision-Making (AI included)', number: '09', status: 'pending' },
        { id: 'dpo-governance', label: 'Data Protection Officer, R&R, Governance', number: '02', status: 'locked' },
        { id: 'supervisory-authority', label: 'Supervisory Authority & Cooperation', number: '02', status: 'pending' },
        { id: 'training-awareness', label: 'Training, Awareness & Internal Accountability', number: '02', status: 'pending' },
        { id: 'incident-breach', label: 'Incident & Breach Readiness', number: '02', status: 'pending' }
    ];

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const renderOverview = () => (
        <div className="audit-overview">
            <h1>GDPR Compliance Audit</h1>
            <p className="audit-description">
                Here there will be a text about the audit, what to expect, the scope, relevant
                stakeholders and deliverables
            </p>
            <p className="audit-instructions">
                Here we provide a short instruction description followed by the icons mikra
            </p>

            <div className="icon-legend">
                <div className="legend-item">
                    <div className="icon info-icon">ⓘ</div>
                    <span>when you can see the terminology in the relevant context</span>
                </div>
                <div className="legend-item">
                    <div className="icon support-icon">🛠️</div>
                    <span>indicating supported frameworks</span>
                </div>
                <div className="legend-item">
                    <div className="icon example-icon">📋</div>
                    <span>indicating an examples and references that will help you address the question better</span>
                </div>
                <div className="legend-item">
                    <div className="icon help-icon">❓</div>
                    <span>indicating an explaination of why this question is being asked</span>
                </div>
            </div>

            <div className="action-buttons">
                <button className="start-audit-btn" onClick={() => setCurrentSection('core-principles')}>
                    Start Audit Now
                </button>
                <button className="start-later-btn">start later</button>
            </div>
        </div>
    );

    const renderCoreGDPRPrinciples = () => (
        <div className="audit-section">
            <h1>Unit 01 GDPR Core Principles</h1>
            <p className="section-description">
                Here there will be a text explaining about this unit, to whom it applies, the
                GDPR reference and what other frameworks this unit covers.
            </p>
            <p className="conditional-text">
                Also, to which units is this unit conditional/preceding and whtether skip and
                get back later is possible or recommended
            </p>

            <div className="action-buttons">
                <button className="start-audit-btn" onClick={() => setCurrentSection('core-principles-questions')}>
                    Start Audit Now
                </button>
                <button className="start-later-btn">start later</button>
            </div>
        </div>
    );

    const renderQuestions = () => (
        <div className="audit-questions">
            <div className="question-block">
                <h3>Do third parties (e.g., service providers) process personal data on your behalf?</h3>
                <div className="radio-options">
                    <label>
                        <input
                            type="radio"
                            name="thirdPartyProcessing"
                            value="yes"
                            onChange={(e) => handleAnswerChange('thirdPartyProcessing', e.target.value)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="thirdPartyProcessing"
                            value="no"
                            onChange={(e) => handleAnswerChange('thirdPartyProcessing', e.target.value)}
                        />
                        No
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="thirdPartyProcessing"
                            value="not-sure"
                            onChange={(e) => handleAnswerChange('thirdPartyProcessing', e.target.value)}
                        />
                        Not sure
                    </label>
                </div>
            </div>

            <div className="question-block">
                <h3>Do you make the decision on what data to collect, how to use it and for how long?</h3>
                <div className="radio-options">
                    <label>
                        <input
                            type="radio"
                            name="dataDecisionMaker"
                            value="yes"
                            onChange={(e) => handleAnswerChange('dataDecisionMaker', e.target.value)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="dataDecisionMaker"
                            value="no"
                            onChange={(e) => handleAnswerChange('dataDecisionMaker', e.target.value)}
                        />
                        No
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="dataDecisionMaker"
                            value="not-sure"
                            onChange={(e) => handleAnswerChange('dataDecisionMaker', e.target.value)}
                        />
                        Not sure
                    </label>
                </div>
            </div>

            <div className="question-block">
                <h3>Do you process personal data on someone else's behalf?</h3>
                <div className="radio-options">
                    <label>
                        <input
                            type="radio"
                            name="processForOthers"
                            value="yes"
                            onChange={(e) => handleAnswerChange('processForOthers', e.target.value)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="processForOthers"
                            value="no"
                            onChange={(e) => handleAnswerChange('processForOthers', e.target.value)}
                        />
                        No
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="processForOthers"
                            value="not-sure"
                            onChange={(e) => handleAnswerChange('processForOthers', e.target.value)}
                        />
                        Not sure
                    </label>
                </div>
            </div>

            <div className="navigation-buttons">
                <button className="finish-btn">Finish and start later</button>
                <button className="start-audit-btn">Start Audit Now</button>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (currentSection) {
            case 'overview':
                return renderOverview();
            case 'core-principles':
                return renderCoreGDPRPrinciples();
            case 'core-principles-questions':
                return renderQuestions();
            default:
                return renderOverview();
        }
    };

    return (
        <div className="gdpr-audit-page">
            <div className="audit-container">
                <div className="audit-sidebar">
                    <h3>Audit Orientation</h3>
                    <div className="audit-sections">
                        {auditSections.map((section) => (
                            <div
                                key={section.id}
                                className={`audit-section-item ${section.status}`}
                                onClick={() => setCurrentSection(section.id)}
                            >
                                <div className="section-number">{section.number}</div>
                                <div className="section-label">{section.label}</div>
                                {section.status === 'locked' && <div className="lock-icon">🔒</div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="audit-main-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default GDPRComplianceAuditPage; 