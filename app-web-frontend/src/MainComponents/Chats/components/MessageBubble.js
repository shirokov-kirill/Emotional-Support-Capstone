import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ text, time, isSender, imageUrl }) => {
  return (
    <div className={`message-container ${isSender ? 'sender' : 'receiver'}`}>
      {!isSender && (
        <div className="avatar">
          <img src={imageUrl} alt="Avatar" />
        </div>
      )}
      <div className="message-content">
        <span className={`message-time ${isSender ? 'sender' : 'receiver'}`}>{time}</span>
        <div className={`message-bubble ${isSender ? 'sender-bubble' : 'receiver-bubble'}`}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;