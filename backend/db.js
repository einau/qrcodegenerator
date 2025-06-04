const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
    connectionTimeout: 30000,
    requestTimeout: 30000,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    }
  }
};

// Create connection pool
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

// Enhanced query function with retry logic
async function query(q) {
  await poolConnect;
  
  try {
    return await pool.request().query(q);
  } catch (err) {
    console.error(`SQL Error: ${err.message}`, `Query: ${q}`);
    
    // Reset connection pool on error
    if (err.code === 'ETIMEOUT' || err.code === 'ESOCKET') {
      await pool.close();
      await pool.connect();
      return pool.request().query(q);
    }
    
    throw err;
  }
}

module.exports = { query, sql };
