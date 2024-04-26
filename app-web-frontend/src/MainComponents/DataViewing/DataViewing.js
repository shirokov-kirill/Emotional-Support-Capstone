import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DataViewing.css'
import {SERVER_ADDRESS} from "../../setupInfo";
import axios from "axios";

function DataViewing() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [patients, setPatients] = useState([]);
    const doctorId = 1;

    const patients_list = [
        {
            id: 1,
            name: 'First Patient'
        },
        {
            id: 2,
            name: 'Second Patient'
        }
    ]


    useEffect(() => {
        // Fetch patient data from your API endpoint
        fetchPatients();
    }, []);



    const fetchPatients = async () => {
        try {
            // const response = await axios.get(SERVER_ADDRESS + '/patients');
            //
            // if (response.status !== 200) {
            //     throw new Error('Failed to fetch patient data');
            // }
            //
            // setPatients(response.data);
            setPatients(patients_list);

        } catch (error) {
            console.error('Error fetching patient data:', error);
            setPatients(patients_list);
            console.log(patients);
        }
    };


    const handlePatientClick = async (patient) => {
        // setSelectedPatient(patient);
        try {
            const response = await axios.get(SERVER_ADDRESS + `/user-mood/get-allowed/${patient.id}/${doctorId}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch patient data');
            }
            setSelectedPatient({...patient, data: response.data});
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const getEmojiAndColorForDate = (date) => {
        console.log(date)
        const formattedDate = formatDate(date);
        const dataEntry = selectedPatient.data.find(entry => {
            const entryObject = JSON.parse(entry);
            console.log(entryObject)
            return formatDate(entryObject['created']) === formattedDate;
        });
        if (dataEntry) {
            const entryObject = JSON.parse(dataEntry);
            return {emoji: entryObject.emoji, color: entryObject.color};
        }
        return null;
    };


    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().split(" ").some(word => word.startsWith(searchTerm.toLowerCase()))
    );

    const tileContent = ({date, view}) => {
        const emojiAndColor = getEmojiAndColorForDate(date);
        if (emojiAndColor && view === 'month') {
            return (
                <span role="img" aria-label="Emoji" style={{color: emojiAndColor.color}}>
                <span style={{color: emojiAndColor.color}}>{emojiAndColor.emoji}</span>
            </span>
            );
        }
        return null;
    };

    return (
        <div className="container">
            <div className="patients-container">
                <h1>Patients List</h1>
                <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="patient-list">
                    {filteredPatients.map(patient => (
                        <div className="patient-item" key={patient.id} onClick={() => handlePatientClick(patient)}>
                            <strong>{patient.name}</strong>
                        </div>
                    ))}
                </div>
            </div>
            {selectedPatient && (
                <div className="data-container">
                    <div className="data-header">
                        <h2>Data for {selectedPatient.name}</h2>
                    </div>
                    <div className="calendar-container">
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            calendarType="US"
                            className="custom-calendar"
                            tileContent={tileContent}
                        />
                    </div>
                    <div className="data-display">
                        <p>Selected Date: {selectedDate.toDateString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DataViewing;
