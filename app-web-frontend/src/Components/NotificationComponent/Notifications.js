import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Notification.css';

const Notification = ({ title, message, action, buttonText }) => {
    return (
        <div className="notification">
            <h3>{title}</h3>
            <div className="notification-content">
                <i className="info-icon">i</i>
                <p>{message}</p>
                <div className="notification-actions">
                    {action && <button className="action-button" onClick={action}>{buttonText ? buttonText : ""}</button>}
                </div>
            </div>
        </div>
    );
};

export const ExampleNotification = () => {
    const title = "Example Notification";
    const message = "This is an example notification.";

    return (
        <Notification title={title} message={message} />
    );
};

export const MoodAssessmentNotification = () => {
    const title = "Mood Assessment";
    const message = "Please complete your mood assessment for today.";
    const navigate = useNavigate();

    const NeedToNotify = () => {
        const now = new Date();

        if (localStorage.getItem('lastAssessmentDate') === now.toDateString()) {
            console.log('Already assessed today');
            return false;
        }

        return true;
    }

    return (
        NeedToNotify() && <Notification title={title} message={message} action={() => navigate("/emotion_assessment")} buttonText="To mood assessment"/>
    );
};
