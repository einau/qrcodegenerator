const QRCode = require('qrcode');

module.exports = {
  generateQR: async (text) => {
    return QRCode.toBuffer(text, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1E3A8A',
        light: '#FFFFFF'
      }
    });
  }
};
