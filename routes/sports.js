const express = require("express");
const router = express.Router();
const api = require("./api");

router.get("/cricket", (req, res) => {
  api.getEventsFor('Cricket',(err,rows) => {
    if(err) {
      res.render("cricket", {'session': req.session, 'events': {}});
    } else {
      res.render("cricket", {'session': req.session, 'events': rows});
    }
  })
});

router.get("/swimming", (req, res) => {
  api.getEventsFor('Swimming',(err,rows) => {
    if(err) {
      res.render("swimming", {'session': req.session, 'events': {}});
    } else {
      res.render("swimming", {'session': req.session, 'events': rows});
    }
  })
});

router.get("/badminton", (req, res) => {
  api.getEventsFor('Badminton',(err,rows) => {
    if(err) {
      res.render("badminton", {'session': req.session, 'events': {}});
    } else {
      res.render("badminton", {'session': req.session, 'events': rows});
    }
  })
});

router.get("/basketball", (req, res) => {
  api.getEventsFor('Basketball',(err,rows) => {
    if(err) {
      res.render("basketball", {'session': req.session, 'events': {}});
    } else {
      res.render("basketball", {'session': req.session, 'events': rows});
    }
  })
});

router.get("/chess", (req, res) => {
  api.getEventsFor('Chess',(err,rows) => {
    if(err) {
      res.render("chess", {'session': req.session, 'events': {}});
    } else {
      res.render("chess", {'session': req.session, 'events': rows});
    }
  })
});

router.get("/cycling", (req, res) => {
  api.getEventsFor('Cycling',(err,rows) => {
    if(err) {
      res.render("cycling", {'session': req.session, 'events': {}});
    } else {
      res.render("cycling", {'session': req.session, 'events': rows});
    }
  })
});

router.get("/football", (req, res) => {
  api.getEventsFor('Football',(err,rows) => {
    if(err) {
      res.render("football", {'session': req.session, 'events': {}});
    } else {
      res.render("football", {'session': req.session, 'events': rows});
    }
  })
});

router.get("/hockey", (req, res) => {
  api.getEventsFor('Hockey',(err,rows) => {
    if(err) {
      res.render("kabaddi", {'session': req.session, 'events': {}});
    } else {
      res.render("kabaddi", {'session': req.session, 'events': rows});
    }
  })
});

router.get("/lawn-tennis", (req, res) => {
  api.getEventsFor('Lawn Tennis',(err,rows) => {
    if(err) {
      res.render("lawn_tennis", {'session': req.session, 'events': {}});
    } else {
      res.render("lawn_tennis", {'session': req.session, 'events': rows});
    }
  })
});

router.get("/vollyball", (req, res) => {
  api.getEventsFor('Vollyball',(err,rows) => {
    if(err) {
      res.render("vollyball", {'session': req.session, 'events': {}});
    } else {
      res.render("vollyball", {'session': req.session, 'events': rows});
    }
  })
});

router.get("/kabaddi", (req, res) => {
  api.getEventsFor('Kabaddi',(err,rows) => {
    if(err) {
      res.render("kabaddi", {'session': req.session, 'events': {}});
    } else {
      res.render("kabaddi", {'session': req.session, 'events': rows});
    }
  })
});

module.exports = router;
