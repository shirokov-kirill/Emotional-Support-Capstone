import React from "react";
import styled from "styled-components";
import avatarImg from "./Photo.jpg";

// Container for the whole component
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

// Header for the contact list
const Header = styled.h2`
  font-size: 1.5rem;
  color: white;
  padding: 16px;
  margin: 0;
  background-color: #673ab7;
  border-bottom: 1px solid #eaeaea;
`;

// Individual user container
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

// User avatar
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

// Username text
const UserName = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 0;
`;

// Message preview text
const MessagePreview = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
`;

// The React component
const StyledComponentExample = () => {
  return (
    <Container>
      <Header>Recent Chats</Header>
      {/* Repeat UserContainer for each user */}
      <UserContainer>
        <Avatar src={avatarImg} alt="User Avatar" />
        <div>
          <UserName>Username</UserName>
          <MessagePreview>Last message preview...</MessagePreview>
        </div>
      </UserContainer>
      {/* ... other users */}
    </Container>
  );
};

export default StyledComponentExample;
