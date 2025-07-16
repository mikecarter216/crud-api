const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config();

// Placeholder user store (replace with DB logic if needed)
const users = [];

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://crud-api-jdvk.onrender.com/auth/google/callback', // Use your deployed URL
    },
    (accessToken, refreshToken, profile, done) => {
      // Find or create user
      let user = users.find((u) => u.id === profile.id);
      if (!user) {
        user = { id: profile.id, name: profile.displayName };
        users.push(user);
      }
      return done(null, user);
    }
  )
);

// Serialize and deserialize us
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});