import React, { useState } from 'react';
import './App.css';

function App() {
    const [isLogin, setIsLogin] = useState(true);

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
                    <button className="switch-form-button" onClick={() => setIsLogin(false)}>Switch to Sign Up</button>
                </div>
            ) : (
                <div className="form-container">
                    <h2>Sign Up</h2>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Sign Up</button>
                    </form>
                    <button className="switch-form-button" onClick={() => setIsLogin(true)}>Switch to Login</button>
                </div>
            )}
        </div>
    );
}

export default App;