const  express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");

// List events
router.get("/list", eventController.listEvents);

// Create event
router.get("/create", eventController.showCreateForm);
router.post("/create", eventController.createEvent);

// Edit event
router.get("/edit/:id", eventController.showEditForm);
router.post("/edit/:id", eventController.editEvent);

// Delete event
router.get("/delete/:id", eventController.deleteEvent);

module.exports = router;
