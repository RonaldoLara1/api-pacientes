const sql = require('mssql');

const config = {
  user: 'Ronaldo____SQLLogin_2',
  password: 'amcaqq3vfk',
  server: 'ClinicaP.mssql.somee.com',
  database: 'ClinicaP',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { sql, getConnection };