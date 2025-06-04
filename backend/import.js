const { query } = require('./db');
const { uploadQRCode } = require('./blobStorage');
const qrGenerator = require('./qrGenerator');

async function main() {
  try {
    console.log("Starting database import...");
    
    const certificates = [
      {
        id: '0016186',
        studentName: 'Mbalire Henry',
        studentId: '256',
        courseName: 'Safety Management Systems',
        entryDate: '14th May 2022',
        completionDate: '8th July 2024'
      }
      // Add more certificates here
    ];

    // Create table if not exists
    await query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='certificates' AND xtype='U')
      CREATE TABLE certificates (
        id NVARCHAR(50) PRIMARY KEY,
        studentName NVARCHAR(100),
        studentId NVARCHAR(50),
        courseName NVARCHAR(100),
        entryDate NVARCHAR(50),
        completionDate NVARCHAR(50)
      )
    `);

    // Insert certificates and generate QR codes
    for (const cert of certificates) {
      // Check if certificate exists
      const exists = await query(
        `SELECT 1 FROM certificates WHERE id = '${cert.id}'`
      );
      
      if (exists.recordset.length === 0) {
        await query(`
          INSERT INTO certificates VALUES (
            '${cert.id}',
            '${cert.studentName}',
            '${cert.studentId}',
            '${cert.courseName}',
            '${cert.entryDate}',
            '${cert.completionDate}'
          )
        `);

        // Generate and upload QR code
        const verificationUrl = `https://${process.env.DOMAIN}/verify/${cert.id}`;
        const qrBuffer = await qrGenerator.generateQR(verificationUrl);
        await uploadQRCode(cert.id, qrBuffer);
        
        console.log(`✅ Added certificate ${cert.id}`);
      } else {
        console.log(`⏩ Certificate ${cert.id} already exists - skipping`);
      }
    }
    
    console.log("🎉 Database import completed successfully");
  } catch (err) {
    console.error("❌ Database import failed:", err.message);
    process.exit(1);
  }
}

main();
