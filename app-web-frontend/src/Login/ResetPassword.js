import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Footer() {
    return (
        <footer className="App-footer">
            <p>© 2024 Emotional Support</p>
        </footer>
    );
}

function LoginChoice() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const isPasswordValid = () => {
        return password.length >= 8 || password.length === 0;
      };
    
    const isPasswordSame = () => {
    return (
        password === confirmationPassword || confirmationPassword.length === 0
    );
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
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="New password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmationPassword(e.target.value)}
                    />

                    <div>
                    <button
                        type="submit"
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

export default LoginChoice;