import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Notification.css';
import {getCriticalPatientsDataForDoctor} from "../../reusables/Mood/GetMood";


const Notification = ({title, message, action, buttonText}) => {
    return (
        <div className="notification">
            <h3>{title}</h3>
            <div className="notification-content">
                <i className="info-icon">i</i>
                <p>{message}</p>
                <div className="notification-actions">
                    {action &&
                        <button className="action-button" onClick={action}>{buttonText ? buttonText : ""}</button>}
                </div>
            </div>
        </div>
    );
};

export const ExampleNotification = () => {
    const title = "Example Notification";
    const message = "This is an example notification.";

    return (
        <Notification title={title} message={message}/>
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
        NeedToNotify() && <Notification title={title} message={message} action={() => navigate("/emotion_assessment")}
                                        buttonText="To mood assessment"/>
    );
};

export const CriticalChangesNotification = () => {
    const [criticalData, setCriticalData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCriticalChanges = async () => {
            const response = await getCriticalPatientsDataForDoctor();
            setCriticalData(response);
        };
        fetchCriticalChanges();
    }, []);

    const hasCriticalChanges = criticalData.length > 0;

    const title = "Critical Change Notifications";
    console.log(criticalData);
    return (
        hasCriticalChanges && (
            <div className="critical-notification-list">
                {criticalData.map(moodData => (
                    <Notification
                        key={moodData.id}
                        title={`Critical Mood Change for ${moodData.userId}`}
                        message={`Current mood: ${moodData.emoji}`}
                        action={() => navigate(`/patient/${moodData.userId}`)} // Redirect to patient details
                        buttonText="View Details"
                    />
                ))}
            </div>
        )
    );
};

export default CriticalChangesNotification;