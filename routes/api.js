const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('innovision.db')

router.post("/login", (req,res) => {
  if(!req.body.username || !req.body.password) {
    return res.sendStatus(400)
  }
  db.get('SELECT id FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }
    if (row) {
      return res.json({ message: 'Login successful.' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
  });
})
router.post("/register", (req, res) => {
  console.log(req.body);

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [req.body.username, req.body.password], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error inserting user into the database.' });
    }

    db.get('SELECT id FROM users WHERE username = ?', [req.body.username], (err, row) => {
      if (err) {
        return res.status(501).json({ error: 'Error retrieving user ID.' });
      }

      const id = row.id;
      db.run('INSERT INTO profiles (user_id, year, branch, name, urn, email) VALUES (?, ?, ?, ?, ?, ?)', [id, req.body.year, req.body.branch, req.body.name, req.body.urn, req.body.email], function (err) {
        if (err) {
          console.log(err)
          return res.status(502).json({ error: 'Error inserting profile into the database.' });
        }

        return res.status(201).json({ message: 'User created successfully.' });
      });
    });
  });
});

module.exports = router
