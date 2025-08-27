import React, { useState, useEffect } from 'react';
import './DPOAssessment.css';

const DPOAssessment = () => {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentQuestionData, setCurrentQuestionData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSetup, setShowSetup] = useState(true);
    const [showQuestionnaire, setShowQuestionnaire] = useState(false);
    const [showCompletion, setShowCompletion] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});

    // Generate random user ID for each session automatically
    const [userId] = useState(() => Math.floor(Math.random() * 1000000) + 100000);

    // Single API endpoint as specified
    const API_ENDPOINT = 'https://wedpo.onrender.com/api/survey';

    // Section colors for visual appeal
    const sectionColors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
        '#FAD7A0', '#A9DFBF', '#F5B7B1', '#AED6F1', '#D2B4DE'
    ];

    const startQuestionnaire = () => {
        // Automatically use the generated user ID
        setCurrentUserId(userId);

        setShowSetup(false);
        setShowQuestionnaire(true);
        setShowCompletion(false);
        setError(null);

        // Load question immediately with the current userId
        loadCurrentQuestionWithId(userId);
    };

    const resetQuestionnaire = () => {
        setShowSetup(true);
        setShowQuestionnaire(false);
        setShowCompletion(false);
        setCurrentQuestionData(null);
        setUserAnswers({});
        setError(null);
        // Generate new user ID for new session
        const newUserId = Math.floor(Math.random() * 1000000) + 100000;
        setCurrentUserId(newUserId);
    };

    const loadCurrentQuestionWithId = async (userId) => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('Loading question for user ID:', userId);
            const response = await fetch(`${API_ENDPOINT}/?user_id=${userId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to load question');
            }

            if (data.completed) {
                displayCompletion();
                return;
            }

            setCurrentQuestionData(data);
            console.log('Question loaded:', data);

        } catch (error) {
            console.error('Error loading question:', error);
            setError('Error loading question: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const loadCurrentQuestion = async () => {
        // Use the current user ID from state
        if (currentUserId) {
            await loadCurrentQuestionWithId(currentUserId);
        }
    };

    const renderSidebar = (sidebarData) => {
        if (!sidebarData || !sidebarData.sections) return null;

        return (
            <div className="sidebar">
                <h3>Sections</h3>
                <div className="sections-list">
                    {sidebarData.sections.map((section, index) => {
                        // Determine if section is completed based on progress
                        const isCompleted = currentQuestionData?.progress &&
                            index < Math.floor((currentQuestionData.progress.answered / currentQuestionData.progress.total) * sidebarData.sections.length);

                        return (
                            <div
                                key={section.section_id}
                                className={`section ${section.is_current ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}
                                style={{
                                    '--section-color': sectionColors[index % sectionColors.length]
                                }}
                            >
                                <span className="section-number">{String(section.order).padStart(2, '0')}</span>
                                <span className="section-title">{section.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderProgress = (progressData) => {
        if (!progressData) return null;

        return (
            <div className="progress-section">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressData.percentage}%` }}
                    />
                </div>
                <span className="progress-text">
                    Progress: {progressData.answered}/{progressData.total} ({progressData.percentage}%)
                </span>
            </div>
        );
    };

    const renderQuestion = (data) => {
        if (!data || !data.question) return null;

        const question = data.question;

        const renderAnswerOptions = () => {
            if (question.answer_type === 'radio' && question.answer_choices && question.answer_choices.length > 0) {
                return (
                    <div className="answer-options">
                        {question.answer_choices.map((choice, index) => (
                            <div key={index} className="answer-option">
                                <input
                                    type="radio"
                                    id={`choice-${index}`}
                                    name="answer"
                                    value={choice}
                                    checked={userAnswers[question.question_id] === choice}
                                    onChange={(e) => setUserAnswers(prev => ({ ...prev, [question.question_id]: e.target.value }))}
                                />
                                <label htmlFor={`choice-${index}`}>{choice}</label>
                            </div>
                        ))}
                    </div>
                );
            } else if (question.answer_type === 'checkbox' && question.answer_choices && question.answer_choices.length > 0) {
                return (
                    <div className="answer-options">
                        {question.answer_choices.map((choice, index) => (
                            <div key={index} className="answer-option">
                                <input
                                    type="checkbox"
                                    id={`choice-${index}`}
                                    name="answer"
                                    value={choice}
                                    checked={userAnswers[question.question_id]?.includes(choice) || false}
                                    onChange={(e) => {
                                        const currentAnswers = userAnswers[question.question_id] || [];
                                        if (e.target.checked) {
                                            setUserAnswers(prev => ({
                                                ...prev,
                                                [question.question_id]: [...currentAnswers, choice]
                                            }));
                                        } else {
                                            setUserAnswers(prev => ({
                                                ...prev,
                                                [question.question_id]: currentAnswers.filter(a => a !== choice)
                                            }));
                                        }
                                    }}
                                />
                                <label htmlFor={`choice-${index}`}>{choice}</label>
                            </div>
                        ))}
                    </div>
                );
            } else if ((question.answer_type === 'select' || question.answer_type === 'dropdown' || question.answer_type === 'yesno') && question.answer_choices && question.answer_choices.length > 0) {
                // Convert dropdowns to radio buttons for better UX
                return (
                    <div className="answer-options">
                        {question.answer_choices.map((choice, index) => (
                            <div key={index} className="answer-option">
                                <input
                                    type="radio"
                                    id={`choice-${index}`}
                                    name="answer"
                                    value={choice}
                                    checked={userAnswers[question.question_id] === choice}
                                    onChange={(e) => setUserAnswers(prev => ({ ...prev, [question.question_id]: e.target.value }))}
                                />
                                <label htmlFor={`choice-${index}`}>{choice}</label>
                            </div>
                        ))}
                    </div>
                );
            } else if (question.answer_type === 'textarea') {
                return (
                    <div className="answer-options">
                        <textarea
                            placeholder="Enter your answer"
                            rows="4"
                            value={userAnswers[question.question_id] || ''}
                            onChange={(e) => setUserAnswers(prev => ({ ...prev, [question.question_id]: e.target.value }))}
                        />
                    </div>
                );
            } else {
                return (
                    <div className="answer-options">
                        <input
                            type="text"
                            placeholder="Enter your answer"
                            value={userAnswers[question.question_id] || ''}
                            onChange={(e) => setUserAnswers(prev => ({ ...prev, [question.question_id]: e.target.value }))}
                        />
                    </div>
                );
            }
        };

        return (
            <div className="question-container">
                <div className="question">
                    <h2>{question.text}</h2>
                    {renderAnswerOptions()}
                    <button
                        onClick={submitAnswer}
                        className="submit-btn"
                        disabled={!userAnswers[question.question_id] || (Array.isArray(userAnswers[question.question_id]) && userAnswers[question.question_id].length === 0)}
                    >
                        Submit Answer
                    </button>
                </div>
            </div>
        );
    };

    const submitAnswer = async () => {
        if (!currentQuestionData || !currentQuestionData.question) return;

        const question = currentQuestionData.question;
        const answerValue = userAnswers[question.question_id];

        if (!answerValue || (Array.isArray(answerValue) && answerValue.length === 0)) {
            setError('Please provide an answer');
            return;
        }

        // Save answer locally in JavaScript
        setUserAnswers(prev => ({ ...prev, [question.question_id]: answerValue }));

        // Clear any previous errors
        setError(null);

        // Show loading state
        setIsLoading(true);

        try {
            // Send answer to API without refreshing the page
            const response = await fetch(`${API_ENDPOINT}/submit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: currentUserId,
                    question_id: question.question_id,
                    answer: answerValue
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit answer');
            }

            console.log('Answer submitted successfully:', data);

            // After successful submission, load next question
            setTimeout(() => {
                // Check if this was the last question
                if (currentQuestionData.progress &&
                    currentQuestionData.progress.answered >= currentQuestionData.progress.total - 1) {
                    // This was the last question, show completion
                    displayCompletion();
                } else {
                    // Load next question
                    loadCurrentQuestion();
                }
                setIsLoading(false);
            }, 500);

        } catch (error) {
            console.error('Error submitting answer:', error);
            setError('Error submitting answer: ' + error.message);
            setIsLoading(false);
        }
    };

    const displayCompletion = () => {
        setShowQuestionnaire(false);
        setShowCompletion(true);
    };

    const submitAllAnswers = async () => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('Submitting all answers for user ID:', currentUserId);
            console.log('User answers:', userAnswers);

            const response = await fetch(`${API_ENDPOINT}/submit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: currentUserId,
                    answers: userAnswers
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit assessment');
            }

            console.log('Assessment submitted successfully:', data);
            // Show success message or redirect as needed

        } catch (error) {
            console.error('Error submitting assessment:', error);
            setError('Error submitting assessment: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (showSetup) {
        return (
            <div className="dpo-assessment-page">
                <div className="assessment-header">
                    <h1>DPO Assessment</h1>
                    <p>Complete the comprehensive GDPR compliance assessment to evaluate your organization's data protection practices.</p>
                </div>

                <div className="setup-container">
                    <div className="setup-card">
                        <h2>Start Your Assessment</h2>
                        <p>Your unique session ID has been generated automatically:</p>

                        <div className="user-id-display">
                            <div className="user-id-box">
                                <span className="user-id-label">Session ID:</span>
                                <span className="user-id-value">{userId}</span>
                            </div>
                            <button onClick={startQuestionnaire} className="start-btn">
                                Start Assessment
                            </button>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <div className="setup-info">
                            <p><strong>Assessment includes:</strong></p>
                            <ul>
                                <li>20 comprehensive sections</li>
                                <li>GDPR compliance evaluation</li>
                                <li>Real-time progress tracking</li>
                                <li>Detailed section navigation</li>
                                <li>Unique color-coded sections</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (showCompletion) {
        return (
            <div className="dpo-assessment-page">
                <div className="assessment-header">
                    <h1>Assessment Complete!</h1>
                    <p>Thank you for completing the DPO Assessment.</p>
                </div>

                <div className="completion-container">
                    <div className="completion-card">
                        <h2>🎉 Assessment Finished</h2>
                        <p>You have successfully completed all sections of the GDPR compliance assessment.</p>

                        <div className="completion-summary">
                            <h3>Summary</h3>
                            <p>Total Questions: {currentQuestionData?.progress?.total || 'N/A'}</p>
                            <p>Questions Answered: {currentQuestionData?.progress?.answered || 'N/A'}</p>
                            <p>Completion Rate: {currentQuestionData?.progress?.percentage || 'N/A'}%</p>
                        </div>

                        {error && (
                            <div className="error-message">
                                <p>Error: {error}</p>
                            </div>
                        )}

                        <div className="completion-actions">
                            <button
                                onClick={submitAllAnswers}
                                className="submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Submitting...' : 'Submit Assessment'}
                            </button>

                            <button onClick={resetQuestionnaire} className="reset-btn">
                                Start New Assessment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dpo-assessment-page">
            <div className="assessment-header">
                <h1>DPO Assessment</h1>
                <p>Complete the comprehensive GDPR compliance assessment to evaluate your organization's data protection practices.</p>

                {currentQuestionData?.progress && renderProgress(currentQuestionData.progress)}
            </div>

            <div className="assessment-content">
                {currentQuestionData?.sidebar && renderSidebar(currentQuestionData.sidebar)}

                <div className="main-content">
                    <div className="content-card">
                        {isLoading ? (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <p>Loading question...</p>
                            </div>
                        ) : error ? (
                            <div className="error-container">
                                <div className="error-message">
                                    <h2>Error</h2>
                                    <p>{error}</p>
                                    <button onClick={loadCurrentQuestion} className="retry-button">
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        ) : (
                            currentQuestionData && renderQuestion(currentQuestionData)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DPOAssessment; 