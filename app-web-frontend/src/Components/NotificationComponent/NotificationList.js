import React from 'react';
import './Notification.css';
import MoodAssessmentNotification from './Notifications/MoodAssessmentNotification';

// notificationList = [MoodAssessmentNotification];

const NotificationList = () => {
    return (
        <div>
            <MoodAssessmentNotification/>
        </div>
    );
}

export default NotificationList;