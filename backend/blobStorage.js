const { BlobServiceClient } = require('@azure/storage-blob');

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient('qrcodes');

async function uploadQRCode(certId, buffer) {
  const blockBlobClient = containerClient.getBlockBlobClient(`${certId}.png`);
  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: 'image/png' }
  });
  return blockBlobClient.url;
}

async function getQRCodeUrl(certId) {
  const blockBlobClient = containerClient.getBlockBlobClient(`${certId}.png`);
  return blockBlobClient.url;
}

module.exports = { uploadQRCode, getQRCodeUrl };
