import React from 'react';
import {MoodAssessmentNotification, UpcomingAppointmentNotification, WellnessTipNotification} from './Notifications';

const NotificationList = (user) => {
    if (user === "doctor") return DoctorNotificationList
    else return PatientNotificationList
}

const PatientNotificationList = () => {
    return (
        <div>
            <MoodAssessmentNotification/>
            <WellnessTipNotification/>
        </div>
    );
}
const DoctorNotificationList = () => {
    return (
        <div>
            <UpcomingAppointmentNotification/>
        </div>
    );
}

export default NotificationList