const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('innovision.db')

function isAdmin(id,callback) {
  db.all('SELECT * FROM admins WHERE user_id=?', [id], (err, row) => {
    if (err) {
      console.log(`Error retrieving rows: ${err}`);
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
}

router.post("/login", (req,res) => {
  if(!req.body.username || !req.body.password) {
    return res.sendStatus(400)
  }
  db.get('SELECT id FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }
    if (row) {
      isAdmin(row.id,(err,r) => {
        if(err) {
          return res.sendStatus(500)
        } else {
          req.session.user_id = row.id;
          if(r.length > 0){
            req.session.admin = true;
            return res.status(202).json({ message: 'Login successful.' });
          } else {
            return res.status(200).json({ message: 'Login successful.' });
          }
        }
      })
    } else {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
  });
})

router.post('/logout', (req,res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.sendStatus(500)
    } else {
      return res.sendStatus(200)
    }
  });
})

router.post("/register", (req, res) => {
  const {
    name,
    crn,
    urn,
    email,
    branch,
    year,
    gender,
    bio,
    sports,
    password,
    passwordConfirm,
  } = req.body;

  if (!name || !crn || !urn || !email || !gender || !branch || !year || !password || !passwordConfirm) {
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
        INSERT INTO profiles (user_id, bio, year, branch, name, urn, email, gender)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.run(
        insertProfileQuery,
        [userId, bio, year, branch, name, urn, email, gender],
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

function getEvents(limit, callback) {
  db.all('SELECT * FROM events LIMIT ?', [limit], (err, rows) => {
    if (err) {
      console.log(`Error retrieving rows: ${err}`);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

function getEventsFor(sport,callback) {
  db.all('SELECT * FROM events WHERE sport=? LIMIT 10', [sport], (err, rows) => {
    if (err) {
      console.log(`Error retrieving rows: ${err}`);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

function getEventByID(id,callback) {
  db.get('SELECT * FROM events WHERE id=?', [id], (err, row) => {
    if (err) {
      console.log(`Error retrieving row: ${err}`);
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
}

function getEntriesFor(event_id, callback) {
  const query = `
    SELECT users.*, profiles.*
    FROM entries
    JOIN users ON entries.user_id = users.id
    JOIN profiles ON users.id = profiles.user_id
    WHERE entries.event_id = ?
  `;

  db.all(query, [event_id], (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, rows);
  });
}

router.get('/events', (req,res) => {
  getEvents(10,(err,rows) => {
    if(err) {
      return res.sendStatus(500)
    } else {
      return res.status(200).json(rows)
    }
  })
})

router.post('/events/add', (req,res) => {
  const {
    name,
    sport,
    level,
    type,
    date,
    time,
    venue,
    description,
  } = req.body;

  if (!name || !sport || !level || !type || !date || !time || !venue || !description) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const insertQuery = "INSERT INTO events (name,sport,level,type,date,time,venue,description) VALUES (?,?,?,?,?,?,?,?)";

  db.run(insertQuery, [name,sport,level,type,date,time,venue,description], (err) => {
    if(err) {
      console.log(`Error adding event: ${err}`)
      return res.sendStatus(500)
    } else {
      return res.sendStatus(200)
    }
  })
})

router.get('/events/:sport', (req,res) => {
  getEventsFor(req.params.sport,(err,rows) => {
    if(err) {
      return res.sendStatus(500)
    } else {
      return res.status(200).json(rows)
    }
  })
})

function getProfile(id,callback) {
  const query = `
    SELECT
      users.id AS user_id,
      username,
      password,
      bio,
      year,
      branch,
      name,
      urn,
      email,
      gender,
      GROUP_CONCAT(interest) AS interests
    FROM
      users
    INNER JOIN
      profiles ON users.id = profiles.user_id
    LEFT JOIN
      interests ON users.id = interests.user_id
    WHERE
      users.id = ?
    GROUP BY
      users.id`;
  db.get(query, [id], (err, row) => {
    if (err) {
      console.log(`Error retrieving rows: ${err}`);
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
}

router.get('/profile/:id', (req,res) => {
  getProfile(req.params.id,(err,row) => {
    if(err) {
      return res.sendStatus(500)
    } else {
      return res.status(200).json(row)
    }
  })
})

module.exports = {
  router,
  getEvents,
  getEventsFor,
  getEventByID,
  getEntriesFor,
  getProfile,
}
