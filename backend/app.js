const express = require('express');
const path = require('path');
const { query } = require('./db');
const { getQRCodeUrl } = require('./blobStorage');
const qrGenerator = require('./qrGenerator');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Verification endpoint
app.get('/api/verify/:id', async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM certificates WHERE id = '${req.params.id}'`
    );
    
    if (result.recordset.length > 0) {
      const cert = result.recordset[0];
      res.json({
        valid: true,
        studentName: cert.studentName,
        studentId: cert.studentId,
        courseName: cert.courseName,
        entryDate: cert.entryDate,
        completionDate: cert.completionDate
      });
    } else {
      res.json({ valid: false });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// QR Code Endpoint
app.get('/api/qrcode/:id', async (req, res) => {
  try {
    const verificationUrl = `https://${req.get('host')}/verify/${req.params.id}`;
    const qrBuffer = await qrGenerator.generateQR(verificationUrl);
    
    res.set('Content-Type', 'image/png');
    res.send(qrBuffer);
  } catch (err) {
    res.status(500).send('QR generation failed');
  }
});

// QR URL Endpoint
app.get('/api/qrcode-url/:id', async (req, res) => {
  try {
    const qrUrl = await getQRCodeUrl(req.params.id);
    res.json({ url: qrUrl });
  } catch (err) {
    res.status(500).json({ error: 'Blob storage error' });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
