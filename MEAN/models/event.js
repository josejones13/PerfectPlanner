let  events = [];
let nextId = 1;

class Event {
    constructor(name, type, date, time, location) {
        this.id = nextId++;
        this.name = name;
        this.type = type;
        this.date = date;
        this.time = time;
        this.location = location;
    }
}

function getAllEvents() {
    return events;
}

function getEventById(id) {
    return events.find(e => e.id === parseInt(id));
}

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

function deleteEvent(id) {
    events = events.filter(e => e.id !== parseInt(id));
}

module.exports = {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent
};
