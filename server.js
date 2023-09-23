const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser"); // Middleware for parsing request bodies

const api = require("./routes/api");

app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", api);
app.use(
  session({
    secret: "finance",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(5000);
