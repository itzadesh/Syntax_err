const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abhivansh@16',
  database: 'mydb5'
});

connection.query('SELECT * FROM timetable', (error, results, fields) => {
  if (error) {
    console.error('Error:', error);
    return;
   }
  console.log('Retrieved data:', results);
 });

if (connection.state === 'connected') {
  console.log('Connection is open');
} else {
  console.log('Connection is closed');
}

// Or use the 'end' event
connection.on('end', () => {
 console.log('Connection has ended');
});
connection.on('error', (err) => {
 console.error('Connection error:', err);
});

connection.end();
