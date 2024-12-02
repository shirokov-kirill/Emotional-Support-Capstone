import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DataViewing.css'
import {SERVER_ADDRESS} from "../../setupInfo";
import axios from "axios";
import {getUserAuthToken} from "../../reusables/utils/AuthToken";

function DataViewing() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [patients, setPatients] = useState([]);
    const doctorId = 1;

    useEffect(() => {
        // Fetch patient data from your API endpoint
        fetchUsers()
    }, []);

    const fetchUsers = () => {
        const token = getUserAuthToken();
        if (token) {
            axios.get(`${SERVER_ADDRESS}/user-mood/get-allowed`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    const patientData = response.data.map(user => ({
                        id: user.id,
                        name: `${user.firstName} ${user.lastName}`
                    }));
                    setPatients(patientData);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            console.error('User token not found in localStorage');
        }
    };


    const handlePatientClick = async (patient) => {
        const token = getUserAuthToken();
        if (!token) {
            console.error('User token not found in localStorage');
            return;
        }

        axios.get(`${SERVER_ADDRESS}/user-mood/get-allowed/${patient.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
                if (response.status === 200) {
                    const moods = {}
                    for (let i = 0; i < response.data.length; i++) {
                        let current = response.data[i]
                        moods[dateToIsoWithoutTime(current.created)] = {emoji: current.emoji, color: current.color}
                        console.log(moods[dateToIsoWithoutTime(current.created)])
                    }

                    setSelectedPatient({...patient, data: moods});
                }
            })
            .catch(error => {
                console.error('Error fetching patient data:', error);
            });
    };



    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const getEmojiAndColorForDate = (date) => {
        const formattedDate = dateToIsoWithoutTime(date);
        if (selectedPatient.data.hasOwnProperty(formattedDate)) {
            return selectedPatient.data[formattedDate];
        }
        return null;
    };

    const dateToIsoWithoutTime = (dateString) => {
        let dateObject = new Date(dateString);
        let isoString = dateObject.toISOString();
        let isoDate = isoString.split('T')[0];
        return isoDate;
    }

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().split(" ").some(word => word.startsWith(searchTerm.toLowerCase()))
    );

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const mood = getEmojiAndColorForDate(date);
            return mood ? (
                <div style={{ backgroundColor: mood.color, width: '50%', height: '50%', textAlign: 'center' }}>
                    {mood.emoji}
                </div>
            ) : null;
        }
        return null;
    }

    return (
        <div className="container">
            <div className="patients-container">
                <h1>Patients List</h1>
                <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-text"
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
