function isCurrentDate(date) {
  const currentDate = new Date();
  
  return (
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDate() === currentDate.getDate()
  );
}


function CalendarDays(props) {
  let currentDays = [];
  
  for (let i = 0; i < props.moods.length; i++) {
    let date = props.moods[i].date;
    let color = props.moods[i].color;
    let emoji = props.moods[i].emoji;

    let calendarDay = {
      currentMonth: true,
      date: (new Date(date)),
      month: date.getMonth(),
      number: date.getDate(),
      selected: (isCurrentDate(date)),
      year: date.getFullYear(),
      moodColor: color,
      moodEmoji: emoji
    }

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {
        currentDays.map((day) => {
          return (
            <div className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                  // onClick={() => props.changeCurrentDay(day)}
                  style={{ backgroundColor: day.moodColor }}> {/* Set the background color */}
              <p>{day.number}</p>
              <div className="mood-emoji">{day.moodEmoji}</div> {/* Render the mood smiley */}
            </div>
          )
        })
      }
    </div>
  )
}

export default CalendarDays;