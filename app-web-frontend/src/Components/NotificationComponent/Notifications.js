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
    };

    return (
        NeedToNotify() && <Notification title={title} message={message} action={() => navigate("/emotion_assessment")} buttonText="To mood assessment"/>
    );
};

export const UpcomingAppointmentNotification = () => {
    const title = "Upcoming Appointment";
    const message = "Check your appointments so you don't miss any of them!";

    const NeedToNotify = () => {
        const now = new Date();

        if (localStorage.getItem('lastAppointmentDate') === now.toDateString()) {
            console.log('Already reminded about appointment today');
            return false;
        }

        localStorage.setItem('lastAppointmentDate', new Date().toDateString());
        return true;
    };

    return (NeedToNotify() && <Notification title={title} message={message} />);
};

// Additional patient notification: Wellness tip
export const WellnessTipNotification = () => {
    const title = "Wellness Tip of the Day";
    const message = "Remember to take a deep breath and focus on something positive today!";

    const NeedToNotify = () => {
        const now = new Date();

        if (localStorage.getItem('lastTipDate') === now.toDateString()) {
            console.log('Already sent a tip today');
            return false;
        }

        localStorage.setItem('lastTipDate', new Date().toDateString());
        return true;
    };

    return (NeedToNotify() && <Notification title={title} message={message} />);
};