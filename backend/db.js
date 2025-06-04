const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

async function query(q) {
  await poolConnect;
  try {
    return await pool.request().query(q);
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

module.exports = { query };
