import React from 'react';
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

    function handlePageLoginUser() {
        navigate("/user");
    }

    function handlePageLoginHealthProvider() {
        navigate("/hprovider");
    }

    return (
        <div className="App">
            <div className="form-container">
                <h3 className='option-text'>Select your preferred login method</h3>
                <button className="switch-form-button" onClick={handlePageLoginUser}>Log in as a user</button>
                <button className="switch-form-button" onClick={handlePageLoginHealthProvider}>Log in as a health
                    provider
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default LoginChoice;