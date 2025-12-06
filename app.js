// app.js
const express = require("express");
const path = require("path");
const createError = require("http-errors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
require("dotenv").config();

const app = express();

// ==== DATABASE CONNECTION ====
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB Error:", err));


// ==== VIEW ENGINE SETUP ====
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// ==== MIDDLEWARE ====
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // <-- helps when Angular connects later
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// ==== SESSION (must come before passport) ====
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());


// ==== PASSPORT SETUP ====
require("./config/passport")(passport);   // <-- loads local + google/github/discord
app.use(passport.initialize());
app.use(passport.session());


// Make user available in all views
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});


// ==== MIDDLEWARE ====
const { ensureAuthenticated } = require("./middleware/authMiddleware");


// ==== ROUTES ====

// Auth first
app.use("/auth", require("./routes/auth"));

// Public route to view login
app.get("/login", (req, res) => res.redirect("/auth/login")); // convenience shortcut

// Protected routes
app.use("/profile", ensureAuthenticated, require("./routes/profile"));
app.use("/events", ensureAuthenticated, require("./routes/events"));

// Home (protected)
app.get("/", ensureAuthenticated, (req, res) => {
  res.render("index", { title: "Home" });
});



// ==== 404 HANDLER ====
app.use((req, res, next) => {
  next(createError(404));
});


// ==== ERROR PAGE ====
app.use((err, req, res, next) => {
  res.status(err.status || 500).render("error", {
    title: "Error",
    message: err.message,
    error: err,
  });
});


// ==== START SERVER ====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
