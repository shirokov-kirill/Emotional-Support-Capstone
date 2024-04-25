import Notification from '../Notification';

const MoodAssessmentNotification = () => {
    const title = "Mood Assessment";
    const message = "Please complete your mood assessment for today.";

    // localStorage.setItem('lastAssessmentDate', 0)

    const NeedToNotify = () => {
        const now = new Date();
        
        if (localStorage.getItem('lastAssessmentDate') === now.toDateString()) {
            console.log('Already assessed today');
            return false;
        }

        return true;
    }

    return (
        NeedToNotify() && <Notification title={title} message={message} />
    );
}

export default MoodAssessmentNotification;
