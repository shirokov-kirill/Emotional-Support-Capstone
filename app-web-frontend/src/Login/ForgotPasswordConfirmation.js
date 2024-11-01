import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const ForgotPasswordConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackToLogin = () => {
        const referrer = location.state?.from;
        if (referrer === 'healthProvider') {
            navigate('/hprovider');
        } else {
            navigate('/user');
        }
    };

    return (
        <div className="App">
            <div className="form-container">
                <h2>Check Your Email</h2>
                <p>We have sent you an email with a link to reset your password.</p>
                <button className="text-button back-to-login" onClick={handleBackToLogin}>
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordConfirmation;