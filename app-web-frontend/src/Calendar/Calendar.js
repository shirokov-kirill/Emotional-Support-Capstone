import React, { Component } from 'react';
import './Calendar.css';
import CalendarDays from './Calendar days/CalendarDays'; // Adjust the import path accordingly
import Header from '../header/Header';


function currentDayOfMonth() {
  const currentDate = new Date();
  
  const dayOfMonth = currentDate.getDate();
  
  return dayOfMonth;
}

export default class Calendar extends Component {
  constructor() {
    super();

    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: new Date()
    }
  }

  // Function to change the current month to the previous month
  goToPreviousMonth = () => {
    this.setState(prevState => ({
      currentDay: new Date(prevState.currentDay.getFullYear(), prevState.currentDay.getMonth() - 1, currentDayOfMonth())
    }));
  }

  // Function to change the current month to the next month
  goToNextMonth = () => {
    this.setState(prevState => ({
      currentDay: new Date(prevState.currentDay.getFullYear(), prevState.currentDay.getMonth() + 1, currentDayOfMonth())
    }));
  }

  render() {
    return (
      <div>
      <Header />
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={this.goToPreviousMonth}>Previous</button>
          <h2>{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
          <button onClick={this.goToNextMonth}>Next</button>
        </div>
        <div className="calendar-body">
          <div className="table-header">
            {this.weekdays.map((weekday, index) => (
              <div key={index} className="weekday"><p>{weekday}</p></div>
            ))}
          </div>
          <CalendarDays day={this.state.currentDay} />
        </div>
      </div>
      </div>
    )
  }
}
