import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Footer() {
    return (
        <footer className="App-footer">
            <p>© 2024 Emotional Support</p>
        </footer>
    );
}

export function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDob] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [showFormValidWarning, setShowFormValidWarning] = useState(false);

    let navigate = useNavigate();

    const isFormEmpty = () => {
        return !name || !surname || !dateOfBirth || !email || !username || !password || !confirmationPassword;
    }

    const validateEmail = () => {
        const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return re.test(email.toLowerCase()) || email.length === 0;
    }

    const isPasswordValid = () => {
        return password.length >= 8 || password.length === 0;
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
            const response = await axios.post('/api/auth/login', userLogin);
            if (response.status === 200) {
		const authToken = response.data.token;
                localStorage.setItem('authToken', authToken); // Save token to local storage

                console.log('User login successfully')
                console.log(response.data);
                navigate('/home');
            }
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    const onNewUserFormSubmit = async (event) => {
        event.preventDefault();

        const userRegistration = {
            email,
            name,
            surname,
	        username,
            dateOfBirth,
            gender,
            password
        };

        try {
            const response = await axios.post('/api/users', userRegistration);
            if (response.status === 200) {
                console.log('User registered successfully')
                const login_response = await axios.post('/api/auth/login', {username, password});
                if (login_response.status === 200) {
                    const authToken = response.data.token;
                    localStorage.setItem('authToken', authToken); // Save token to local storage
                    navigate('/home');
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
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="horizontal-column">
                                <input
                                type="text"
                                placeholder="Surname"
                                onChange={(e) => setSurname(e.target.value)}
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
