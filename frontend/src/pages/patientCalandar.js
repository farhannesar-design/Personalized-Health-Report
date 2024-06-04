import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchAppointmentData(userIdFromStorage);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const fetchAppointmentData = async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_appointment_data?user_id=${userId}`);
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch appointment data');
      }
      const data = await response.json();
      const events = data.map(appointment => ({
        id: appointment.id,
        title: appointment.description || appointment.appointmentType?.coding[0]?.display || 'Appointment',
        start: new Date(appointment.start),
        end: new Date(appointment.end),
      }));
      setAppointmentData(events);
    } catch (error) {
      console.error('Error fetching appointment data:', error);
    }
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={appointmentData}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
      />
    </div>
  );
}

export default CalendarComponent;
