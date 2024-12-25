const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your DB username
  password: 'vedu', // Replace with your DB password
  database: 'lead_management', // DB name
});

db.connect(err => {
  if (err) {
    console.error('Connection error:', err);
    return;
  }
  console.log('MySQL Connected...');
});

module.exports = db;
