import React, { Component } from 'react';
import './Calendar.css';
import CalendarDays from './Calendar days/CalendarDays';
import getMoodsForTimeFrame from "../../reusables/Mood/GetMood";


function findStartAndEndDate(date) {
  let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  // startDate = startDate.setDate(startDate.getDate() - startDate.getDay());

  let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  // endDate = endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  
  return {
    startDate: startDate,
    endDate: endDate
  }
}


function getMoods(date) {
  let timeFrame = findStartAndEndDate(date);
  return getMoodsForTimeFrame(timeFrame.startDate, timeFrame.endDate);
}


export default class Calendar extends Component {
  constructor() {
    super();

    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    this.state = {
      currentDay: new Date(),
      moods: []
    };
  }

  componentDidMount() {
    this.fetchMoods();
  }

  async fetchMoods() {
    try {

      const moods = await getMoods(this.state.currentDay);
      this.setState({ moods });
    } catch (error) {
      console.error('Error fetching moods:', error);
    }
  }

  goToPreviousMonth = () => {
    this.setState(prevState => (
        {
      currentDay: new Date(prevState.currentDay.getFullYear(), prevState.currentDay.getMonth() - 1, 1),
    }));
    this.componentDidMount();
  }

  goToNextMonth = () => {
    this.setState(prevState => ({
      currentDay: new Date(prevState.currentDay.getFullYear(), prevState.currentDay.getMonth() + 1, 1),
    }));
    this.componentDidMount();
  }

  render() {
    return (
        <div>
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
              <CalendarDays moods={this.state.moods} />
            </div>
          </div>
        </div>
    );
  }
}