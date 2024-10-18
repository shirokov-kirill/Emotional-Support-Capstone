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
    const [showFormValidWarning, setShowFormValidWarning] = useState(false);

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

    const isDOBValid = () => {
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        return age >= 18 || dob.length === 0; // Assuming doctors must be at least 18 years old
    }

    const isFormValid = () => {
        return isPasswordValid() && isPasswordSame() && validateEmail() && isDOBValid() && !isFormEmpty();
    }

    const isLoginFormValid = () => {
        return isPasswordValid() && username;
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const onHealthProviderLoginSubmit = async (event) => {
        event.preventDefault();

        if (!isLoginFormValid()) {
            setShowFormValidWarning(true);
            return;
        } else {
            setShowFormValidWarning(false);
        }

        const healthProviderLogin = {
            email,
            password
        };

        try {
            const response = await axios.post('${SERVER_ADDRESS}/register', healthProviderLogin);
            if (response.status === 200) {
                navigate('/home/hprovider');
                console.log('Health Provider login successfully')
                console.log(response.data);
            }
        } catch (error) {
            navigate('/home/hprovider');
            console.error('Error during HP registration', error);
        }
    };

    const onNewHealthProviderFormSubmit = async (event) => {
        event.preventDefault();

        const healthProviderRegistration = {
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
            const response = await axios.post('${SERVER_ADDRESS}/register', healthProviderRegistration);
            if (response.status === 200) {
                navigate('/home/hprovider');
                console.log('Health Provider registered successfully')
                console.log(response.data);
            }
        } catch (error) {
            navigate('/home/hprovider');
            console.error('Error during hp registration', error);
        }
    };

    return (
        <div className="App">
            {isLogin ? (
                <div className="form-container">
                    <div className="title">
                        <h2 style={{textAlign: 'center'}}>Login</h2>
                        <h4 style={{textAlign: 'center'}}>to get started</h4>
                    </div>
                    <form onSubmit={onHealthProviderLoginSubmit}>
                        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        <button id="forgot-password-button" className="text-button"
                                onClick={() => navigate("/password_reset")}>
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
                        <button type="submit" onClick={onNewHealthProviderFormSubmit} disabled={!isFormValid()}>Sign
                            Up
                        </button>
                    </form>
                    <button className="switch-form-button" onClick={() => setIsLogin(true)}>Back to Login</button>
                    <Link to='/' style={{textDecoration: 'underline', marginTop: '10px'}}>Back to role choice</Link>
                </div>
            )}
            <Footer/>
        </div>
    );
}

export default HealthProviderLogin;
