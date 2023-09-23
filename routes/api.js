const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('innovision.db')

router.post("/login", (req,res) => {
  res.sendStatus(200)
})

module.exports = router
