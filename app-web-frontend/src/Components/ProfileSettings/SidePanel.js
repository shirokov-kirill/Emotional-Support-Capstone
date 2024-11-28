import React from 'react';
import styled from 'styled-components';
import { FaCog, FaSignOutAlt, FaLifeRing, FaUserCircle } from 'react-icons/fa';
import avatarImg from './avatar.jpg';

// Styled side panel container
const SidePanelContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #f4f4f4;
  right: 0;
  top: 0;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

// Styled option with icon
const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 16px;
  color: #333;
  border-radius: 5px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
  
  svg {
    margin-right: 10px;
  }
`;

// Styled user profile section
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-top: auto; // Pushes the profile to the bottom of the container
  font-size: 16px;
  color: #333;
  
  

  .user-avatar{
    padding: -10px 5px;
    margin-right: 10px;
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
  
  .name {
    font-weight: bold;
  }
  
  .email {
    font-size: 14px;
    color: #666;
  }
`;

// Side panel component
const SidePanel = () => (
  <SidePanelContainer>
    <Option>
      <FaLifeRing />
      Support
    </Option>
    <Option>
      <FaSignOutAlt />
      Logout
    </Option>
    <Option>
      <FaCog />
      Settings
    </Option>
    <UserProfile>
    <img className="user-avatar" src={avatarImg} alt="User Avatar" />
      <div>
        <div className="name">User Name</div>
        <div className="email">user@example.com</div>
      </div>
    </UserProfile>
  </SidePanelContainer>
);

export default SidePanel;