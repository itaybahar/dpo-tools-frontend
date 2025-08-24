import React, { useState } from 'react';
import './AskYourDPOPage.css';

interface Question {
    id: string;
    question: string;
    category: string;
}

const AskYourDPOPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    const categories = [
        'Data Processing',
        'Consent Management',
        'Data Subject Rights',
        'Data Breach Response',
        'Third-Party Processing',
        'International Transfers',
        'Data Protection Impact Assessment',
        'Other'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (question.trim() && selectedCategory) {
            setSubmitted(true);
            // Here you would typically send the question to your backend
            console.log('Question submitted:', { category: selectedCategory, question });
        }
    };

    if (submitted) {
        return (
            <div className="ask-dpo-success">
                <div className="success-card">
                    <div className="success-icon">✓</div>
                    <h2>Question Submitted Successfully!</h2>
                    <p>Your DPO question has been submitted. You'll receive a response within 24-48 hours.</p>
                    <button
                        className="new-question-btn"
                        onClick={() => {
                            setSubmitted(false);
                            setQuestion('');
                            setSelectedCategory('');
                        }}
                    >
                        Ask Another Question
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="ask-dpo-container">
            <div className="ask-dpo-header">
                <h1>Ask Your DPO</h1>
                <p>Get expert advice on data protection and GDPR compliance</p>
            </div>

            <div className="ask-dpo-content">
                <div className="question-form-container">
                    <form onSubmit={handleSubmit} className="question-form">
                        <div className="form-group">
                            <label htmlFor="category">Question Category</label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                required
                                className="form-select"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="question">Your Question</label>
                            <textarea
                                id="question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Describe your data protection question in detail..."
                                required
                                rows={6}
                                className="form-textarea"
                            />
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={!selectedCategory || !question.trim()}
                        >
                            Submit Question
                        </button>
                    </form>
                </div>

                <div className="info-sidebar">
                    <div className="info-card">
                        <h3>What to expect</h3>
                        <ul>
                            <li>Response within 24-48 hours</li>
                            <li>Expert DPO guidance</li>
                            <li>Practical compliance advice</li>
                            <li>Follow-up support available</li>
                        </ul>
                    </div>

                    <div className="info-card">
                        <h3>Common questions</h3>
                        <ul>
                            <li>Do I need a DPO?</li>
                            <li>How to handle data breaches?</li>
                            <li>Consent requirements</li>
                            <li>Data subject rights</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskYourDPOPage; 