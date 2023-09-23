const express = require("express");
const router = express.Router();

router.get("/cricket", (req, res) => {
  res.render("event_details");
});

router.get("/swimming", (req, res) => {
  res.render("swimming");
});

router.get("/badminton", (req, res) => {
  res.render("badminton");
});

router.get("/basketball", (req, res) => {
  res.render("basketball");
});

router.get("/chess", (req, res) => {
  res.render("chess");
});

router.get("/football", (req, res) => {
  res.render("football");
});

router.get("/hockey", (req, res) => {
  res.render("hockey");
});

router.get("/lawn-tennis", (req, res) => {
  res.render("lawn_tennis");
});

router.get("/cycling", (req, res) => {
  res.render("cycling");
});

router.get("/volleyball", (req, res) => {
  res.render("volleyball");
});

router.get("/kabaddi", (req, res) => {
  res.render("kabaddi");
});

module.exports = router;
