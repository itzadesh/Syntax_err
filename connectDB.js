const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abhivansh@16',
  database: 'mydb2',
});

// Establish the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
connection.query('SELECT * FROM users', (err, results, fields) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return;
    }
    // Process the retrieved data in the "results" array
    console.log(results);
  });
  connection.end((err) => {
    if (err) {
      console.error('Error closing the MySQL connection:', err);
      return;
    }
    console.log('MySQL connection closed');
  });
  
  
