import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DPOApplicationPage from './pages/DPOApplicationPage';
import DPOAssessment from './pages/DPOAssessment';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/assessment" replace />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/assessment" element={<DPOAssessment />} />
                <Route path="/apply-dpo" element={<DPOApplicationPage />} />
            </Routes>
        </Router>
    );
};

export default App; 