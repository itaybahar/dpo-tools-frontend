import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import SignUpPage from './pages/SignUpPage';
import DPOAssessment from './pages/DPOAssessment.jsx';
import DPOApplicationPage from './pages/DPOApplicationPage';

// Import all the new pages
import HomePage from './pages/HomePage.jsx';
import AskYourDPOPage from './pages/AskYourDPOPage.jsx';
import ComplianceAssessmentPage from './pages/ComplianceAssessmentPage.jsx';
import GDPRComplianceAuditPage from './pages/GDPRComplianceAuditPage.jsx';

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/ask-your-dpo" element={<AskYourDPOPage />} />
                    <Route path="/compliance-assessment" element={<ComplianceAssessmentPage />} />
                    <Route path="/gdpr-audit" element={<GDPRComplianceAuditPage />} />
                    <Route path="/dpo-assessment" element={<DPOAssessment />} />
                    <Route path="/dpo-application" element={<DPOApplicationPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 