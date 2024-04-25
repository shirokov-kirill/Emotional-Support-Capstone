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
                    <h2>Login</h2>
                    <form onSubmit={onUserLoginSubmit}>
                        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        {!username &&
                            <p className="warning-message">Please enter your username.</p>}

                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        {!isPasswordValid() &&
                            <p className="warning-message">Password must be at least 8 characters long.</p>}

                        <div>
                            {!isLoginFormValid() &&
                                <p className="warning-message">Please fill in all the required fields.</p>}
                            <button type="submit" disabled={!isLoginFormValid()}>Login</button>
                            {/* Handle login is needed to navigate to the home page after the successful login
                            feel free to modify the logic, but please try to remain
                            that the successful login leads to navigation to the home page*/}
                        </div>
                    </form>

                    <button className="switch-form-button" onClick={() => setIsLogin(false)}>Don't have an account? Sign
                        Up!
                    </button>
                </div>
            ) : (
                <div className="form-container" style={{textAlign: 'left'}}>
                    <h2>Sign Up</h2>
                    <form onSubmit={onNewUserFormSubmit}>
                        <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                        <input type="text" placeholder="Surname" onChange={e => setSurname(e.target.value)}/>
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            onChange={e => setDob(e.target.value)}
                            style={isDOBValid() ? {} : {border: '1px solid lightcoral'}}
                        />
                        {!isDOBValid() &&
                            <p className="warning-message">You must be at least 13 years old to register.</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                            style={validateEmail() ? {} : {border: '1px solid lightcoral'}}

                        />
                        {!validateEmail() && <p className="warning-message">Please enter a valid Email.</p>}
                        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        <select
                            className="mySelectStyle"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            style={isPasswordValid() ? {} : {border: '1px solid lightcoral'}}
                        />

                        {!isPasswordValid() &&
                            <p className="warning-message">Password must be at least 8 characters long.</p>}

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            onChange={e => setConfirmationPassword(e.target.value)}
                            style={isPasswordSame() ? {} : {border: '1px solid lightcoral'}}
                        />

                        {!isPasswordSame() &&
                            <p className="warning-message">Passwords must match the confirmation password.</p>}

                        <div>
                            {!isNewUserFormValid() &&
                                <p className="warning-message">Please fill in all the required fields.</p>}
                            <button type="submit" disabled={!isNewUserFormValid()}>Sign Up</button>
                        </div>

                    </form>
                    <button className="switch-form-button" onClick={() => setIsLogin(true)}>Back to Login</button>
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
