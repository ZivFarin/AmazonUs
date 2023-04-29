import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from 'react';

import './App.css';

const baseUrl = "http://localhost:5000"

function App() {
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [eventId, setEventId] = useState(null);

  const fetchEvents = async () => {
    const data = await axios.get(`${baseUrl}/events`)
    const { events } = data.data
    setEventsList(events);
  }

  const handleChange = (e, field) => {
    if (field === 'edit') {
      setEditDescription(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/event/${id}`)
      /** It might be wise to update the list without accessing the backend to reduce traffic (just filter the list),
       * but I chose the easy path: */
      fetchEvents()
    } catch (err) {
      console.error(err.message)
    }
  }

  const toggleEdit = (event) => {
    setEventId(event.id);
    setEditDescription(event.description);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editDescription) {
        const data = await axios.put(`${baseUrl}/event/${eventId}`, { description: editDescription })
        const updatedEvent = data.data.event;
        const updatedList = eventsList.map(event => {
          if (event.id === eventId) {
            return event = updatedEvent
          }
          return event
        })
        setEventsList(updatedList)
      } else {
        const data = await axios.post(`${baseUrl}/events`, { description })
        setEventsList([...eventsList, data.data])
      }
      setDescription('');
      setEditDescription('');
      setEventId(null);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  return (
    <div className="App">
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="description">Description</label>
          <input
            onChange={(e) => handleChange(e, 'description')}
            type="text"
            name="description"
            id="description"
            placeholder='Describe the event'
            value={description}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
      <section>
        <ul>
          {eventsList.map(event => {
            if (eventId === event.id) {
              return (
                <li>
                  <form onSubmit={handleSubmit} key={event.id}>
                    <input
                      onChange={(r) => handleChange(r, 'edit')}
                      type="text"
                      name="editDescription"
                      id="editDescription"
                      value={editDescription}
                    />
                    <button type="submit">Submit</button>
                  </form>
                </li>
              )
            } else {
              return (
                <li style={{ display: "flex" }} key={event.id}>
                  <button onClick={() => handleDelete(event.id)}>X</button>
                  <button onClick={() => toggleEdit(event)}>Edit</button>
                  {format(new Date(event.creation_date), "MM/dd, p")}: {" "}
                  {event.description}
                </li>
              )
            }
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
