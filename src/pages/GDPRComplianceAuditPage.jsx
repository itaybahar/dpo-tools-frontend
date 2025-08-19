import React, { useState, useEffect } from 'react';
import { surveyService } from '../domains/dpo/service';
import './GDPRComplianceAuditPage.css';

const GDPRComplianceAuditPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarSections, setSidebarSections] = useState([]);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [selectedAnswer, setSelectedAnswer] = useState('');

    useEffect(() => {
        // Load the first question using current user ID
        const userId = surveyService.getCurrentUserId();
        loadNextQuestion(userId);
    }, []);

    const loadNextQuestion = async (userId) => {
        try {
            setLoading(true);
            setError(null);
            // setSelectedAnswer(''); // This line was removed to avoid resetting selected answer too early

            const response = await surveyService.getSurveyQuestion(userId);
            setCurrentQuestion(response.question);
            setSidebarSections(response.sidebar.sections);

            // Calculate progress - use API data if available, otherwise calculate from sections
            if (response.progress) {
                setProgress({
                    current: Math.min(response.progress.answered + 1, response.progress.total),
                    total: response.progress.total
                });
            } else {
                const currentIndex = response.sidebar.sections.findIndex(s => s.is_current);
                const totalSections = response.sidebar.sections.length;
                setProgress({
                    current: Math.min(currentIndex + 1, totalSections),
                    total: totalSections
                });
            }

            // Clean up restart parameter after successful load
            if (response.question.question_id !== 'completed') {
                const url = new URL(window.location);
                url.searchParams.delete('restart');
                window.history.replaceState({}, '', url);
            }

        } catch (err) {
            setError('Failed to load question');
            console.error('Error loading question:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (questionId, answer) => {
        // Only update the selected answer, don't submit yet
        setSelectedAnswer(answer);
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmitAnswer = async () => {
        if (!selectedAnswer || !currentQuestion) return;

        try {
            // Submit the answer using current user ID
            const userId = surveyService.getCurrentUserId();
            await surveyService.submitAnswer(userId, currentQuestion.question_id, selectedAnswer);
            console.log('Answer submitted:', selectedAnswer);

            // Reset selected answer
            setSelectedAnswer('');

            // Small delay to allow backend to advance state before fetching next question
            setTimeout(() => {
                // Load the next question using current user ID
                loadNextQuestion(userId);
            }, 120);
        } catch (error) {
            console.error('Error submitting answer:', error);
            setError('Failed to submit answer');
        }
    };

    const restartAssessment = () => {
        // Reset all state to initial values
        setCurrentQuestion(null);
        setSelectedAnswer('');
        setLoading(true);
        setError(null);
        setProgress({ current: 0, total: 0 });
        setSidebarSections([]);

        // Generate a new user ID to start fresh with the API
        const newUserId = surveyService.generateNewUserId();

        // Add restart parameter to URL to force fallback data
        const url = new URL(window.location);
        url.searchParams.set('restart', 'true');
        window.history.replaceState({}, '', url);

        // Add a small delay to ensure state is properly reset
        setTimeout(() => {
            loadNextQuestion(newUserId);
        }, 100);
    };

    const renderQuestion = () => {
        if (!currentQuestion) return null;

        // Check if assessment is completed
        if (currentQuestion.question_id === 'completed') {
            return (
                <div className="audit-questions">
                    <div className="question-block completion-message">
                        <h3>🎉 Assessment Complete!</h3>
                        <p>{currentQuestion.text}</p>
                        <div className="completion-summary">
                            <p><strong>Progress:</strong> {Math.min(progress.current, progress.total)}/{progress.total} questions completed</p>
                            <p><strong>Percentage:</strong> {Math.min(Math.round((progress.current / progress.total) * 100), 100)}%</p>
                        </div>
                        <button
                            className="restart-assessment-btn"
                            onClick={restartAssessment}
                        >
                            Restart Assessment
                        </button>
                    </div>
                </div>
            );
        }

        const questionText = currentQuestion.text || currentQuestion.question || 'Question loading...';
        const answerChoices = currentQuestion.answer_choices || ['Yes', 'No'];

        return (
            <div className="audit-questions">
                <div className="question-block">
                    <h3>{questionText}</h3>
                    <div className="radio-options">
                        {answerChoices.map((choice, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.question_id || 'default'}`}
                                    value={choice}
                                    checked={selectedAnswer === choice}
                                    onChange={(e) => handleAnswerSelect(currentQuestion.question_id || 'default', e.target.value)}
                                />
                                {choice}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="navigation-buttons">
                    <button className="finish-btn">Finish and start later</button>
                    <button
                        className="start-audit-btn"
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswer}
                    >
                        Submit Answer
                    </button>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="gdpr-audit-page">
                <div className="audit-container">
                    <div className="loading-state">
                        <h2>Loading audit...</h2>
                        <p>Please wait while we prepare your questions.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="gdpr-audit-page">
                <div className="audit-container">
                    <div className="error-state">
                        <h2>Error</h2>
                        <p>{error}</p>
                        <button onClick={loadNextQuestion} className="retry-button">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="gdpr-audit-page">
            <div className="audit-container">
                <div className="audit-sidebar">
                    <h3>Audit Progress</h3>
                    <div className="audit-sections">
                        {sidebarSections.map((section, index) => (
                            <div
                                key={section.section_id}
                                className={`audit-section-item ${section.is_current ? 'active' : ''}`}
                            >
                                <div className="section-number">{String(index + 1).padStart(2, '0')}</div>
                                <div className="section-label">{section.title}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="audit-main-content">
                    <div className="audit-header">
                        <h1>GDPR Compliance Audit</h1>
                        <p>Answer the following questions to assess your organization's GDPR compliance status.</p>
                        <div className="progress-info">
                            <span className="progress-text">
                                {progress.current}/{progress.total} ({((progress.current / progress.total) * 100).toFixed(1)}%)
                            </span>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    {renderQuestion()}
                </div>
            </div>
        </div>
    );
};

export default GDPRComplianceAuditPage; 