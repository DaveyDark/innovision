const express = require("express");
const router = express.Router();

router.get("/cricket", (req, res) => {
  res.render("cricket", {'session': req.session});
});

router.get("/swimming", (req, res) => {
  res.render("swimming", {'session': req.session});
});

router.get("/badminton", (req, res) => {
  res.render("badminton", {'session': req.session});
});

router.get("/basketball", (req, res) => {
  res.render("basketball", {'session': req.session});
});

router.get("/chess", (req, res) => {
  res.render("chess", {'session': req.session});
});

router.get("/football", (req, res) => {
  res.render("football", {'session': req.session});
});

router.get("/hockey", (req, res) => {
  res.render("hockey", {'session': req.session});
});

router.get("/lawn-tennis", (req, res) => {
  res.render("lawn_tennis", {'session': req.session});
});

router.get("/cycling", (req, res) => {
  res.render("cycling", {'session': req.session});
});

router.get("/volleyball", (req, res) => {
  res.render("vollyball", {'session': req.session});
});

router.get("/kabaddi", (req, res) => {
  res.render("kabaddi", {'session': req.session});
});

module.exports = router;
