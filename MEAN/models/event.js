// models/Event.js
let events = [];
let nextId = 1;


class Event {
    constructor(name, type, date, time, location) {
        this._id = nextId++; // use string
        this.name = name;
        this.type = type;
        this.date = date;
        this.time = time;
        this.location = location;
    }
}


// Get all events
function getAllEvents() {
    return events;
}


// Get a single event by _id
function getEventById(id) {
    return events.find(e => e._id == id);
}


// Add a new event
function addEvent(eventData) {
    const newEvent = new Event(
        eventData.name,
        eventData.type,
        eventData.date,
        eventData.time,
        eventData.location
    );
    events.push(newEvent);
}


// Update an existing event
function updateEvent(id, updatedData) {
    const event = getEventById(id);
    if (event) {
        event.name = updatedData.name;
        event.type = updatedData.type;
        event.date = updatedData.date;
        event.time = updatedData.time;
        event.location = updatedData.location;
    }
}


// Delete an event
function deleteEvent(id) {
    events = events.filter(e => e._id != id);
}


module.exports = { getAllEvents, getEventById, addEvent, updateEvent, deleteEvent };