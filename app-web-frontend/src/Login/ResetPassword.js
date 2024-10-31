import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from "axios";

function Footer() {
    return (
        <footer className="App-footer">
            <p>© 2024 Emotional Support</p>
        </footer>
    );
}

function ResetPassword() {
    let navigate = useNavigate();
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [isSecurityQuestionVerified, setIsSecurityQuestionVerified] = useState(false);
    const [isQuestionLoaded, setIsQuestionLoaded] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const onFetchSecurityQuestion = async (event) => {
        event.preventDefault();

        setSecurityQuestion("Special Security question");
        setIsQuestionLoaded(true);

        //TODO(add such response on backend part)
        // try {
        //     const response = await axios.post('/api/users/get-security-question', { username });
        //     if (response.status === 200) {
        //         setSecurityQuestion(response.data.securityQuestion);
        //         setIsQuestionLoaded(true);
        //     }
        // } catch (error) {
        //     console.error('Failed to fetch security question', error);
        // }
    };

    const onVerifySecurityQuestion = async (event) => {
        event.preventDefault();

        console.log('Security question verified');
        setIsSecurityQuestionVerified(true);

        //TODO(add such response on backend part)
        // try {
        //     const response = await axios.post('/api/users/verify-security-question', { username, securityAnswer });
        //     if (response.status === 200) {
        //         console.log('Security question verified');
        //         setIsSecurityQuestionVerified(true);
        //     }
        // } catch (error) {
        //     console.error('Failed to verify security question', error);
        // }
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

                {!isQuestionLoaded ? (
                    // login input
                    <form onSubmit={onFetchSecurityQuestion}>
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button type="submit">Get Security Question</button>
                    </form>
                ) : !isSecurityQuestionVerified ? (
                    // security question
                    <form onSubmit={onVerifySecurityQuestion}>
                        <p>{securityQuestion}</p> {/* Отображаем вопрос */}
                        <input
                            type="text"
                            placeholder="Answer"
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                        />
                        <button type="submit">Verify Answer</button>
                    </form>
                ) : (
                    // new password
                    <form>
                        <input
                            type="password"
                            placeholder="New password"
                            onChange={(e) => setPassword(e.target.value)}
                            style={isPasswordValid() ? {} : { border: "1px solid lightcoral" }}
                        />

                        <input
                            type="password"
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmationPassword(e.target.value)}
                            style={isPasswordSame() ? {} : { border: "1px solid lightcoral" }}
                        />

                        <button type="submit" onClick={(e) => onResetPasswordSubmit(e)}>
                            Continue
                        </button>
                    </form>
                )}

                <button className="text-button signup-button" onClick={() => navigate("/user")}>
                    Back to login
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default ResetPassword;