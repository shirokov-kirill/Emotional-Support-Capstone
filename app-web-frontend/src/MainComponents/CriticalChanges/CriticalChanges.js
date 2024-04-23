import React, {useEffect, useState} from "react";
import {getCriticalPatientsDataForDoctor} from "../../reusables/Mood/GetMood";
import './CriticalChanges.css';

const CriticalChanges = () => {
    const [criticalData, setCriticalData] = useState([]);

    useEffect(() => {
        const fetchCriticalChanges = async () => {
            const response = await getCriticalPatientsDataForDoctor();
            setCriticalData(response);
        };
        fetchCriticalChanges();
    }, []);

    return (
        <div className="critical-mood-list">
            {criticalData.map(moodData => (
                <div key={moodData.id} className="critical-mood-item">
                    <p><b>Patient</b>: {moodData.userId}</p>
                    <p><b>Emoji</b>: {moodData.emoji}</p>
                </div>
            ))}
        </div>
    );
}


export default CriticalChanges;