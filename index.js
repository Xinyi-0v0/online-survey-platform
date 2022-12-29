const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI).then(() => console.log("Connected!"));

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google"> Sign in with google</a>');
});

app.get("/new", (req, res) => {
  res.send("hello");
});

// shortcut: const autoRoutes = require('./routes/autoRoutes'); autoRoutes(app)
require("./routes/autoRoutes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(PORT);
});
