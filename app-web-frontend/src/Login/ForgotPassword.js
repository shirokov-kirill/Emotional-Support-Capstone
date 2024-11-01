import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/forgot-password', { email });
            setMessage(response.data.message);
            navigate('/forgot-password-confirmation');
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

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
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
                {message && <p>{message}</p>}
                <button className="text-button back-to-login" onClick={handleBackToLogin}>
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;