import React, { Component } from 'react';
import './UserProfile.css';
import avatarImg from './avatar.jpg';
import axios from "axios";
import {SERVER_ADDRESS} from "../../setupInfo";

class UserProfile extends Component {
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
    };

  }

  componentDidMount() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('authToken')
    if (id && token ) {
      axios.get(`${SERVER_ADDRESS}/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            console.log(response.data)
            const userData = response.data;

            let fullName = null;
            if (userData.firstName && userData.lastName) {
              fullName = userData.firstName + ' ' + userData.lastName
            }

            this.setState({
              name: fullName || 'Full Name',
              email: userData.email || 'Email',
              dob: userData.dateOfBirth || 'Date of Birth',
              permanentAddress: userData.permanentAddress || 'Permanent Address',
              userName: userData.username || 'User Name',
              password: userData.password || '**********',
              presentAddress: userData.presentAddress || 'Present Address',
              city: userData.city || 'City',
              postalCode: userData.postalCode || 'Postal Code',
              country: userData.country || 'Country',
            });
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
    } else {
      console.error('User ID not found in localStorage');
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
    } = this.state;

    return (
      <div className="user-profile">
        {/* First Column */}
        <div className="avatar-column">
          <a href="#" onClick={this.handleAvatarClick}>
            <img className="user-avatar" src={avatarImg} alt="User Avatar" />
          </a>
        </div>

        {/* Second Column */}
        <div className="details-column">
          <label>Full Name:</label>
          <input
            className="user-input"
            type="text"
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <label>Email:</label>
          <input
            className="user-input"
            type="email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <label>Date of Birth:</label>
          <input
            className="user-input"
            type="date"
            value={dob}
            onChange={(e) => this.setState({ dob: e.target.value })}
          />
          <label>Permanent Address:</label>
          <textarea
            className="user-input"
            value={permanentAddress}
            onChange={(e) => this.setState({ permanentAddress: e.target.value })}
          />
          <label>Postal Code:</label>
          <input
            className="user-input"
            type="text"
            value={postalCode}
            onChange={(e) => this.setState({ postalCode: e.target.value })}
          />
        </div>

        {/* Third Column */}
        <div className="credentials-column">
          <label>Username:</label>
          <input
            className="user-input"
            type="text"
            value={userName}
            onChange={(e) => this.setState({ userName: e.target.value })}
          />
          <label>Password:</label>
          <input
            className="user-input"
            type="password"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <label>Present Address:</label>
          <textarea
            className="user-input"
            value={presentAddress}
            onChange={(e) => this.setState({ presentAddress: e.target.value })}
          />
          <label>City:</label>
          <input
            className="user-input"
            type="text"
            value={city}
            onChange={(e) => this.setState({ city: e.target.value })}
          />
          <label>Country:</label>
          <input
            className="user-input"
            type="text"
            value={country}
            onChange={(e) => this.setState({ country: e.target.value })}
          />
        </div>

        {/* Save button (positioned on the right) */}
        <button className="save-button">Save</button>
      </div>
    );
  }
}

export default UserProfile;