

import 'bootswatch/dist/minty/bootstrap.css';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

function AppointmentCard() {
  return (
    <FullCalendar
      plugins={[timeGridPlugin, bootstrap5Plugin]}
      themeSystem="bootstrap5"      
      initialView="timeGridWeek"
      customButtons={{
        NewApt: {
          text: 'New Appointment',
          click: function() {
            alert('New Appointment!')
          }
        }
      }}
      headerToolbar={{     
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay NewApt'
      }}
      businessHours={{daysOfWeek: [ 1, 2, 3, 4, 5], startTime: '09:00', endTime: '18:00'}}
      weekends={false}
      events={[
        { title: 'Annete Black', start: '2024-04-08T10:00:00', end: '2024-04-08T11:00:00' },
        { title: 'Cody Fisher', start: '2024-04-08T12:00:00', end: '2024-04-08T12:30:00' },
        { title: 'Jacob Jones', start: '2024-04-10T10:00:00', end: '2024-04-10T11:00:00' }
      ]}

    />
  )
}

export default AppointmentCard;