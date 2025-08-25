import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <div className="logo-container">
                        <div className="logo-circles">
                            <div className="circle orange"></div>
                            <div className="circle pink"></div>
                            <div className="circle blue"></div>
                        </div>
                        <span className="logo-text">we</span>
                    </div>
                </Link>

                <div className="navbar-menu">
                    <Link to="/" className="navbar-item">Home</Link>
                    <Link to="/dpo-assessment" className="navbar-item">DPO Assessment</Link>
                    <Link to="/ask-your-dpo" className="navbar-item">Ask Your DPO</Link>
                    <Link to="/compliance-assessment" className="navbar-item">Compliance</Link>
                    <Link to="/gdpr-audit" className="navbar-item">GDPR Audit</Link>
                </div>

                <div className="navbar-buttons">
                    <Link to="/dpo-application" className="apply-btn">Apply as a DPO</Link>
                    <Link to="/login" className="signin-btn">Sign up/in</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 