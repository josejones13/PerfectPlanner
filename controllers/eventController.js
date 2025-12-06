const EventModel = require("../models/event");


// List all events
exports.listEvents = (req, res) => {
    let events = EventModel.getAllEvents();


    // ----- Searching -----
    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        events = events.filter(e =>
            e.name.toLowerCase().includes(searchTerm) ||
            e.type.toLowerCase().includes(searchTerm)
        );
    }


    // ----- Sorting -----
    if (req.query.sort) {
        const sortBy = req.query.sort;
        events = events.sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "type") return a.type.localeCompare(b.type);
            if (sortBy === "date") return new Date(a.date) - new Date(b.date);
        });
    }


    res.render("events/list", {
        title: "Events",
        events: events  // <-- Make sure variable matches EJS
    });
};


// Show create event form
exports.showCreateForm = (req, res) => {
    res.render("events/create", { title: "Add Event" });
};


// Handle create event
exports.createEvent = (req, res) => {
    EventModel.addEvent(req.body);
    res.redirect("/events/list");
};


// Show edit event form
exports.showEditForm = (req, res) => {
    const event = EventModel.getEventById(req.params.id);
    if (!event) return res.status(404).send("Event not found");
    res.render("events/edit", { title: "Edit Event", event });
};


// Handle edit event
exports.editEvent = (req, res) => {
    EventModel.updateEvent(req.params.id, req.body);
    res.redirect("/events/list");
};


// Handle delete event
exports.deleteEvent = (req, res) => {
    EventModel.deleteEvent(req.params.id);
    res.redirect("/events/list");
};




