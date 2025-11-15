const express = require("express");
const path = require("path");
const createError = require("http-errors");
const app = express();

// Middleware to read POST bodies
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
const eventRoutes = require("./routes/events");
app.use("/events", eventRoutes);

// Home route
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

// Error handler for 404
app.use((req, res, next) => {
    next(createError(404));
});

// Final error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: err,
        title: "Error"
    });
});

module.exports = app;
