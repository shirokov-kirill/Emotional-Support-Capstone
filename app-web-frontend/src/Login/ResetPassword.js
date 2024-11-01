import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Login.css';
import axios from "axios";
import PasswordInput from './Components/PasswordInput';

function Footer() {
    return (
        <footer className="App-footer">
            <p>© 2024 Emotional Support</p>
        </footer>
    );
}

function ResetPassword() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmationPasswordVisibility = () => {
        setShowConfirmationPassword(!showConfirmationPassword);
    };

    const isPasswordValid = () => {
        return password.length >= 8 || password.length === 0;
      };
    
    const isPasswordSame = () => {
    return (
        password === confirmationPassword || confirmationPassword.length === 0
    );
    };

    const onResetPasswordSubmit = async (event) => {
        event.preventDefault();

        const resetPasswordInfo = {
            username,
            password,
        };

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