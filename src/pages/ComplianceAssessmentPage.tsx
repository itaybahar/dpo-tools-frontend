import React, { useState } from 'react';
import './ComplianceAssessmentPage.css';

interface ComplianceQuestion {
    id: string;
    question: string;
    category: string;
    options: string[];
}

const ComplianceAssessmentPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [score, setScore] = useState<number | null>(null);

    const questions: ComplianceQuestion[] = [
        {
            id: 'data-inventory',
            question: 'Do you maintain a comprehensive inventory of all personal data you process?',
            category: 'Data Governance',
            options: ['Yes, fully documented', 'Partially documented', 'No documentation', 'Not sure']
        },
        {
            id: 'consent-management',
            question: 'Do you have a clear consent management system for data processing?',
            category: 'Legal Basis',
            options: ['Yes, comprehensive system', 'Basic system in place', 'No system', 'Not applicable']
        },
        {
            id: 'data-subject-rights',
            question: 'Can you efficiently handle data subject rights requests (access, rectification, deletion)?',
            category: 'Data Subject Rights',
            options: ['Yes, automated system', 'Manual process in place', 'No process', 'Not sure']
        },
        {
            id: 'data-breach',
            question: 'Do you have a data breach response plan?',
            category: 'Security & Incident Response',
            options: ['Yes, tested plan', 'Basic plan exists', 'No plan', 'Not sure']
        },
        {
            id: 'vendor-management',
            question: 'Do you assess and monitor third-party data processors?',
            category: 'Third-Party Management',
            options: ['Yes, comprehensive assessment', 'Basic assessment', 'No assessment', 'Not applicable']
        }
    ];

    const handleAnswer = (questionId: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const calculateScore = () => {
        let totalScore = 0;
        const maxScore = questions.length * 4; // 4 points per question max

        questions.forEach(question => {
            const answer = answers[question.id];
            if (answer === question.options[0]) totalScore += 4;
            else if (answer === question.options[1]) totalScore += 3;
            else if (answer === question.options[2]) totalScore += 1;
            else if (answer === question.options[3]) totalScore += 0;
        });

        return Math.round((totalScore / maxScore) * 100);
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
    };

    const getScoreMessage = (score: number) => {
        if (score >= 80) return 'Excellent! Your organization demonstrates strong GDPR compliance practices.';
        if (score >= 60) return 'Good! You have solid foundations but there\'s room for improvement.';
        if (score >= 40) return 'Fair. Consider implementing additional compliance measures.';
        return 'Attention needed. Your organization should prioritize GDPR compliance improvements.';
    };

    if (score !== null) {
        return (
            <div className="compliance-result">
                <div className="result-card">
                    <h2>Compliance Assessment Results</h2>
                    <div className="score-display">
                        <div className="score-circle">
                            <span className="score-number">{score}%</span>
                        </div>
                        <p className="score-message">{getScoreMessage(score)}</p>
                    </div>
                    <button
                        className="restart-btn"
                        onClick={() => {
                            setScore(null);
                            setAnswers({});
                            setCurrentStep(1);
                        }}
                    >
                        Take Assessment Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="compliance-assessment">
            <div className="assessment-header">
                <h1>GDPR Compliance Assessment</h1>
                <p>Evaluate your organization's GDPR compliance status</p>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(currentStep / questions.length) * 100}%` }}
                    />
                </div>
                <span className="progress-text">Question {currentStep} of {questions.length}</span>
            </div>

            <div className="question-container">
                <div className="question-card">
                    <div className="question-category">{questions[currentStep - 1].category}</div>
                    <h3 className="question-text">{questions[currentStep - 1].question}</h3>

                    <div className="options-container">
                        {questions[currentStep - 1].options.map((option, index) => (
                            <button
                                key={index}
                                className={`option-btn ${answers[questions[currentStep - 1].id] === option ? 'selected' : ''}`}
                                onClick={() => handleAnswer(questions[currentStep - 1].id, option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="navigation-buttons">
                        {currentStep > 1 && (
                            <button
                                className="nav-btn prev"
                                onClick={() => setCurrentStep(prev => prev - 1)}
                            >
                                Previous
                            </button>
                        )}

                        {currentStep < questions.length ? (
                            <button
                                className="nav-btn next"
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                disabled={!answers[questions[currentStep - 1].id]}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                className="nav-btn submit"
                                onClick={handleSubmit}
                                disabled={!answers[questions[currentStep - 1].id]}
                            >
                                Submit Assessment
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplianceAssessmentPage; 