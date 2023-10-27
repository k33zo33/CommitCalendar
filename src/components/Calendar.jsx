import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import EventModal from './EventModal';
import { fetchEvents } from '../api/api';


const owner = process.env.REACT_APP_GITHUB_OWNER;
const repo = process.env.REACT_APP_GITHUB_REPO;

function Calendar() {

  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  

  useEffect(() => {
    
    async function updateEvents() {
      const newEvents = await fetchEvents(owner, repo, currentDate.startOf('month'), currentDate.endOf('month'));
      setEvents(newEvents);
    }

    updateEvents();
  }, [owner, repo, currentDate]);

  return (
    <>
    <div>
     <EventModal
       isOpen={isModalOpen}
       onClose={() => setIsModalOpen(false)}
       event={selectedEvent}
     />
     </div>
    <div>
      <BigCalendar
        localizer={momentLocalizer(moment)}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, zIndex: 0 }}
        onSelectEvent={(event) => {
         console.log('Selected event:', event.commitData);
          setSelectedEvent(event);
          setIsModalOpen(true);

        }}
        onNavigate={(date, view, action) => {
          setCurrentDate(moment(date));
        }}
      />
     
    </div>
     
     </>
  );
}

export default Calendar;