import React, { useState, useEffect } from 'react';
import { surveyService } from '../domains/dpo/service';
import './DPOAssessment.css';

const DPOAssessment = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarSections, setSidebarSections] = useState([]);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [usingFallback, setUsingFallback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    useEffect(() => {
        loadNextQuestion();
    }, []);

    const loadNextQuestion = async () => {
        try {
            setLoading(true);
            setError(null);
            setSelectedAnswer(''); // Reset selected answer for new question

            const response = await surveyService.getSurveyQuestion('1');

            // Check if we're using fallback data
            if (response.question.question_id === 'fallback_1') {
                setUsingFallback(true);
            }

            setCurrentQuestion(response.question);
            setSidebarSections(response.sidebar.sections);

            // Calculate progress
            const currentIndex = response.sidebar.sections.findIndex(s => s.is_current);
            setProgress({
                current: currentIndex + 1,
                total: response.sidebar.sections.length
            });

        } catch (err) {
            console.error('Error loading question:', err);
            // Don't show error state, just use fallback data
            setUsingFallback(true);
            setCurrentQuestion({
                question_id: 'fallback_1',
                text: 'Are you a public authority or body?',
                answer_type: 'radio',
                answer_choices: ['Yes', 'No']
            });
            setSidebarSections([
                { section_id: 'section_1', title: 'Question 1', order: 1, is_current: true },
                { section_id: 'section_2', title: 'Question 2', order: 2, is_current: false },
                { section_id: 'section_3', title: 'Question 3', order: 3, is_current: false }
            ]);
            setProgress({ current: 1, total: 3 });
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
        if (!currentQuestion || !selectedAnswer) {
            return;
        }

        try {
            // Submit answer to API
            await surveyService.submitAnswer('1', currentQuestion.question_id, selectedAnswer);

            console.log('Answer submitted:', selectedAnswer);

            // Load next question after successful submission
            await loadNextQuestion();

        } catch (err) {
            console.error('Error submitting answer:', err);
            // Don't show error, just continue to next question
            await loadNextQuestion();
        }
    };

    const renderQuestion = () => {
        if (!currentQuestion) return null;

        return (
            <div className="assessment-question">
                {usingFallback && (
                    <div className="fallback-notice">
                        <p>⚠️ <strong>Demo Mode:</strong> Using sample data due to API connection issues.
                            The full assessment will work when the API server is properly configured with CORS headers.</p>
                    </div>
                )}

                <div className="question-header">
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

                    <div className="sidebar-sections">
                        {sidebarSections.map((section, index) => (
                            <div
                                key={section.section_id}
                                className={`section-item ${section.is_current ? 'current' : ''}`}
                            >
                                <span className="section-number">{String(index + 1).padStart(2, '0')}</span>
                                <span className="section-title">{section.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="question-content">
                    <h2>{currentQuestion.text}</h2>

                    <div className="answer-options">
                        {currentQuestion.answer_type === 'dropdown' ? (
                            <select
                                onChange={(e) => handleAnswerSelect(currentQuestion.question_id, e.target.value)}
                                value={selectedAnswer}
                                className="answer-dropdown"
                            >
                                <option value="">--- select ---</option>
                                {currentQuestion.answer_choices.map((choice, index) => (
                                    <option key={index} value={choice}>
                                        {choice}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="radio-options">
                                {currentQuestion.answer_choices.map((choice, index) => (
                                    <label key={index} className="radio-option">
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion.question_id}`}
                                            value={choice}
                                            checked={selectedAnswer === choice}
                                            onChange={(e) => handleAnswerSelect(currentQuestion.question_id, e.target.value)}
                                        />
                                        {choice}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="submit-button"
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
            <div className="dpo-assessment-page">
                <div className="assessment-container">
                    <div className="loading-state">
                        <h2>Loading assessment...</h2>
                        <p>Please wait while we prepare your questions.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dpo-assessment-page">
                <div className="assessment-container">
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
        <div className="dpo-assessment-page">
            <div className="assessment-container">
                <div className="assessment-header">
                    <h1>GDPR Compliance Assessment</h1>
                    <p>Answer the following questions to assess your organization's GDPR compliance status.</p>
                </div>
                {renderQuestion()}
            </div>
        </div>
    );
};

export default DPOAssessment; 