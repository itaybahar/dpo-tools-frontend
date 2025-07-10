import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const LoginPage: React.FC = () => {
    return (
        <div className="login-container">
            <div className="login-card">
                <h1>DPO Tools</h1>
                <p>Here we place a snippet of the services</p>

                <div className="login-options">
                    <button className="google-login">
                        <img src="/google-icon.svg" alt="Google" />
                        Sign up with Google
                    </button>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="email-login">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="email-input"
                        />
                        <button className="get-started-btn">
                            Get started
                        </button>
                    </div>
                </div>

                <p className="login-footer">
                    Already have an account? <Link to="/login">Log in here</Link>
                </p>

                <p className="terms">
                    Signing up for an account and submitting your details are subject to our{' '}
                    <Link to="/agreement">Agreement</Link> and{' '}
                    <Link to="/privacy">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
};

export default LoginPage; 