import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            const response = await axios.post('/api/users/password/update', resetPasswordInfo);
            if (response.status === 200) {
                console.log('Reset password successfully')
            }
        } catch (error) {
            console.error('Error during password reset', error);
        }
    };

    return (
        <div className="App">
            <div className="form-container">
                <div className="title">
                    <h2>Reset password</h2>
                </div>
                <form>
                    <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    />

                    <PasswordInput 
                            value={password}
                            placeholder={"New password"}
                            onChange={e => setPassword(e.target.value)}
                            isValid={isPasswordValid()}
                            showPassword={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                    />

                    <PasswordInput 
                            value={confirmationPassword}
                            placeholder={"Confirm password"}
                            onChange={e => setConfirmationPassword(e.target.value)}
                            isValid={isPasswordSame()}
                            showPassword={showConfirmationPassword}
                            togglePasswordVisibility={toggleConfirmationPasswordVisibility}
                    />

                    <div>
                    <button
                        type="submit"
                        onClick={(e) => onResetPasswordSubmit(e)}
                    >
                        Continue
                    </button>
                    </div>
                </form>

                <button className="text-button signup-button" onClick={() => navigate("/user")}>
                    Back to login
                </button>
                </div>
            <Footer />
        </div>
    );
}

export default ResetPassword;