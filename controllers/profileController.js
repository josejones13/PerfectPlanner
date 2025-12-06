const User = require("../models/User");

exports.uploadProfilePicture = async (req, res) => {
  if (!req.file)
    return res.status(400).send("No file uploaded");

  try {
    const user = await User.findById(req.user._id);

    user.profilePicture = `/uploads/profile/${req.file.filename}`;
    await user.save();

    return res.redirect("/profile"); // redirect after upload
  } catch (err) {
    console.error(err);
    res.status(500).send("Upload failed");
  }
};
