import React, { useState } from "react";
import "./App.css";

function EventBlock({ event, admin, onDelete }) {
  const { event_name, starttime, endtime } = event;
  const containerHeight = 300; // Height of the scrollable container

  // Calculate the position and height of the event block within the container
  const eventStart = new Date(starttime);
  const eventEnd = new Date(endtime);
  const containerStart = new Date().setHours(0, 0, 0, 0); // Set to midnight
  const eventTop =
    (((eventStart - containerStart) / (60 * 60 * 1000)) * 100) / 6;
  const eventHeight = (((eventEnd - eventStart) / (60 * 60 * 1000)) * 100) / 6;

  const style = {
    top: 0,
    height: eventHeight + "vh",
  };

  const formattedStartTime = eventStart.toLocaleTimeString();
  const formattedEndTime = eventEnd.toLocaleTimeString();

  return (
    <div className="event-block" style={style}>
      <strong>
        <h4>{event_name}</h4>{" "}
      </strong>
      <p>
        {formattedStartTime} - {formattedEndTime}
      </p>
      {admin && (
        <button className="delete-button" onClick={() => onDelete(event)}>
          &#10006; Delete
        </button>
      )}
    </div>
  );
}

function App() {
  const eventsData = {
    Monday: [
      {
        event_name: "Monday Event 1",
        starttime: "2023-10-28T08:00:00",
        endtime: "2023-10-28T09:00:00",
      },
      {
        event_name: "Monday Event 2",
        starttime: "2023-10-28T13:00:00",
        endtime: "2023-10-28T14:30:00",
      },
      // Add Monday events here
    ],
    Tuesday: [
      {
        event_name: "Tuesday Event 1",
        starttime: "2023-10-29T10:00:00",
        endtime: "2023-10-29T11:00:00",
      },
      {
        event_name: "Tuesday Event 2",
        starttime: "2023-10-29T14:00:00",
        endtime: "2023-10-29T15:30:00",
      },
      // Add Tuesday events here
    ],
  };
  // Add events for other days

  const events1 = [
    {
      event_name: "Physics Tutorial",
      starttime: "2023-10-28T09:00:00",
      endtime: "2023-10-28T10:00:00",
    },
    {
      event_name: "Mathematics Tutorial",
      starttime: "2023-10-28T12:00:00",
      endtime: "2023-10-28T14:30:00",
    },
    {
      event_name: "Mathematics Lecture",
      starttime: "2023-10-28T14:30:00",
      endtime: "2023-10-28T16:00:00",
    },
    {
      event_name: "CHC Lecture",
      starttime: "2023-10-28T17:30:00",
      endtime: "2023-10-28T19:00:00",
    },
    {
      event_name: "Eventk",
      starttime: "2023-10-28T18:30:00",
      endtime: "2023-10-28T19:00:00",
    },
    {
      event_name: "Event b",
      starttime: "2023-10-28T19:30:00",
      endtime: "2023-10-28T23:00:00",
    },
    {
      event_name: "Meeting with Team",
      starttime: "2023-10-29T01:00:00",
      endtime: "2023-10-29T02:30:00",
    },
    {
      event_name: "Lunch Break",
      starttime: "2023-10-29T04:00:00",
      endtime: "2023-10-29T07:30:00",
    },
  ];
  const [isAdmin, setIsAdmin] = useState(true); // Set this to true or false as needed
  const [showPopup, setShowPopup] = useState(false);
  const [newEvent, setNewEvent] = useState({
    event_name: "",
    starttime: "",
    endtime: "",
  });
  const [selectedDay, setSelectedDay] = useState("Monday"); // Initialize with a default day
  const [events, setEvents] = useState(eventsData[selectedDay]);

  const handleDelete = (eventToDelete) => {
    // Filter out the event to be deleted
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
  };

  const handleAddEvent = () => {
    // Add the new event to the events array
    setEvents([...events, newEvent]);
    // Close the popup and reset the form
    setShowPopup(false);
    setNewEvent({
      event_name: "",
      starttime: "",
      endtime: "",
    });
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setEvents(eventsData[day]);
  };

  return (
    <div className="App">
      <div className="navbar">
        <h2>Plan My Classes</h2>
      </div>
      <div className="content-container">
        <div className="sidebar">
          <ul>
            {Object.keys(eventsData).map((day) => (
              <li key={day} onClick={() => handleDaySelect(day)}>
                {day}
              </li>
            ))}
            {isAdmin && (
              <li>
                <button onClick={() => setShowPopup(true)}>
                  Add new Event
                </button>
              </li>
            )}
          </ul>
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Add New Event</h2>
              <form>
                <label>Event Name:</label>
                <input
                  type="text"
                  value={newEvent.event_name}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, event_name: e.target.value })
                  }
                />
                <label>Start Time:</label>
                <input
                  type="datetime-local"
                  value={newEvent.starttime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, starttime: e.target.value })
                  }
                />
                <label>End Time:</label>
                <input
                  type="datetime-local"
                  value={newEvent.endtime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, endtime: e.target.value })
                  }
                />
                <button type="button" onClick={handleAddEvent}>
                  Submit
                </button>
                <button type="button" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="main-content">
          <h1>Your Schedule</h1>
          <p>Hope we saved you 2 minutes</p>
          <div className="content-container-light">
            {events.map((event, index) => (
              <EventBlock
                key={index}
                event={event}
                admin={isAdmin}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
