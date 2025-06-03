const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const qrGenerator = require('./qrGenerator');

const app = express();
const db = new sqlite3.Database('./certs.db');

// Create database table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS certificates (
    id TEXT PRIMARY KEY,
    studentName TEXT,
    studentId TEXT,
    courseName TEXT,
    entryDate TEXT,
    completionDate TEXT
  )`);
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoints
app.get('/api/verify/:id', (req, res) => {
  db.get('SELECT * FROM certificates WHERE id = ?', [req.params.id], (err, row) => {
    if (row) {
      res.json({
        valid: true,
        studentName: row.studentName,
        studentId: row.studentId,
        courseName: row.courseName,
        entryDate: row.entryDate,
        completionDate: row.completionDate
      });
    } else {
      res.json({ valid: false });
    }
  });
});

// QR Code Generation Endpoint
app.get('/api/qrcode/:id', async (req, res) => {
  const certId = req.params.id;
  const verificationUrl = `https://${req.get('host')}/verify/${certId}`;
  
  try {
    const qrCode = await qrGenerator.generateQR(verificationUrl);
    res.setHeader('Content-Type', 'image/png');
    res.send(qrCode);
  } catch (err) {
    res.status(500).json({ error: 'QR generation failed' });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
