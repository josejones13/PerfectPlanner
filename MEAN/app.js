const express = require("express");
const path = require("path");
const createError = require("http-errors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ---- CONNECT TO MONGODB ATLAS ----
if (!process.env.MONGODB_URI) {
    console.error("❌ ERROR: MONGODB_URI is missing in .env");
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ Database Error:", err));

// ---- MIDDLEWARE ----
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---- VIEWS ----
app.set("view engine", "ejs");
app.set("views", [
    path.join(__dirname, "views"),
    path.join(__dirname, "views/events")
]);

// ---- ROUTES ----
const eventRoutes = require("./routes/events");
app.use("/events", eventRoutes);

// ---- HOME PAGE ----
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

// ---- 404 HANDLER ----
app.use((req, res, next) => {
    res.status(404).render("error", {
        message: "Page not found",
        error: { status: 404, stack: "" },
        title: "Error"
    });
});

// ---- ERROR HANDLER ----
app.use((err, req, res, next) => {
    res.status(err.status || 500).render("error", {
        message: err.message,
        error: err,
        title: "Error"
    });
});

module.exports = app;


