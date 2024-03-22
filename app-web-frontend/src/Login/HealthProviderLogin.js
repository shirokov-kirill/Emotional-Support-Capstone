import React, { useState } from 'react';
import './Login.css';
import {useNavigate} from "react-router-dom";

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

    let navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home/hprovider');
    }

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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    return (
        <div className="App">
            {isLogin ? (
                <div className="form-container">
                    <h2>Health Provider Login</h2>
                    <form>
                        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <button type="submit" onClick={handleLogin}>Login</button>
                    </form>
                    <button className="switch-form-button" onClick={() => setIsLogin(false)}>Don't have an account? Sign Up!</button>
                </div>
            ) : (
                <div className="form-container">
                    <h2>Doctor Sign Up</h2>
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
                        <button type="submit" onClick={handleLogin} disabled={!isFormValid()}>Sign Up</button>
                    </form>
                    <button className="switch-form-button" onClick={() => setIsLogin(true)}>Back to Login</button>
                </div>
            )}
            <Footer/>
        </div>
    );
}

export default HealthProviderLogin;
