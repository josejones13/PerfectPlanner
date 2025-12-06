// config/passport.js
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;

const User = require("../models/ user");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  /* =========================
       LOCAL LOGIN STRATEGY
  =========================*/
passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" }, // <-- IMPORTANT
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          console.log("⚠ User not found");
          return done(null, false, { message: "User not found" });
        }

        console.log("\n===== LOGIN ATTEMPT =====");
        console.log("Username entered:", username);
        console.log("Password entered:", password);
        console.log("Stored hash:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);



  /* =========================
        GOOGLE STRATEGY
  =========================*/
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.BASE_URL + "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = await User.create({
              username: profile.displayName,
              googleId: profile.id,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  /* =========================
        GITHUB STRATEGY
  =========================*/
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.BASE_URL + "/auth/github/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ githubId: profile.id });

          if (!user) {
            user = await User.create({
              username: profile.username,
              githubId: profile.id,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  /* =========================
        DISCORD STRATEGY
  =========================*/
  passport.use(
    new DiscordStrategy(
      {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.BASE_URL + "/auth/discord/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ discordId: profile.id });

          if (!user) {
            user = await User.create({
              username: profile.username,
              discordId: profile.id,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  /* =========================
        SERIALIZE / DESERIALIZE
  =========================*/
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findById(id).then(u => done(null, u)));
};


