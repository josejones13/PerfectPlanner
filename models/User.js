const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {                         
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: function () {
        
        return !this.googleId && !this.githubId && !this.discordId;
      },
    },

    
    googleId: { type: String, default: null },
    githubId: { type: String, default: null },
    discordId: { type: String, default: null },

    
    profilePicture: {
      type: String,
      default: "/uploads/default.png",
    },

    
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


userSchema.methods.matchPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
