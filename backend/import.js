const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./certs.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS certificates (
    id TEXT PRIMARY KEY,
    studentName TEXT,
    studentId TEXT,
    courseName TEXT,
    entryDate TEXT,
    completionDate TEXT
  )`);
  
  // Insert sample certificate
  const stmt = db.prepare(`INSERT INTO certificates VALUES (?, ?, ?, ?, ?, ?)`);
  
  stmt.run(
    '0016186',
    'Mbalire Henry',
    '256',
    'Safety Management Systems',
    '14th May 2022',
    '8th July 2024'
  );
  
  stmt.finalize();
  console.log('Sample data inserted');
  
  db.each("SELECT * FROM certificates", (err, row) => {
    console.log(row);
  });
});

db.close();
