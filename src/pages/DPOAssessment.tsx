import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DPOAssessment.css';

interface AssessmentAnswers {
    publicAuthority?: 'yes' | 'no';
    monitoring?: 'yes' | 'no';
    specialData?: 'yes' | 'no';
}

const DPOAssessment: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<AssessmentAnswers>({});

    const handleNext = () => {
        if (step === 3) {
            // Calculate result
            const needsDPO = answers.publicAuthority === 'yes' ||
                answers.monitoring === 'yes' ||
                answers.specialData === 'yes';

            if (needsDPO) {
                navigate('/apply-dpo');
            } else {
                // Show result message or navigate to a result page
                alert('Based on your answers, you may not need to appoint a DPO. However, it\'s recommended to consult with a legal professional for a definitive answer.');
            }
        } else {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const isStepComplete = () => {
        switch (step) {
            case 1:
                return answers.publicAuthority !== undefined;
            case 2:
                return answers.monitoring !== undefined;
            case 3:
                return answers.specialData !== undefined;
            default:
                return false;
        }
    };

    return (
        <div className="assessment-container">
            <div className="assessment-card">
                <div className="assessment-header">
                    <h1>Do you need to appoint a Data Protection Officer (DPO)?</h1>
                    <p>The following assessment will help you determine if your organization needs to appoint a Data Protection Officer (DPO).</p>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${(step / 3) * 100}%` }} />
                    </div>
                </div>

                <div className="assessment-content">
                    {step === 1 && (
                        <div className="question">
                            <h2>1. Are you a public authority or body?</h2>
                            <div className="info-box">
                                <p>This includes government departments, state agencies, local authorities, and other public sector organizations.</p>
                            </div>
                            <div className="options">
                                <button
                                    className={`option ${answers.publicAuthority === 'yes' ? 'selected' : ''}`}
                                    onClick={() => setAnswers({ ...answers, publicAuthority: 'yes' })}
                                >
                                    Yes
                                </button>
                                <button
                                    className={`option ${answers.publicAuthority === 'no' ? 'selected' : ''}`}
                                    onClick={() => setAnswers({ ...answers, publicAuthority: 'no' })}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="question">
                            <h2>2. Do your organization's core activities require regular and systematic monitoring of individuals on a large scale?</h2>
                            <div className="info-box">
                                <p>Examples include:</p>
                                <ul>
                                    <li>Online behavior tracking</li>
                                    <li>CCTV surveillance</li>
                                    <li>Location tracking</li>
                                    <li>Customer profiling</li>
                                </ul>
                            </div>
                            <div className="options">
                                <button
                                    className={`option ${answers.monitoring === 'yes' ? 'selected' : ''}`}
                                    onClick={() => setAnswers({ ...answers, monitoring: 'yes' })}
                                >
                                    Yes
                                </button>
                                <button
                                    className={`option ${answers.monitoring === 'no' ? 'selected' : ''}`}
                                    onClick={() => setAnswers({ ...answers, monitoring: 'no' })}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="question">
                            <h2>3. Do your organization's core activities involve processing on a large scale 'special categories' of personal data, or criminal convictions or offences data?</h2>
                            <div className="info-box">
                                <p>Special categories include:</p>
                                <ul>
                                    <li>Racial or ethnic origin</li>
                                    <li>Political opinions</li>
                                    <li>Religious beliefs</li>
                                    <li>Health data</li>
                                    <li>Biometric data</li>
                                    <li>Criminal records</li>
                                </ul>
                            </div>
                            <div className="options">
                                <button
                                    className={`option ${answers.specialData === 'yes' ? 'selected' : ''}`}
                                    onClick={() => setAnswers({ ...answers, specialData: 'yes' })}
                                >
                                    Yes
                                </button>
                                <button
                                    className={`option ${answers.specialData === 'no' ? 'selected' : ''}`}
                                    onClick={() => setAnswers({ ...answers, specialData: 'no' })}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="navigation-buttons">
                        {step > 1 && (
                            <button className="back-btn" onClick={handleBack}>
                                Back
                            </button>
                        )}
                        <button
                            className={`next-btn ${!isStepComplete() ? 'disabled' : ''}`}
                            onClick={handleNext}
                            disabled={!isStepComplete()}
                        >
                            {step === 3 ? 'See Results' : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DPOAssessment; 