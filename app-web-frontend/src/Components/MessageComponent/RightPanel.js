import React from "react";
import styled from "styled-components";
import { FaPhone, FaVideo } from "react-icons/fa";
import avatarImg from "./Photo.jpg";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const Message = styled.div`
  background-color: ${(props) => (props.isSender ? "#e6dcfd" : "#f0f0f0")};
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  max-width: 70%;
`;

const InputArea = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;

  input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    border: none;
    background-color: #5c6bc0;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const UserPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #673ab7;
  color: white;

  .icons {
    display: flex;
    align-items: center;

    svg {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  .user-info {
    display: flex;
    align-items: center;

    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
`;

const OnlineStatus = styled.span`
  background-color: ${(props) => (props.isOnline ? "#4caf50" : "#f44336")};
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 5px;
`;

const ChatApp = () => {
  const isOnline = true; // This should be dynamic based on the user's actual status
  const lastSeen = "2:02 pm"; // This should also be dynamic

  return (
    <ChatContainer>
      <UserPanel>
        <div className="user-info">
          <img src={avatarImg} alt="User" />
          <div>Anil</div>
        </div>
        <div className="icons">
          {isOnline ? (
            <>
              <FaPhone />
              <FaVideo />
            </>
          ) : (
            `Last seen at ${lastSeen}`
          )}
          <OnlineStatus isOnline={isOnline} />
        </div>
      </UserPanel>
      <Message isSender={false}>Hello, how are you?</Message>
      <Message isSender={true}>I'm good, thanks for asking!</Message>
      <InputArea>
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </InputArea>
    </ChatContainer>
  );
};

export default ChatApp;
