import React from 'react';
import './DaySchedule.css';

// Individual Appointment Component
const Appointment = ({ name, time, status }) => {
  return (
    <div className={`appointment ${status}`}>
      <span className="appointment-time">{time}</span>
      <span className="appointment-name">{name}</span>
      <span className="appointment-status">{status}</span>
    </div>
  );
};

// Column for each person
const ScheduleColumn = ({ personName, appointments }) => {
  return (
    <div className="schedule-column">
      <h3>{personName}</h3>
      {appointments.map((appointment, index) => (
        <Appointment key={index} {...appointment} />
      ))}
    </div>
  );
};

// Day Schedule Component
const DaySchedule = ({ schedules }) => {
  return (
    <div className="day-schedule">
      {schedules.map((schedule, index) => (
        <ScheduleColumn key={index} {...schedule} />
      ))}
    </div>
  );
};

// Sample Data
const sampleSchedules = [
  {
    personName: 'Abigail Lewis',
    appointments: [
      { name: 'Cody Fisher', time: '09:00', status: 'checked-in' },
      { name: 'Kathryn Murphy', time: '10:00', status: 'checked-in' },
      // Add more appointments as needed
    ],
  },
  // ... Repeat for each person
];

// Usage
const App = () => {
  return (
    <div className="App">
      <DaySchedule schedules={sampleSchedules} />
    </div>
  );
};

export default App;