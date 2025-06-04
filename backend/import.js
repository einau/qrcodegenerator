const { query } = require('./db');
const { uploadQRCode } = require('./blobStorage');
const qrGenerator = require('./qrGenerator');

async function main() {
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

  // Create table
  await query(`
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
    const verificationUrl = `https://YOUR-DOMAIN/verify/${cert.id}`;
    const qrBuffer = await qrGenerator.generateQR(verificationUrl);
    await uploadQRCode(cert.id, qrBuffer);
    
    console.log(`Added certificate ${cert.id}`);
  }
}

main().catch(console.error);
