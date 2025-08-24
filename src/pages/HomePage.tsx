import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>DPO Tools</h1>
                    <p>Comprehensive Data Protection Officer solutions for your organization</p>
                    <div className="hero-buttons">
                        <Link to="/compliance-assessment" className="cta-button primary">
                            Start Assessment
                        </Link>
                        <Link to="/ask-your-dpo" className="cta-button secondary">
                            Ask Your DPO
                        </Link>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <h2>Our Services</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>DPO Assessment</h3>
                        <p>Determine if your organization needs to appoint a Data Protection Officer</p>
                        <Link to="/dpo-assessment" className="feature-link">Learn More</Link>
                    </div>
                    <div className="feature-card">
                        <h3>Compliance Assessment</h3>
                        <p>Evaluate your GDPR compliance status with our comprehensive assessment</p>
                        <Link to="/compliance-assessment" className="feature-link">Learn More</Link>
                    </div>
                    <div className="feature-card">
                        <h3>GDPR Audit</h3>
                        <p>Professional GDPR compliance audit services</p>
                        <Link to="/gdpr-audit" className="feature-link">Learn More</Link>
                    </div>
                    <div className="feature-card">
                        <h3>DPO Application</h3>
                        <p>Apply to become a certified Data Protection Officer</p>
                        <Link to="/dpo-application" className="feature-link">Learn More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage; 