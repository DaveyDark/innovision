const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const api = require("./routes/api");
const sports = require("./routes/sports");

app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "finance",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "pug");
app.use("/sports", sports);
app.use("/api", api.router);

app.get("/", (req, res) => {
  api.getEvents(10,(err,rows) => {
    if(err) {
      res.render("index", {'session': req.session, 'events': {}});
    } else {
      res.render("index", {'session': req.session, 'events': rows});
    }
  })
});
app.get("/login", (req, res) => {
  res.render("login", {'session': req.session});
});
app.get("/register", (req, res) => {
  res.render("register", {'session': req.session});
});
app.get('/profile/:id', (req,res) => {
  api.getProfile(req.params.id,(err,row) => {
    if(err) {
      res.sendStatus(500)
    } else {
      if(row) 
        res.render("profile", {'session': req.session, 'profile': row});
      else
        res.sendStatus(404)
    }
  })
})

app.get("/admin", (req, res) => {
  if(!req.session.admin) {
    res.redirect('/')
  } else {
    api.getEvents(99999,(err,rows) => {
      if(err) {
        res.render("admin", {'session': req.session, 'events': {}});
      } else {
        res.render("admin", {'session': req.session, 'events': rows});
      }
    })
  }
});

app.get("/admin/add-event", (req, res) => {
  if(!req.session.admin) {
    res.redirect('/')
  } else {
    res.render("admin_new_event", {'session': req.session});
  }
});

app.listen(5000);
