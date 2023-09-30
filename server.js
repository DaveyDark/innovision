const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser"); // Middleware for parsing request bodies

const api = require("./routes/api");
const sports = require("./routes/sports");

app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", api);
app.use("/sports", sports);
app.use(
  session({
    secret: "finance",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {'session': req.session});
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(5000);
