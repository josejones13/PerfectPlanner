const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { ensureAuthenticated } = require("../middleware/authMiddleware");
const User = require("../models/User");

// Profile page
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("profile/profile", {
        title: "Profile",
        user: req.user
    });
});

// Upload new profile picture
router.post("/upload", ensureAuthenticated, upload.single("profilePicture"), async (req, res) => {
    if (!req.file) {
        req.flash("error", "Please upload an image file");
        return res.redirect("/profile");
    }

    req.user.profilePicture = "/uploads/" + req.file.filename;
    await req.user.save();

    req.flash("success", "Profile Picture Updated!");
    res.redirect("/profile");
});

module.exports = router;
