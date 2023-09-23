const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/register', (req, res) => {
  res.render('registration'); // Render your Pug template for the registration form
});

app.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const crn = req.body.crn;
  const urn = req.body.urn;
  const username = req.body.username;
  const password = req.body.password;
  const selectedSports = req.body.sports; // This will be an array of selected sports

  // Save the selected sports to your database

  // Example response (you should replace this with your actual response handling)
  res.send('Registration successful');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
