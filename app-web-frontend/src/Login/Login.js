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
    const [dob, setDob] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');

    let navigate = useNavigate();

    const handleLogin = () => {
        isLoggedIn_ = true;
        console.log('Login successful');
        navigate('/home');
    }

    const isFormEmpty = () => {
        return !name || !surname || !dob || !email || !username || !password || !confirmationPassword;
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
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        return age >= 13 || dob.length === 0;
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
            email,
            password
        };

        try {
            const response = await axios.post('/', userLogin);
            if (response.status === 200) {
                console.log('User login successfully')
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error during registration', error);
        }
        isLoggedIn_ = true;
        navigate('/Home');
    };

    const onNewUserFormSubmit = async (event) => {
        event.preventDefault();

        const userRegistration = {
            email,
            name,
            surname,
            dob,
            gender,
            password
        };

        try {
            const response = await axios.post('/', userRegistration);
            if (response.status === 200) {
                console.log('User registered successfully')
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error during registration', error);
        }
        navigate('/Home');

    };

    return (
        <div className="App">
            {isLogin ? (
                <div className="form-container">
                    <h2>Login</h2>
                    <form onSubmit={onUserLoginSubmit}>
                        <input type="text" placeholder="email" onChange={e => setUsername(e.target.value)}/>
                        {!validateEmail() &&
                            <p className="warning-message">Please enter a valid Email.</p>}

                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        {!isPasswordValid() &&
                            <p className="warning-message">Password must be at least 8 characters long.</p>}

                        <div>
                            {!isLoginFormValid() && <p className="warning-message">Please fill in all the required fields.</p>}
                            <button type="submit" disabled={!isLoginFormValid()} onClick={handleLogin}>Login</button>
                            {/* Handle login is needed to navigate to the home page after the successful login
                            feel free to modify the logic, but please try to remain
                            that the successfull login leads to navigation to the home page*/}
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
let isLoggedIn_ = false;
export function isLoggedIn() {
    return isLoggedIn_;
}
