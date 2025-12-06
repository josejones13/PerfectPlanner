const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const User = require("../models/User");

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "/auth/discord/callback",
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ discordId: profile.id });

        if (!user) {
          user = await User.create({
            discordId: profile.id,
            username: profile.username,
            profilePicture: profile.avatar
              ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
              : "/uploads/default.png",
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
