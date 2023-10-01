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
      req.session.user_id = row.id;
      return res.status(200).json({ message: 'Login successful.' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
  });
})

router.post('/logout', (req,res) => {
  if(!req.session.user_id){
    return res.sendStatus(500)
  } else {
    delete req.session.user_id
    return res.sendStatus(200)
  }
})

router.post("/register", (req, res) => {
  const {
    name,
    crn,
    urn,
    email,
    branch,
    year,
    bio,
    sports,
    password,
    passwordConfirm,
  } = req.body;

  if (!name || !crn || !urn || !email || !branch || !year || !bio || !password || !passwordConfirm) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const username = crn;

  const checkUsernameQuery = "SELECT id FROM users WHERE username = ?";
  db.get(checkUsernameQuery, [username], (err, row) => {
    if (err) {
      console.error("Error checking username:", err.message);
      return res.status(500).json({ error: "Failed to register user." })
    }

    if (row) {
      return res.status(409).json({ error: "Username already in use." })
    }

    const insertUserQuery = `
      INSERT INTO users (username, password) 
      VALUES (?, ?)
    `;
    db.run(insertUserQuery, [username, password], function (err) {
      if (err) {
        console.error("Error inserting user:", err.message)
        return res.status(500).json({ error: "Failed to register user." })
      }

      const userId = this.lastID

      const insertProfileQuery = `
        INSERT INTO profiles (user_id, bio, year, branch, name, urn, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      db.run(
        insertProfileQuery,
        [userId, bio, year, branch, name, urn, email],
        function (err) {
          if (err) {
            console.error("Error inserting profile:", err.message);
            return res.status(500).json({ error: "Failed to register user." })
          }

          if (sports && sports.length > 0) {
            const insertInterestQuery = `
              INSERT INTO interests (interest, user_id)
              VALUES (?, ?)
            `;
            sports.forEach((interest) => {
              db.run(insertInterestQuery, [interest, userId], function (err) {
                if (err) {
                  console.error("Error inserting interest:", err.message)
                  return res.status(500).json({ error: "Failed to register user." })
                }
              })
            })
          }

          return res.sendStatus(200);
        }
      )
    })
  })
})


router.get('/events', (req,res) => {
  res.sendStatus(200)
})

module.exports = router
