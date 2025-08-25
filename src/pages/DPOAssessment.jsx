import React, { useState } from 'react';
import './DPOAssessment.css';

const DPOAssessment = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    const questions = [
        {
            id: 1,
            question: "Are you a public authority or body?",
            options: ["Yes", "No", "Not Sure", "Partially", "N/A"],
            color: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
            icon: "🏛️"
        },
        {
            id: 2,
            question: "Do your org's core activities require regular and systematic monitoring of individuals on a large scale?",
            options: ["Yes", "No", "Not Sure", "Partially", "N/A"],
            tooltip: "E.g., tracking and monitoring individuals' online behavior (web, CCTV, such as on the internet or on CCTV.",
            details: {
                title: "Large-scale processing can include:",
                items: [
                    "the numbers of data subjects;",
                    "the volume of personal data being processed;",
                    "the range of different data items being processed;",
                    "the geographical extent of the activity; and",
                    "the duration or permanence of the activity."
                ]
            },
            color: "linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)",
            icon: "📊"
        },
        {
            id: 3,
            question: "Do your org's core activities involve processing on a large scale 'special categories' of personal data, or 'criminal convictions or offenses data'?",
            options: ["Yes", "No", "Not Sure", "Partially", "N/A"],
            tooltip: "Special categories include sensitive personal data",
            color: "linear-gradient(135deg, #A8E6CF 0%, #7FCDCD 100%)",
            icon: "🔒"
        }
    ];

    const auditSteps = [
        { id: 1, title: "Public Authority Check", description: "Determine if organization is a public authority" },
        { id: 2, title: "Large Scale Monitoring", description: "Assess monitoring activities scale" },
        { id: 3, title: "Special Categories", description: "Evaluate sensitive data processing" }
    ];

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleContinue = () => {
        if (currentQuestion < questions.length) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // Calculate result based on answers
            const needsDPO = Object.values(answers).some(answer => answer === "Yes");
            setShowResult(true);
        }
    };

    const getCurrentQuestion = () => {
        return questions.find(q => q.id === currentQuestion);
    };

    const renderResult = () => {
        const needsDPO = Object.values(answers).some(answer => answer === "Yes");

        return (
            <div className="assessment-result">
                <div className="result-summary">
                    {answers[1] === "No" && answers[2] === "No" && answers[3] === "No" ? (
                        <>
                            <h2>Result:</h2>
                            <h3>Your organisation does not need a data protection officer.</h3>
                            <p>
                                Although you may not need to appoint a DPO, it's important to have someone in your organization who is
                                responsible for data protection, and you can voluntarily appoint a DPO.
                            </p>
                            <button className="service-button">Appoint your DPO as a Service</button>
                        </>
                    ) : (
                        <>
                            <h2>Result:</h2>
                            <h3>Your organisation needs a data protection officer.</h3>
                            <p>Based on your answers, your organization meets the criteria for mandatory DPO appointment under GDPR.</p>
                            <button className="service-button">Appoint your DPO as a Service</button>
                        </>
                    )}
                </div>
            </div>
        );
    };

    const renderQuestion = () => {
        const question = getCurrentQuestion();
        if (!question) return null;

        return (
            <div className="question-content">
                <h2
                    style={{
                        background: question.color,
                        boxShadow: `0 4px 15px ${question.color.includes('FF6B6B') ? 'rgba(255, 107, 107, 0.3)' : question.color.includes('4ECDC4') ? 'rgba(78, 205, 196, 0.3)' : 'rgba(168, 230, 207, 0.3)'}`
                    }}
                >
                    {currentQuestion}. {question.question}
                    <span className="question-icon">{question.icon}</span>
                </h2>

                {question.tooltip && (
                    <div className="question-tooltip">
                        <div className="tooltip-content">
                            <p>{question.tooltip}</p>
                            {question.details && (
                                <div className="tooltip-details">
                                    <h4>{question.details.title}</h4>
                                    <ul>
                                        {question.details.items.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="answer-options">
                    {question.options.map((option) => (
                        <label key={option} className="radio-option">
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={answers[question.id] === option}
                                onChange={(e) => handleAnswer(question.id, e.target.value)}
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <button
                    className="continue-button"
                    onClick={handleContinue}
                    disabled={!answers[question.id]}
                >
                    Continue
                </button>
            </div>
        );
    };

    return (
        <div className="dpo-assessment-page">
            <div className="assessment-header">
                <h1>DPO Assessment</h1>
                <p>Answer the following questions to determine if your organization needs to appoint a Data Protection Officer (DPO).</p>

                <div className="progress-section">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                        />
                    </div>
                    <span className="progress-text">
                        {currentQuestion}/{questions.length} ({Math.round((currentQuestion / questions.length) * 100)}%)
                    </span>
                </div>
            </div>

            <div className="assessment-content">
                <div className="sidebar">
                    <h3>Assessment Progress</h3>
                    <div className="progress-steps">
                        {auditSteps.map((step) => (
                            <div
                                key={step.id}
                                className={`step-item ${currentQuestion >= step.id ? 'active' : ''} ${currentQuestion > step.id ? 'completed' : ''}`}
                            >
                                <div className="step-number">{String(step.id).padStart(2, '0')}</div>
                                <div className="step-info">
                                    <div className="step-title">{step.title}</div>
                                    <div className="step-description">{step.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="main-content">
                    <div className="content-card">
                        {!showResult ? (
                            renderQuestion()
                        ) : (
                            renderResult()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DPOAssessment; 