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
            options: ["Yes", "No"]
        },
        {
            id: 2,
            question: "Do your org's core activities require regular and systematic monitoring of individuals on a large scale?",
            options: ["Yes", "No"],
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
            }
        },
        {
            id: 3,
            question: "Do your org's core activities involve processing on a large scale 'special categories' of personal data, or 'criminal convictions or offenses data'?",
            options: ["Yes", "No"],
            tooltip: "Special categories include sensitive personal data"
        }
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
            <div className="assessment-question">
                <div className="question-header">
                    <div className="question-steps">
                        {questions.map((_, index) => (
                            <div key={index} className="step-item">
                                <span className="step-number">{index + 1}.</span>
                                <span className="step-text">
                                    {index === 0 && "Are you a public authority or body?"}
                                    {index === 1 && "Do your org's core activities require regular and systematic monitoring of individuals on a large scale?"}
                                    {index === 2 && "Do your org's core activities involve processing on a large scale 'special categories' of personal data, or 'criminal convictions or offenses data'?"}
                                </span>
                                <span className="step-answer">{answers[index + 1] || ""}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="question-content">
                    <h2>{currentQuestion}. {question.question}</h2>

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
            </div>
        );
    };

    return (
        <div className="dpo-assessment-page">
            <div className="assessment-container">
                {!showResult ? (
                    <>
                        <div className="assessment-header">
                            <h1>Do you need to appoint a Data Protection Officer (DPO)?</h1>
                            <p>The following assessment will help you determine if your organization need to appoint a Data Protection Officer (DPO).</p>
                            <button className="start-button">start now &gt;&gt;</button>
                        </div>
                        {renderQuestion()}
                    </>
                ) : (
                    renderResult()
                )}
            </div>
        </div>
    );
};

export default DPOAssessment; 