const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./certs.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS certificates (...)`);
  
  // Add your certificate
  db.run(`INSERT INTO certificates VALUES (
    '0016186',
    'Mbalire Henry',
    '256',
    'Safety Management Systems',
    '14th May 2022',
    '8th July 2024'
  )`);
});

db.close();
