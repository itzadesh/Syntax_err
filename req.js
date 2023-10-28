const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 4000; // Set your desired port number

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abhivansh@16',
  database: 'mydb2',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON data in request body
app.use(express.json());

// Route to handle user login
app.post('/login', (req, res) => {
  const { Enrollment_Number, password } = req.body;

  // Perform a database query to validate user credentials
  connection.query(
    'SELECT * FROM users WHERE Enrollment_Number = ? AND Passwords = ?',
    [Enrollment_Number, password],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        // No matching user found
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // User is authenticated, return user data
      const user = results[0];
      return res.json(user);
    }
  );
});

// Route to fetch user data by user ID
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  // Perform a database query to fetch user data by ID
  connection.query(
    'SELECT * FROM users WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        // No matching user found
        return res.status(404).json({ error: 'User not found' });
      }

      // User data found, return it
      const user = results[0];
      return res.json(user);
    }
  );
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
