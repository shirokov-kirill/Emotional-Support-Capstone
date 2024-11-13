import React from 'react';
import './ChatsListItem.css';

const ChatsListItem = ({ imageUrl, name, time, selected, onClick }) => {
  console.log(name)
  console.log(time)
  return (
    <div className={`card-container ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="card-avatar">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="card-details">
        <span className="card-name">{name}</span>
        <span className="card-time">{time}</span>
      </div>
    </div>
  );
};

export default ChatsListItem;