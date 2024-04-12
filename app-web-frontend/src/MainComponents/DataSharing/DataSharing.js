import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DataSharing.css';

function DataSharing() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [dateRange, setDateRange] = useState([]);

    const doctors = [
        {
            id: 1,
            name: "Evgeniia Kirillova"
        },
        {
            id: 2,
            name: "Mikhail Savrasov"
        },
        {
            id: 3,
            name: "Egor Lebedev"
        },
        {
            id: 4,
            name: "John Doe"
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

    const handleSubmit = () => {
        // TODO: Send selected doctors and data range to backend
        console.log("Selected doctors:", selectedDoctors);
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().split(" ").some(word => word.startsWith(searchTerm))
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
