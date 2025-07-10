import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            <div className="hero-section">
                <h1 className="main-title">WeDPO</h1>
                <h2 className="subtitle">eDPO services for businesses and data protection professionals</h2>
                <p className="description">
                    WeDPO empowers organizations and data protection professionals to manage DPO tasks and data protection operations with ease,
                    speed, and precision. Centralize your privacy operations, streamline compliance, and save time and money.
                    Everything your organization needs, in one intuitive platform.
                </p>
                <Link to="/compliance-assessment" className="cta-button">
                    Compliance Assessment Test
                </Link>
            </div>

            <div className="services-section">
                <div className="service-card ask-dpo">
                    <h3>Ask your DPO anything</h3>
                    <p>Ask your DPO anything you need to know, based on your organizational knowledge, or choose one of the "out-of-the-box" DPO actions:</p>
                    <Link to="/ask-your-dpo" className="service-button">
                        Ask your DPO anything
                    </Link>
                </div>

                <div className="service-grid">
                    <div className="grid-item">
                        <div className="icon">📋</div>
                        <h4>GDPR Compliance Audit</h4>
                        <p>Start DPIA</p>
                    </div>
                    <div className="grid-item">
                        <div className="icon">📝</div>
                        <h4>Generate Compliance Program</h4>
                        <p>Answer Vendor DRQ</p>
                    </div>
                    <div className="grid-item">
                        <div className="icon">📄</div>
                        <h4>Create your org's ROPA</h4>
                        <p>Generate Vendor DRQ</p>
                    </div>
                    <div className="grid-item">
                        <div className="icon">🔒</div>
                        <h4>Start DPIA</h4>
                        <p>Answer Vendor DRQ</p>
                    </div>
                    <div className="grid-item">
                        <div className="icon">❓</div>
                        <h4>Answer Vendor DRQ</h4>
                        <p>Generate DPA</p>
                    </div>
                    <div className="grid-item">
                        <div className="icon">🛡️</div>
                        <h4>Generate Vendor DRQ</h4>
                        <p>Manage Data Incident</p>
                    </div>
                    <div className="grid-item">
                        <div className="icon">📊</div>
                        <h4>Manage Data Incident</h4>
                        <p>Review a DPA</p>
                    </div>
                    <div className="grid-item">
                        <div className="icon">🎓</div>
                        <h4>Review a DPA</h4>
                        <p>GDPR Awareness Training</p>
                    </div>
                    <div className="grid-item">
                        <div className="icon">📖</div>
                        <h4>Generate DPA</h4>
                        <p>GDPR Awareness Training</p>
                    </div>
                    <div className="grid-item">
                        <div className="icon">⚠️</div>
                        <h4>GDPR Awareness Training</h4>
                        <p>Generate DPA</p>
                    </div>
                </div>

                <div className="knowledge-library">
                    <h3>Build your knowledge library</h3>
                    <p>It's easy. Just upload your existing privacy and data protection documentation. We'll take it from there.</p>
                    <p>WeDPO organizes your knowledge, enriches it with DPO expertise and helps you quickly find answers, resources, and solutions tailored to your needs.</p>
                    <button className="library-button">Create your library</button>
                </div>
            </div>

            <div className="other-services">
                <h2>Other Services</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <h3>DPO as a Service Package</h3>
                        <p>Select your ideal service package, or take our Assessment Test and let us guide you to the best fit.</p>
                        <button className="service-btn yellow">Packages and Pricing</button>
                    </div>
                    <div className="service-card">
                        <h3>Assign a rep in the Union</h3>
                        <p>Assign a Representative in the Union and meet your local compliance obligations with confidence.</p>
                        <button className="service-btn orange">Start Now</button>
                    </div>
                    <div className="service-card">
                        <h3>Policy Center</h3>
                        <p>Draft, customize, and manage policies, R&R, SLAs and certificates effortlessly.</p>
                        <button className="service-btn pink">Start Now</button>
                    </div>
                    <div className="service-card">
                        <h3>GDPR Compliance Audit</h3>
                        <p>Assess your compliance level and generate gap analysis</p>
                        <button className="service-btn purple">Start now</button>
                    </div>
                    <div className="service-card">
                        <h3>CISO as a Service Package</h3>
                        <p>Get expert cybersecurity leadership on demand. Strategic guidance, risk management, and compliance, tailored to your org's needs.</p>
                        <button className="service-btn blue">Start now</button>
                    </div>
                    <div className="service-card">
                        <h3>Compliance Automation Tools</h3>
                        <p>Automate your privacy, security, and regulatory tasks — save time, reduce risks, and stay effortlessly compliant.</p>
                        <button className="service-btn green">Start Now</button>
                    </div>
                    <div className="service-card">
                        <h3>Vendor Management Kit</h3>
                        <p>Assess, track, and manage your vendors with ease. Ensure compliance and reduce third-party risks, all in one place.</p>
                        <button className="service-btn lightblue">Start now</button>
                    </div>
                    <div className="service-card">
                        <h3>Data Processing Records (ROPA)</h3>
                        <p>Easily organize your mandatory Record of Processing Activities (ROPA) Stay organized, compliant, and audit-ready.</p>
                        <button className="service-btn darkblue">Start now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage; 