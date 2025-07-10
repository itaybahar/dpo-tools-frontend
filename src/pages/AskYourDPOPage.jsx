import React from 'react';
import './AskYourDPOPage.css';

const AskYourDPOPage = () => {
    return (
        <div className="ask-dpo-page">
            <div className="ask-dpo-container">
                <h1>Ask Your DPO</h1>
                <p className="subtitle">Ask your DPO anything you need to know, based on your organizational knowledge, or choose one of the "out-of-the-box" DPO actions:</p>

                <div className="ask-input-section">
                    <button className="ask-input-btn">Ask your DPO anything</button>
                </div>

                <div className="or-divider">Or, choose a quick action:</div>

                <div className="actions-grid">
                    <div className="action-item">
                        <div className="action-icon">📋</div>
                        <h3>GDPR Compliance Audit</h3>
                    </div>
                    <div className="action-item">
                        <div className="action-icon">📝</div>
                        <h3>Generate Compliance Program</h3>
                    </div>
                    <div className="action-item">
                        <div className="action-icon">📄</div>
                        <h3>Create your org's ROPA</h3>
                    </div>
                    <div className="action-item">
                        <div className="action-icon">🔒</div>
                        <h3>Start DPIA</h3>
                    </div>
                    <div className="action-item">
                        <div className="action-icon">❓</div>
                        <h3>Answer Vendor DRQ</h3>
                    </div>
                    <div className="action-item">
                        <div className="action-icon">🛡️</div>
                        <h3>Generate Vendor DRQ</h3>
                    </div>
                    <div className="action-item">
                        <div className="action-icon">📊</div>
                        <h3>Manage Data Incident</h3>
                    </div>
                    <div className="action-item">
                        <div className="action-icon">📖</div>
                        <h3>Review a DPA</h3>
                    </div>
                    <div className="action-item">
                        <div className="action-icon">🖥️</div>
                        <h3>Generate DPA</h3>
                    </div>
                    <div className="action-item">
                        <div className="action-icon">🎓</div>
                        <h3>GDPR Awareness Training</h3>
                    </div>
                </div>

                <div className="see-more">
                    <a href="#" className="see-more-link">See more actions here</a>
                </div>

                <div className="knowledge-library-section">
                    <h2>Build your knowledge library</h2>
                    <p>It's easy. Just upload your existing privacy and data protection documentation. We'll take it from there.</p>
                    <button className="create-library-btn">Create your library</button>
                </div>
            </div>
        </div>
    );
};

export default AskYourDPOPage; 