import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const ForgotPasswordConfirmation = () => {
    return (
        <div className="App">
            <div className="form-container">
                <h2>Check Your Email</h2>
                <p>We have sent you an email with a link to reset your password.</p>
                <Link to="/login">Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPasswordConfirmation;