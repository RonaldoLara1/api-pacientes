const { getConnection, sql } = require('../config/db');

exports.getPacientes = async (req, res) => {

  try {

    const pool = await getConnection();

    const result = await pool.request()
      .query("SELECT * FROM pacientes");

    res.json(result.recordset);

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

};