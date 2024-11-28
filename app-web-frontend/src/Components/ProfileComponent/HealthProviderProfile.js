import React, { Component } from 'react';
import './UserProfile.css';
import avatarImg from './avatar.jpg';
import axios from "axios";
import {SERVER_ADDRESS} from "../../setupInfo";

class HealthProviderProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Full Name',
            email: 'Email',
            dob: 'Date of Birth',
            permanentAddress: 'Permanent Address',
            userName: 'User Name',
            password: '**********',
            presentAddress: 'Present Address',
            city: 'City',
            postalCode: 'Postal Code',
            country: 'Country',
            clinic: 'Clinic Name',
            specialization: 'Specialization',
            certificateUrl: null // URL for the certificate file if available
        };

    }

    componentDidMount() {
        const token = localStorage.getItem('authToken')
        if (token) {
            axios.get(`${SERVER_ADDRESS}/doctor`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data)
                    const doctorData = response.data;

                    let fullName = doctorData.firstName && doctorData.lastName
                        ? doctorData.firstName + ' ' + doctorData.lastName
                        : 'Full Name';

                    this.setState({
                        name: fullName,
                        email: doctorData.email || 'Email',
                        dob: doctorData.dateOfBirth || 'Date of Birth',
                        permanentAddress: doctorData.permanentAddress || 'Permanent Address',
                        userName: doctorData.username || 'User Name',
                        password: doctorData.password || '**********',
                        presentAddress: doctorData.presentAddress || 'Present Address',
                        city: doctorData.city || 'City',
                        postalCode: doctorData.postalCode || 'Postal Code',
                        country: doctorData.country || 'Country',
                        clinic: doctorData.clinic || 'Clinic Name',
                        specialization: doctorData.specialization || 'Specialization',
                        certificateUrl: doctorData.certificate || null // Update with URL if available
                    });
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            console.error('User token not found in localStorage');
        }
    }

    handleAvatarClick = () => {
        // Handle click action here, for example, navigate to another page
        console.log('Avatar Clicked!');
        // Example: window.location.href = '/profile'; // Redirect to another page
    };

    render() {
        const {
            name,
            email,
            dob,
            permanentAddress,
            userName,
            password,
            presentAddress,
            city,
            postalCode,
            country,
            clinic,
            specialization,
            certificateUrl
        } = this.state;

        return (
            <div className="user-profile">
                {/* First Column */}
                <div className="avatar-column">
                    <a href="#" onClick={this.handleAvatarClick}>
                        <img className="user-avatar" src={avatarImg} alt="User Avatar"/>
                        <label>Full Name:</label>
                        <input
                            className="user-input"
                            type="text"
                            value={name}
                            onChange={(e) => this.setState({name: e.target.value})}
                        />
                        <label>Email:</label>
                        <input
                            className="user-input"
                            type="email"
                            value={email}
                            onChange={(e) => this.setState({email: e.target.value})}
                        />
                    </a>
                </div>

                {/* Second Column */}
                <div className="details-column">
                    <label>Permanent Address:</label>
                    <textarea
                        className="user-input"
                        value={permanentAddress}
                        onChange={(e) => this.setState({permanentAddress: e.target.value})}
                    />
                    <label>Postal Code:</label>
                    <input
                        className="user-input"
                        type="text"
                        value={postalCode}
                        onChange={(e) => this.setState({postalCode: e.target.value})}
                    />
                    <label>Present Address:</label>
                    <textarea
                        className="user-input"
                        value={presentAddress}
                        onChange={(e) => this.setState({presentAddress: e.target.value})}
                    />
                    <label>City:</label>
                    <input
                        className="user-input"
                        type="text"
                        value={city}
                        onChange={(e) => this.setState({city: e.target.value})}
                    />
                </div>

                {/* Third Column */}
                <div className="credentials-column">
                    <label>Country:</label>
                    <input
                        className="user-input"
                        type="text"
                        value={country}
                        onChange={(e) => this.setState({country: e.target.value})}
                    />
                    <label>Date of Birth:</label>
                    <input
                        className="user-input"
                        type="date"
                        value={dob}
                        onChange={(e) => this.setState({dob: e.target.value})}
                    />
                    <label>Username:</label>
                    <input
                        className="user-input"
                        type="text"
                        value={userName}
                        onChange={(e) => this.setState({userName: e.target.value})}
                    />
                    <label>Password:</label>
                    <input
                        className="user-input"
                        type="password"
                        value={password}
                        onChange={(e) => this.setState({password: e.target.value})}
                    />
                    <label>Clinic:</label>
                    <input
                        className="user-input"
                        type="text"
                        value={clinic}
                        onChange={(e) => this.setState({clinic: e.target.value})}
                    />
                    <label>Specialization:</label>
                    <input
                        className="user-input"
                        type="text"
                        value={specialization}
                        onChange={(e) => this.setState({specialization: e.target.value})}
                    />
                    <label>Certificate:</label>
                    {certificateUrl ? (
                        <a href={certificateUrl} target="_blank" rel="noopener noreferrer">
                            Download Certificate
                        </a>
                    ) : (
                        <span>Certificate not uploaded</span>
                    )}
                </div>

                {/* Save button (positioned on the right) */}
                <button className="save-button">Save</button>
            </div>
        );
    }
}

export default HealthProviderProfile;