import React from 'react';
import {ExampleNotification, MoodAssessmentNotification} from './Notifications';
import CriticalChangesNotification from './Notifications';

const NotificationList = () => {
    return (
        <div>
            <MoodAssessmentNotification/>
            <ExampleNotification/>
            <CriticalChangesNotification/>
        </div>
    );
}

export default NotificationList;