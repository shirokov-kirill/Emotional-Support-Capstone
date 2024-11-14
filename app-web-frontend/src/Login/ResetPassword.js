import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Footer() {
    return (
        <footer className="App-footer">
            <p>© 2024 Emotional Support</p>
        </footer>
    );
}

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    const isPasswordValid = () => {
        return password.length >= 8 || password.length === 0;
    };

    const isPasswordSame = () => {
        return password === confirmationPassword || confirmationPassword.length === 0;
    };

    const onResetPasswordSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmationPassword) {
            return;
        }

        try {
            const response = await axios.post(`/api/reset-password/${token}`, { password });
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during password reset', error);
        }
    };

    return (
        <div className="App">
            <div className="form-container">
                <div className="title">
                    <h2>Reset Password</h2>
                </div>
                <form onSubmit={onResetPasswordSubmit}>
                    <input
                        type="password"
                        placeholder="New password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={isPasswordValid() ? {} : { border: '1px solid lightcoral' }}
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmationPassword(e.target.value)}
                        style={isPasswordSame() ? {} : { border: '1px solid lightcoral' }}
                    />

                    <div>
                        <button type="submit">Continue</button>
                    </div>
                </form>

                <button
                    className="text-button signup-button"
                    onClick={() => navigate('/login')}
                >
                    Back to login
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default ResetPassword;
