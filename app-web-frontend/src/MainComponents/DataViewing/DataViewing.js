import React, { useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DataViewing.css'

function DataViewing() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [patients, setPatients] = useState([]);

    const dummy_patients = [
        {
            id: 1,
            name: 'Evgeniia Kirillova',
            data: [
                { date: '2024-01-01', emoji: '😊', color: 'green' },
                { date: '2024-01-02', emoji: '😃', color: 'blue' },
                { date: '2024-01-03', emoji: '😁', color: 'orange' },
                // Add more data as needed
            ]
        },
        {
            id: 2,
            name: 'Mikhail Savrasov',
            data: [
                { date: '2024-01-01', emoji: '😊', color: 'green' },
                { date: '2024-01-02', emoji: '😃', color: 'blue' },
                { date: '2024-01-03', emoji: '😁', color: 'orange' },
                // Add more data as needed
            ]
        },
        {
            id: 3,
            name: 'Egor Lebedev',
            data: [
                { date: '2024-01-01', emoji: '😊', color: 'green' },
                { date: '2024-01-02', emoji: '😃', color: 'blue' },
                { date: '2024-01-03', emoji: '😁', color: 'orange' },
                // Add more data as needed
            ]
        },
        // Add more patients as needed
    ];

    useEffect(() => {
        // Fetch patient data from your API endpoint
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            // Replace 'api/patients' with your actual API endpoint
            const response = await fetch('api/patients');
            if (!response.ok) {
                throw new Error('Failed to fetch patient data');
            }
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error('Error fetching patient data:', error);
            // Handle error appropriately, e.g., show error message to the user
            setPatients(dummy_patients)
        }
    };


    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
    };


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const getEmojiAndColorForDate = (date) => {
        if (selectedPatient) {
            const dataEntry = selectedPatient.data.find(entry => entry.date === formatDate(date));
            return dataEntry ? { emoji: dataEntry.emoji, color: dataEntry.color } : null;
        }
        return null;
    };


    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const filteredPatients = dummy_patients.filter(patient =>
        patient.name.toLowerCase().split(" ").some(word => word.startsWith(searchTerm.toLowerCase()))
    );

    const tileContent = ({ date, view }) => {
        const emojiAndColor = getEmojiAndColorForDate(date);
        if (emojiAndColor && view === 'month') {
            return (
                <span role="img" aria-label="Emoji" style={{ color: emojiAndColor.color }}>
                <span style={{ color: emojiAndColor.color }}>{emojiAndColor.emoji}</span>
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
