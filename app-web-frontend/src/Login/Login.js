import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {SERVER_ADDRESS} from "../setupInfo";



function Footer() {
    return (
        <footer className="App-footer">
            <p>© 2024 Emotional Support</p>
        </footer>
    );
}

const PasswordStrength = {
    WEAK: {
        message: 'Your password is weak. Try adding more characters and mixing letters, numbers, and special symbols.',
        color: 'red'
    },
    FAIR: {
        message: 'Your password is fair. It can be stronger by adding special characters and ensuring it is at least 12 characters.',
        color: 'orange'
    },
    STRONG: {
        message: 'Your password is strong and secure.',
        color: 'green'
    }
};

export function Login() {
    localStorage.setItem("authToken", NaN);
    localStorage.setItem("role", NaN);
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDob] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [showFormValidWarning, setShowFormValidWarning] = useState(false);

    let navigate = useNavigate();

    const isFormEmpty = () => {
        return !firstName || !lastName || !dateOfBirth || !email || !username || !password || !confirmationPassword;
    }

    const validateEmail = () => {
        const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return re.test(email.toLowerCase()) || email.length === 0;
    }

    const isPasswordValid = () => {
        return password.length >= 8 || password.length === 0;
    }

    const calculatePasswordStrength = () => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
            return PasswordStrength.STRONG;
        } else if (hasUpperCase && hasLowerCase && hasNumbers && password.length >= 12) {
            return PasswordStrength.FAIR;
        } else {
            return PasswordStrength.WEAK;
        }
    }

    const isPasswordSame= () => {
        return password === confirmationPassword || confirmationPassword.length === 0;
    }

    const isDOBValid = () => {
        const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
        return age >= 13 || dateOfBirth.length === 0;
    }

    const isNewUserFormValid = () => {
        return isPasswordValid() && isPasswordSame() && validateEmail() && isDOBValid() && !isFormEmpty();
    }

    const isLoginFormValid = () => {
        return isPasswordValid() && username;
    }

    const onUserLoginSubmit = async (event) => {
        event.preventDefault();

        if (!isLoginFormValid()) {
            setShowFormValidWarning(true);
            return;
        } else {
            setShowFormValidWarning(false);
        }

        const userLogin = {
            username,
            password
        };

        try {
            const response = await axios.post(SERVER_ADDRESS + '/auth/login', userLogin);
            if (response.status === 200) {
		const authToken = response.data.token;
                localStorage.setItem('authToken', authToken); // Save token to local storage
                localStorage.setItem('id', response.data['id'])
                localStorage.setItem('role', 'patient')
                console.log('User login successfully')
                console.log(response.data);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    const onNewUserFormSubmit = async (event) => {
        event.preventDefault();

        const userRegistration = {
            email,
            firstName,
            lastName,
	        username,
            dateOfBirth,
            gender,
            password
        };

        try {
            const response = await axios.post(SERVER_ADDRESS + '/users', userRegistration);

            if (response.status === 200) {
                console.log('User registered successfully')
                const login_response = await axios.post(SERVER_ADDRESS + '/auth/login', {username, password});
                if (login_response.status === 200) {
                    const authToken = login_response.data['token'];
                    localStorage.setItem('authToken', authToken); // Save token to local storage
                    localStorage.setItem('id', response.data['id'])
                    localStorage.setItem('role', 'patient')
                    console.log(response.data)
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            console.error('Error during registration', error);
        }
    };

    return (
        <div className="App">
            {isLogin ? (
                <div className="form-container">
                    <div className="title">
                        <h2>Login</h2>
                        <h4>to get started</h4>
                    </div>
                    <form onSubmit={onUserLoginSubmit}>
                        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        <button id="forgot-password-button" className="text-button" onClick={() => navigate("/password_reset")}>
                            Forgot Password?
                        </button>

                        <div>
                            {showFormValidWarning &&
                                <p className="warning-message">Please fill in all the required fields.</p>}
                            <button type="submit">Continue</button>
                        </div>
                    </form>

                    <button className="text-button signup-button" onClick={() => setIsLogin(false)}>
                        New user? Register!
                    </button>

                    <button className="text-button back-to-role" onClick={() => navigate("/")}>
                        Back to role choice
                    </button>
                            </div>
            ) : (
            <div className="form-container signup" style={{ textAlign: "left" }}>
                <h2>Sign Up</h2>
                <form onSubmit={onNewUserFormSubmit}>
                    <div className="horizontal-form">
                                <div className="horizontal-column first-column">
                                    <input
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="horizontal-column">
                                <input
                                type="text"
                                placeholder="Surname"
                                onChange={(e) => setLastName(e.target.value)}
                                />
                                </div>
                    </div>
                    <div className="horizontal-form">
                                <div className="horizontal-column first-column">
                                <input
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                />
                                </div>
                                <div className="horizontal-column">
                                <input
                                type="date"
                                placeholder="1990-01-01"
                                onChange={(e) => setDob(e.target.value)}
                                style={isDOBValid() ? {} : { border: "1px solid lightcoral" }}
                                className="custom-date-picker"
                                />
                                {!isDOBValid() && (
                                <p className="warning-message">
                                    Must be 13+ to register
                                </p>
                                )}
                                </div>
                    </div>
                    <form class="gender-select">
                        <label class="gender-option">
                            <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)}/>
                            <span class="checkmark"></span> Male
                        </label>
                        <label class="gender-option">
                            <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)}/>
                            <span class="checkmark"></span> Female
                        </label>
                        <label class="gender-option">
                            <input type="radio" name="gender" value="other" onChange={(e) => setGender(e.target.value)}/>
                            <span class="checkmark"></span> Other
                        </label>
                    </form>

                    <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={validateEmail() ? {} : { border: "1px solid lightcoral" }}
                    />
                    {!validateEmail() && (
                    <p className="warning-message">Please enter a valid Email.</p>
                    )}

                    <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={
                        isPasswordValid() ? {} : { border: "1px solid lightcoral" }
                    }
                    />
                    {isPasswordValid() && password.length !== 0 && (() => {
                    const strength = calculatePasswordStrength(password);
                    return (
                        <p className="warning-message" style={{ color: strength.color }}>
                            {strength.message}
                        </p>
                    );
                    })()}
                    {!isPasswordValid() && (
                    <p className="warning-message">
                        Password must be at least 8 characters long.
                    </p>
                    )}

                    <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                    style={isPasswordSame() ? {} : { border: "1px solid lightcoral" }}
                    />

                    {!isPasswordSame() && (
                    <p className="warning-message">
                        Passwords must match the confirmation password.
                    </p>
                    )}

                    <div>
                    {showFormValidWarning && (
                        <p className="warning-message">
                        Please fill in all the required fields.
                        </p>
                    )}
                    <button type="submit" disabled={!isNewUserFormValid()}>
                        Sign Up
                    </button>
                    </div>
                </form>
                <button
                    className="text-button signup-button"
                    onClick={() => setIsLogin(true)}
                >
                    Back to Login
                </button>
                </div>
                    )}
                    <Footer/>
                </div>
        );
    }

    // this logic isn't great, but this functiion is needed for the header to work
    // TODO: refactor this
    export function isLoggedIn() {
        return true;
    }
