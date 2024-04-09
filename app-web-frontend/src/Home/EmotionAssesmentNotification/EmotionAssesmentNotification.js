import React from 'react';

export function EmotionAssesmentNotification() {
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

    return (
        <div> {
            NeedToNotify() ? (
                <div>
                <p>Don't forget to assess your emotions today!</p>
            </div>
            ) : null
        } </div>
    )
}


export default EmotionAssesmentNotification;