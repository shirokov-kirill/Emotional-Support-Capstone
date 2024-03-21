import React, { useState } from 'react';
import './App.css';

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    const isPasswordValid = () => {
        return password.length >= 8 || password.length === 0;
    }

    const isPasswordSame = () => {
        return password === confirmationPassword;
    }

    return (
        <div className="App">
            {isLogin ? (
                <div className="form-container">
                    <h2>Login</h2>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                    <button className="switch-form-button" onClick={() => setIsLogin(false)}>Don't have an account? Sign Up!</button>
                </div>
            ) : (
                <div className="form-container">
                    <h2>Sign Up</h2>
                    <form>
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="Surname" />
                        <input type="date" placeholder="Date of Birth" />
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Username" />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />

                        {!isPasswordValid() && <p>Password must be at least 8 characters long.</p>}

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            onChange={e => setConfirmationPassword(e.target.value)}
                        />

                        {!isPasswordSame() && <p>Passwords must match the confirmation password.</p>}

                        <button type="submit" disabled={!isPasswordValid() || !isPasswordSame()}>Sign Up</button>

                    </form>
                    <button className="switch-form-button" onClick={() => setIsLogin(true)}>Back to Login</button>
                </div>
            )}
        </div>
    );
}

export default App;