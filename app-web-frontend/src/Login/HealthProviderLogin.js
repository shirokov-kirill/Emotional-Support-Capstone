import React, { useState } from 'react';
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { SERVER_ADDRESS } from "../setupInfo";

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

function HealthProviderLogin() {
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [clinic, setClinic] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [file, setFile] = useState(null);

    let navigate = useNavigate();

    const isFormEmpty = () => {
        return !name || !surname || !dob || !email || !username || !password || !confirmationPassword || !clinic || !specialization;
    }

    const validateEmail = () => {
        const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return re.test(email.toLowerCase()) || email.length === 0;
    }

    const isPasswordValid = () => {
        return password.length >= 8 || password.length === 0;
    }

    const isPasswordSame = () => {
        return password === confirmationPassword || confirmationPassword.length === 0;
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

    const isDOBValid = () => {
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        return age >= 18 || dob.length === 0; // Assuming doctors must be at least 18 years old
    }

    const isFormValid = () => {
        return isPasswordValid() && isPasswordSame() && validateEmail() && isDOBValid() && !isFormEmpty();
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const onHealthProviderLoginSubmit = async (event) => {
        event.preventDefault();

        const hProviderLogin = {
            email,
            password
        };

        try {
            const response = await axios.post('${SERVER_ADDRESS}/register', hProviderLogin);
            if (response.status === 200) {
                navigate('/home/hprovider');
                console.log('User login successfully')
                console.log(response.data);
            }
        } catch (error) {
            navigate('/home/hprovider');
            console.error('Error during registration', error);
        }
    };

    const onNewHealthProviderFormSubmit = async (event) => {
        event.preventDefault();

        const hpRegistration = {
            email,
            name,
            surname,
            dob,
            password,
            username,
            clinic,
            specialization,
            file
        };

        try {
            const response = await axios.post('${SERVER_ADDRESS}/register', hpRegistration);
            if (response.status === 200) {
                navigate('/home/hprovider');
                console.log('User registered successfully')
                console.log(response.data);
            }
        } catch (error) {
            navigate('/home/hprovider');
            console.error('Error during registration', error);
        }
    };

    return (
        <div className="App">
            {isLogin ? (
                <div className="form-container">
                    <h2>Health Provider Login</h2>
                    <form>
                        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <button type="submit" onClick={onHealthProviderLoginSubmit}>Login</button>
                    </form>
                    <button className="switch-form-button" onClick={() => setIsLogin(false)}>Don't have an account? Sign
                        Up!
                    </button>
                    <Link to='/' style={{ textDecoration: 'underline', marginTop: '10px' }}>Back to role choice</Link>
                </div>
            ) : (
                <div className="form-container">
                    <h2>Health Provider Sign Up</h2>
                    <form>
                        <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                        <input type="text" placeholder="Surname" onChange={e => setSurname(e.target.value)}/>
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            onChange={e => setDob(e.target.value)}
                            style={isDOBValid() ? {} : {border: '1px solid lightcoral'}}
                        />
                        {!isDOBValid() &&
                            <p className="warning-message">You must be at least 18 years old to register.</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                            style={validateEmail() ? {} : {border: '1px solid lightcoral'}}
                        />
                        {!validateEmail() && <p className="warning-message">Please enter a valid Email.</p>}
                        <input type="text" placeholder="Clinic" onChange={e => setClinic(e.target.value)}/>
                        <input type="text" placeholder="Specialization"
                               onChange={e => setSpecialization(e.target.value)}/>
                        <div>
                            <label htmlFor="fileInput">Upload Certification:</label>
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                                accept=".pdf, .doc, .docx"
                            />
                            <span>(Accepted formats: PDF, DOC, DOCX)</span>
                        </div>

                        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            style={isPasswordValid() ? {} : {border: '1px solid lightcoral'}}
                        />
                        {isPasswordValid() && password.length !== 0 && (() => {
                            const strength = calculatePasswordStrength(password);
                            return (
                                <p className="warning-message" style={{ color: strength.color }}>
                                    {strength.message}
                                </p>
                            );
                        })()}
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
                        <button type="submit" onClick={onNewHealthProviderFormSubmit} disabled={!isFormValid()}>Sign Up</button>
                    </form>
                    <button className="switch-form-button" onClick={() => setIsLogin(true)}>Back to Login</button>
                    <Link to='/' style={{ textDecoration: 'underline', marginTop: '10px' }}>Back to role choice</Link>
                </div>
            )}
            <Footer/>
        </div>
    );
}

export default HealthProviderLogin;
