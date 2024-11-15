import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
    const navigate = useNavigate();
    const {token} = useParams();
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
        return password === confirmationPassword || confirmationPassword.length === 0;
    };

    const onResetPasswordSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmationPassword) {
            return;
        }

        try {
            const response = await axios.post(`/api/reset-password/${token}`, {password});
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
                {!isQuestionLoaded ? (
                    <form onSubmit={onFetchSecurityQuestion}>
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button type="submit">Get Security Question</button>
                    </form>
                ) : !isSecurityQuestionVerified ? (
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
                    <form onSubmit={onResetPasswordSubmit}>
                        <input
                            type="password"
                            placeholder="New password"
                            onChange={(e) => setPassword(e.target.value)}
                            style={isPasswordValid() ? {} : {border: '1px solid lightcoral'}}
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmationPassword(e.target.value)}
                            style={isPasswordSame() ? {} : {border: '1px solid lightcoral'}}
                        />

                        <div>
                            <button type="submit">Continue</button>
                        </div>
                    </form>)}
                <button
                    className="text-button signup-button"
                    onClick={() => navigate('/login')}
                >
                    Back to login
                </button>
            </div>
            <Footer/>
        </div>
    );
}

export default ResetPassword;
