import React, { useState } from 'react';
import './GDPRComplianceAuditPage.css';

interface AuditSection {
    id: string;
    title: string;
    description: string;
    questions: AuditQuestion[];
}

interface AuditQuestion {
    id: string;
    question: string;
    options: string[];
    weight: number;
}

const GDPRComplianceAuditPage: React.FC = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [auditComplete, setAuditComplete] = useState(false);
    const [overallScore, setOverallScore] = useState(0);

    const auditSections: AuditSection[] = [
        {
            id: 'data-governance',
            title: 'Data Governance & Inventory',
            description: 'Assessment of data processing activities and documentation',
            questions: [
                {
                    id: 'data-inventory',
                    question: 'Do you maintain a comprehensive record of processing activities?',
                    options: ['Fully implemented', 'Partially implemented', 'Not implemented', 'Not applicable'],
                    weight: 10
                },
                {
                    id: 'data-mapping',
                    question: 'Have you mapped all data flows and identified data controllers/processors?',
                    options: ['Fully implemented', 'Partially implemented', 'Not implemented', 'Not applicable'],
                    weight: 8
                }
            ]
        },
        {
            id: 'legal-basis',
            title: 'Legal Basis & Consent',
            description: 'Evaluation of legal grounds for data processing',
            questions: [
                {
                    id: 'consent-management',
                    question: 'Do you have a robust consent management system?',
                    options: ['Fully implemented', 'Partially implemented', 'Not implemented', 'Not applicable'],
                    weight: 12
                },
                {
                    id: 'legal-basis-documentation',
                    question: 'Are all processing activities supported by documented legal bases?',
                    options: ['Fully implemented', 'Partially implemented', 'Not implemented', 'Not applicable'],
                    weight: 10
                }
            ]
        },
        {
            id: 'data-subject-rights',
            title: 'Data Subject Rights',
            description: 'Assessment of mechanisms to handle individual rights',
            questions: [
                {
                    id: 'rights-processes',
                    question: 'Do you have documented processes for handling data subject rights requests?',
                    options: ['Fully implemented', 'Partially implemented', 'Not implemented', 'Not applicable'],
                    weight: 15
                },
                {
                    id: 'rights-automation',
                    question: 'Are data subject rights processes automated where possible?',
                    options: ['Fully implemented', 'Partially implemented', 'Not implemented', 'Not applicable'],
                    weight: 8
                }
            ]
        }
    ];

    const handleAnswer = (questionId: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const calculateScore = () => {
        let totalScore = 0;
        let maxScore = 0;

        auditSections.forEach(section => {
            section.questions.forEach(question => {
                maxScore += question.weight;
                const answer = answers[question.id];
                if (answer === question.options[0]) totalScore += question.weight;
                else if (answer === question.options[1]) totalScore += question.weight * 0.7;
                else if (answer === question.options[2]) totalScore += question.weight * 0.3;
                else if (answer === question.options[3]) totalScore += question.weight * 0.1;
            });
        });

        return Math.round((totalScore / maxScore) * 100);
    };

    const handleNext = () => {
        if (currentSection < auditSections.length - 1) {
            setCurrentSection(currentSection + 1);
        } else {
            const score = calculateScore();
            setOverallScore(score);
            setAuditComplete(true);
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const isSectionComplete = () => {
        const currentQuestions = auditSections[currentSection].questions;
        return currentQuestions.every(q => answers[q.id]);
    };

    const getScoreMessage = (score: number) => {
        if (score >= 85) return 'Excellent! Your organization demonstrates exceptional GDPR compliance.';
        if (score >= 70) return 'Good! You have solid compliance foundations with room for improvement.';
        if (score >= 50) return 'Fair. Consider implementing additional compliance measures.';
        return 'Attention needed. Your organization should prioritize GDPR compliance improvements.';
    };

    if (auditComplete) {
        return (
            <div className="audit-complete">
                <div className="result-card">
                    <h2>GDPR Compliance Audit Complete</h2>
                    <div className="score-section">
                        <div className="score-circle">
                            <span className="score-number">{overallScore}%</span>
                        </div>
                        <p className="score-message">{getScoreMessage(overallScore)}</p>
                    </div>

                    <div className="recommendations">
                        <h3>Key Recommendations</h3>
                        <ul>
                            {overallScore < 85 && <li>Implement comprehensive data inventory and mapping</li>}
                            {overallScore < 70 && <li>Strengthen consent management systems</li>}
                            {overallScore < 50 && <li>Develop robust data subject rights processes</li>}
                            <li>Conduct regular compliance training for staff</li>
                            <li>Establish ongoing monitoring and review processes</li>
                        </ul>
                    </div>

                    <button
                        className="restart-audit-btn"
                        onClick={() => {
                            setAuditComplete(false);
                            setAnswers({});
                            setCurrentSection(0);
                            setOverallScore(0);
                        }}
                    >
                        Restart Audit
                    </button>
                </div>
            </div>
        );
    }

    const currentSectionData = auditSections[currentSection];

    return (
        <div className="gdpr-audit-container">
            <div className="audit-header">
                <h1>GDPR Compliance Audit</h1>
                <p>Comprehensive assessment of your organization's GDPR compliance status</p>

                <div className="progress-section">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentSection + 1) / auditSections.length) * 100}%` }}
                        />
                    </div>
                    <span className="progress-text">
                        Section {currentSection + 1} of {auditSections.length}
                    </span>
                </div>
            </div>

            <div className="audit-content">
                <div className="section-card">
                    <div className="section-header">
                        <h2>{currentSectionData.title}</h2>
                        <p>{currentSectionData.description}</p>
                    </div>

                    <div className="questions-container">
                        {currentSectionData.questions.map((question) => (
                            <div key={question.id} className="question-item">
                                <h3 className="question-text">{question.question}</h3>
                                <div className="options-grid">
                                    {question.options.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`option-btn ${answers[question.id] === option ? 'selected' : ''}`}
                                            onClick={() => handleAnswer(question.id, option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="navigation-buttons">
                        {currentSection > 0 && (
                            <button
                                className="nav-btn prev"
                                onClick={handlePrevious}
                            >
                                Previous Section
                            </button>
                        )}

                        <button
                            className="nav-btn next"
                            onClick={handleNext}
                            disabled={!isSectionComplete()}
                        >
                            {currentSection === auditSections.length - 1 ? 'Complete Audit' : 'Next Section'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GDPRComplianceAuditPage; 