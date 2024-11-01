import React, { useState } from 'react';
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { SERVER_ADDRESS } from "../setupInfo";
import PasswordInput from './Components/PasswordInput';

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
    localStorage.setItem("authToken", NaN);
    localStorage.setItem("role", NaN);
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [clinic, setClinic] = useState('');
    const [specialisation, setSpecialisation] = useState('');
    const [file, setFile] = useState(null);
    const [agreedForRecommendations, setAgreedForRecommendations] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmationPasswordVisibility = () => {
        setShowConfirmationPassword(!showConfirmationPassword);
    };
    const [agreedForRecommendations, setAgreedForRecommendations] = useState(false);

    let navigate = useNavigate();

    const isFormEmpty = () => {
        return !firstName || !lastName || !dateOfBirth || !email || !username || !password || !confirmationPassword || !clinic || !specialisation;
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
        const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
        return age >= 18 || dateOfBirth.length === 0; // Assuming doctors must be at least 18 years old
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
            username,
            password
        };

        try {
            const response = await axios.post(SERVER_ADDRESS + '/auth/doctor-login', hProviderLogin);
            if (response.status === 200) {
                const authToken = response.data.token;
                localStorage.setItem('authToken', authToken); // Save token to local storage
                localStorage.setItem('id', response.data['id'])
                localStorage.setItem('role', 'health_provider');
                console.log('Doctor login successfully')
                console.log(response.data);
                // navigate('/dashboard');
                navigate("/home/hprovider")
            }
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    const onNewHealthProviderFormSubmit = async (event) => {
        event.preventDefault();

        const hpRegistration = {
            username,
            password,
            firstName,
            lastName,
            email,
            dateOfBirth,
            clinic,
            specialisation,
            agreedForRecommendations
        };

        try {
            const response = await axios.post(SERVER_ADDRESS + '/doctor/register', hpRegistration);

            if (response.status === 200) {
                console.log('Doctor registered successfully')
                const login_response = await axios.post(SERVER_ADDRESS + '/auth/doctor-login', {username, password});
                if (login_response.status === 200) {
                    const authToken = login_response.data['token'];
                    localStorage.setItem('authToken', authToken); // Save token to local storage
                    localStorage.setItem('id', response.data['id'])
                    console.log(response.data)
                    // navigate('/dashboard');
                    navigate("/home/hprovider")
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
                    <h2>Health Provider Login</h2>
                    <form>
                        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        <PasswordInput 
                            value={password}
                            placeholder={"Password"}
                            onChange={e => setPassword(e.target.value)}
                            isValid={isPasswordValid()}
                            showPassword={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                        />
                        <button type="submit" onClick={onHealthProviderLoginSubmit}>Login</button>
                    </form>
                    <button className="switch-form-button" onClick={() => setIsLogin(false)}>Don't have an account? Sign
                        Up!
                    </button>
                    <Link to='/' style={{ textDecoration: 'underline', marginTop: '10px' }}>Back to role choice</Link>
                </div>
            ) : (
                <div className="form-container signup">
                    <h2>Health Provider Sign Up</h2>
                    <form>
                        <input type="text" placeholder="Name" onChange={e => setFirstName(e.target.value)}/>
                        <input type="text" placeholder="Surname" onChange={e => setLastName(e.target.value)}/>
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            onChange={e => setDateOfBirth(e.target.value)}
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
                               onChange={e => setSpecialisation(e.target.value)}/>
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
                        <PasswordInput 
                            value={password}
                            placeholder={"Password"}
                            onChange={e => setPassword(e.target.value)}
                            isValid={isPasswordValid()}
                            showPassword={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
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

                        <PasswordInput 
                                value={confirmationPassword}
                                placeholder={"Confirm password"}
                                onChange={e => setConfirmationPassword(e.target.value)}
                                isValid={isPasswordSame()}
                                showPassword={showConfirmationPassword}
                                togglePasswordVisibility={toggleConfirmationPasswordVisibility}
                        />
                        {!isPasswordSame() &&
                            <p className="warning-message">Passwords must match the confirmation password.</p>}
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id="agreement"
                                onChange={e => setAgreedForRecommendations(e.target.checked)}
                            />
                            <label htmlFor="agreement">I agree that I will appear in patients' recommendations</label>
                        </div>

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
