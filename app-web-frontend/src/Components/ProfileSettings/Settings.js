import React, { Component } from 'react';
import './UserProfile.css';
import avatarImg from './avatar.jpg';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Full Name',
      email: 'Email',
      mobile: 'Mobile Phone Number',
      bio: 'Bio',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  handleAvatarClick = () => {
    // Handle click action here, for example, open file picker to change avatar
    console.log('Edit Profile Photo Clicked!');
  };

  render() {
    const { name, email, mobile, bio, currentPassword, newPassword, confirmPassword } = this.state;

    return (
      <div className="profile-settings">
        {/* Edit Profile Photo */}
        <div className="avatar-column">
          <a href="#" onClick={this.handleAvatarClick}>
            <img className="user-avatar" src={avatarImg} alt="User Avatar" />
            <span className="edit-avatar">Edit Profile Photo</span>
          </a>
        </div>

        {/* Change Email Address */}
        <div className="settings-item">
          <label>Email Address:</label>
          <input
            className="user-input"
            type="email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        {/* Change Name */}
        <div className="settings-item">
          <label>Full Name:</label>
          <input
            className="user-input"
            type="text"
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>

        {/* Change Mobile Phone Number */}
        <div className="settings-item">
          <label>Mobile Phone Number:</label>
          <input
            className="user-input"
            type="tel"
            value={mobile}
            onChange={(e) => this.setState({ mobile: e.target.value })}
          />
        </div>

        {/* Edit Bio */}
        <div className="settings-item">
          <label>Bio:</label>
          <textarea
            className="user-input"
            value={bio}
            onChange={(e) => this.setState({ bio: e.target.value })}
          />
        </div>

        {/* Change Password */}
        <div className="settings-item">
          <label>Current Password:</label>
          <input
            className="user-input"
            type="password"
            value={currentPassword}
            onChange={(e) => this.setState({ currentPassword: e.target.value })}
          />
          <label>New Password:</label>
          <input
            className="user-input"
            type="password"
            value={newPassword}
            onChange={(e) => this.setState({ newPassword: e.target.value })}
          />
          <label>Confirm Password:</label>
          <input
            className="user-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
          />
        </div>

        <div className="settings-item">
        <label>Notification</label>
        <input
            className="user-input"
            type="checkbox"
            checked={this.state.newOrder}
            onChange={(e) => this.setState({ newOrder: e.target.checked })}
        />
        </div>

        <div className="settings-item">
        <label>News Alert</label>
        <input
            className="user-input"
            type="checkbox"
            checked={this.state.orderStatusChange}
            onChange={(e) => this.setState({ orderStatusChange: e.target.checked })}
        />
        </div>

        <div className="settings-item">
        <label>Appoinment Trigger</label>
        <input
            className="user-input"
            type="checkbox"
            checked={this.state.paymentReceived}
            onChange={(e) => this.setState({ paymentReceived: e.target.checked })}
        />
        </div>

        <div className="settings-item">
        <label>Hide my Profile</label>
        <input
            className="user-input"
            type="checkbox"
            checked={this.state.shipmentTracking}
            onChange={(e) => this.setState({ shipmentTracking: e.target.checked })}
        />
        </div>

        {/* Save and Cancel Buttons */}
        <div className="settings-buttons">
        <button className="delete-button" onClick={this.handleDeleteAccount}>Delete Your Account</button>
          <button className="save-button">Save Changes</button>
          <button className="cancel-button">Cancel</button>
        </div>

      </div>

    );
  }
}

export default AccountSettings;