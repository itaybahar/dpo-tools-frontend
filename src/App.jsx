import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import SignUpPage from './pages/SignUpPage';
import DPOAssessment from './pages/DPOAssessment.jsx';
import DPOApplicationPage from './pages/DPOApplicationPage';
import HomePage from './pages/HomePage.jsx';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/dpo-assessment" element={<DPOAssessment />} />
                    <Route path="/dpo-application" element={<DPOApplicationPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 