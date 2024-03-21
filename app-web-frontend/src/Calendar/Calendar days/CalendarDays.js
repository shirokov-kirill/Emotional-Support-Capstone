import getMood from "./../../reusables/Mood/GetMood";


function isCurrentDate(date) {
  const currentDate = new Date();
  
  return (
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDate() === currentDate.getDate()
  );
}


function CalendarDays(props) {
  let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];
  
  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let mood = getMood(firstDayOfMonth); // Get the mood for the current day

    let calendarDay = {
      currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
      date: (new Date(firstDayOfMonth)),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: (isCurrentDate(firstDayOfMonth)),
      year: firstDayOfMonth.getFullYear(),
      moodColor: mood.color, // Get the mood color
      moodSmiley: mood.smiley // Get the mood smiley
    }

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {
        currentDays.map((day) => {
          return (
            <div className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                  onClick={() => props.changeCurrentDay(day)}
                  style={{ backgroundColor: day.moodColor }}> {/* Set the background color */}
              <p>{day.number}</p>
              <div className="mood-smiley">{day.moodSmiley}</div> {/* Render the mood smiley */}
            </div>
          )
        })
      }
    </div>
  )
}

export default CalendarDays;