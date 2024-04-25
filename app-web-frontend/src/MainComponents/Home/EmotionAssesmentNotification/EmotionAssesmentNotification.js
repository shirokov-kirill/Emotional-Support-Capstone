import React from 'react';
import './EmotionAssesmentNotification.css';

export function EmotionAssesmentNotification() {
    // setting previous day for the testing
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Subtract one day

    localStorage.setItem('lastAssessmentDate', yesterday.toDateString());
    localStorage.setItem('lastNotificationTime', yesterday.toISOString());

    const NeedToNotify = () => {
        const now = new Date();
    
        if (localStorage.getItem('lastAssessmentDate') === now.toDateString()) {
            console.log('Already assessed today');
            return false;
        }
    
        const lastNotificationTime = localStorage.getItem('lastNotificationTime');
        if (lastNotificationTime) {
            console.log('Last notification time: ', lastNotificationTime);
            const lastNotificationDateTime = new Date(lastNotificationTime);
            const timeDifference = now.getTime() - lastNotificationDateTime.getTime();
            const hoursDifference = timeDifference / (1000 * 60 * 60);
            
            if (hoursDifference < 1) {
                return false;
            }
        }
    
        console.log('Need to notify');
        localStorage.setItem('lastNotificationTime', now.toISOString());
        return true;
    }

    console.log("I am inside notification")

    if (NeedToNotify()) {
        return (
            <div className="notification-container">
                <h3>You have to assess your emotions! Now!!!</h3>
            </div>
        );
    } else {
        return null;
    }
}


export default EmotionAssesmentNotification;