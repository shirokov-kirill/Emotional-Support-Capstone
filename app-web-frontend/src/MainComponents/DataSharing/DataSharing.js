import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DataSharing.css';
import { SERVER_ADDRESS } from "../../setupInfo";
import axios from "axios";
import { getUserAuthToken } from "../../reusables/utils/AuthToken";
import getMoodsForTimeFrame from "../../reusables/Mood/GetMood";

function DataSharing() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [visibleStartDate, setVisibleStartDate] = useState(new Date());
    const [visibleEndDate, setVisibleEndDate] = useState(new Date());
    const [dateRange, setDateRange] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [moods, setMoods] = useState({}); // State to hold the moods
    const userId = 1;

    useEffect(() => {
        fetchRecommendedDoctors();
        calculateInitialVisibleDates();
    }, []);

    const fetchRecommendedDoctors = () => {
        const token = getUserAuthToken();
        if (token) {
            axios.get(`${SERVER_ADDRESS}/doctors`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    const transformedDoctors = response.data.map(doctor => ({
                        ...doctor,
                        name: `${doctor.firstName} ${doctor.lastName}`
                    }));
                    setDoctors(transformedDoctors);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            console.error('User token not found in localStorage');
        }
    };

    const fetchMoods = async ({ startDate, endDate }) => {
        try {
            const moodsData = await getMoods(startDate, endDate);
            setMoods(moodsData.reduce((acc, mood) => {
                acc[mood.date] = mood;
                return acc;
            }, {}));
        } catch (error) {
            console.error('Error fetching moods:', error);
        }
    }

    function getMoods(startDate, endDate) {
        return getMoodsForTimeFrame(startDate, endDate)
    }

    const handleDateChange = (date) => {
        setDateRange(date);
    };

    const handleDoctorClick = (doctor) => {
        const index = selectedDoctors.findIndex(d => d.doctorId === doctor.doctorId);
        console.log("index: " + index);
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
            doctorsIds: selectedDoctors.map(doctor => doctor.doctorId),
            timeFrameStart: dateRange[0],
            timeFrameEnd: dateRange[1]
        };
        console.log(requestBody);

        const authToken = getUserAuthToken();

        try {
            const response = await axios.post(
                SERVER_ADDRESS + '/user-mood/share',
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                }
            );

            if (response.status === 200) {
                console.log('Data shared successfully');
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error while sending request:', error);
        }
    };

    const calculateVisibleDates = async (date) => {
        const firstDay = date;
        const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);
        console.log("lastDay: " + lastDay);

        // Calculate the visible start date considering Monday as the first day of the week
        const dayOfWeek = firstDay.getDay();
        const startOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const vsd = new Date(firstDay);
        vsd.setDate(vsd.getDate() - startOffset);

        // Calculate the visible end date considering Monday as the first day of the week
        const endDayOfWeek = lastDay.getDay();
        const endOffset = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;
        const ved = new Date(lastDay);
        ved.setDate(lastDay.getDate() + endOffset);

        setVisibleStartDate(vsd);
        setVisibleEndDate(ved);

        console.log("Visible Start:", vsd);
        console.log("Visible End:", ved);
        await fetchMoods({ startDate: vsd, endDate: ved });
    };

    const calculateInitialVisibleDates = () => {
        const today = new Date();
        console.log("today: " + today);
        calculateVisibleDates(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    const handleActiveStartDateChange = ({ activeStartDate, view }) => {
        if (view === 'month') {
            calculateVisibleDates(activeStartDate);
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
                        tileContent={({ date, view }) => {
                            if (view === 'month') {
                                const mood = moods[date];
                                return mood ? (
                                    <div style={{ backgroundColor: mood.color, width: '50%', height: '50%', textAlign: 'center' }}>
                                        {mood.emoji}
                                    </div>
                                ) : null;
                            }
                            return null;
                        }}
                        onActiveStartDateChange={handleActiveStartDateChange}
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
                    className="input-text"
                />
                <div className="doctor-list">
                    <ul>
                        {filteredDoctors.map(item => (
                            <li
                                key={item.doctorId}
                                onClick={() => handleDoctorClick(item)}
                                style={{
                                    backgroundColor: selectedDoctors.some(p => p.doctorId === item.doctorId) ? 'lightblue' : 'inherit',
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
