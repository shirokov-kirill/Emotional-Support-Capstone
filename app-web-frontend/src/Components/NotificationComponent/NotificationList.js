import React from 'react';
import {ExampleNotification, MoodAssessmentNotification} from './Notifications';

const NotificationList = () => {
    return (
        <div>
            <MoodAssessmentNotification/>
            <ExampleNotification/>
        </div>
    );
}

export default NotificationList;