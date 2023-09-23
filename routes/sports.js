const express = require('express')
const router = express.Router()

router.post("/cricket", (req,res) => {
  res.render("cricket");
})

router.post("/swimming", (req,res) => {
  res.render("swimming");
})

router.post("/badminton", (req,res) => {
  res.render("badminton");
})

router.post("/basketball", (req,res) => {
  res.render("basketball");
})

router.post("/chess", (req,res) => {
  res.render("chess");
})

router.post("/football", (req,res) => {
  res.render("football");
})

router.post("/hockey", (req,res) => {
  res.render("hockey");
})

router.post("/lawn-tennis", (req,res) => {
  res.render("lawn_tennis");
})

router.post("/cycling", (req,res) => {
  res.render("cycling");
})

router.post("/volleyball", (req,res) => {
  res.render("volleyball");
})

router.post("/kabaddi", (req,res) => {
  res.render("kabaddi");
})

module.exports = router
