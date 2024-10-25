import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DataSharing.css';
import {SERVER_ADDRESS} from "../../setupInfo";
import axios from "axios";

function DataSharing() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const userId = 1;


    const doctors = [
        {
            id: 1,
            name: "Name Surname"
        }
    ];

    const handleDateChange = (date) => {
        setDateRange(date);
    };

    const handleDoctorClick = (doctor) => {
        const index = selectedDoctors.findIndex(d => d.id === doctor.id);
        if (index === -1) {
            setSelectedDoctors([...selectedDoctors, doctor]);
        } else {
            const updatedDoctors = [...selectedDoctors];
            updatedDoctors.splice(index, 1);
            setSelectedDoctors(updatedDoctors);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            userId: userId,
            doctorsIds: selectedDoctors.map(doctor => doctor.id),
            timeFrameStart: dateRange[0],
            timeFrameEnd: dateRange[1]
        };

        try {
            const response = await axios.post(SERVER_ADDRESS + '/user-mood/share', requestBody);

            if (response.status === 200) {
                console.log('Data shared successfully');
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error while sending request:', error);
        }
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().split(" ").some(word => word.startsWith(searchTerm.toLowerCase()))
    );

    return (
        <div className="container">
            <div className="data-container">
                <div className="data-header">
                    <h2>Please choose the interval to share</h2>
                </div>
                <div className="sharing-calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={dateRange}
                        selectRange={true}
                        className="sharing-calendar"
                        tileContent={({date, view}) => {
                            return view === 'month' ? <p>😐</p> : null;
                        }}
                    />
                </div>
            </div>
            <div className="doctors-container">
                <h2>Your doctors list</h2>
                <input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="doctor-list">
                    <ul>
                        {filteredDoctors.map(item => (
                            <li
                                key={item.id}
                                onClick={() => handleDoctorClick(item)}
                                style={{
                                    backgroundColor: selectedDoctors.some(p => p.id === item.id) ? 'lightblue' : 'inherit',
                                    cursor: 'pointer'
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={handleSubmit} className="submit-button">Submit</button>
            </div>
        </div>
    );
}

export default DataSharing;
