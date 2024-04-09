import React from 'react';
import './Notification.css';

const Notification = () => {
    const title = "Sample Notification Title";
    const message = "This is a sample message for the notification component.";

    return (
        <div className="notification">
            <h3>{title}</h3>
            <div className="notification-content">
                <i className="info-icon">i</i>
                <p>{message}</p>
                <div className="notification-actions">
                    <button className="action-button">Click to action</button>
                </div>
            </div>
        </div>
    );
}

export default Notification;