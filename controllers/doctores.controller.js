const { getConnection, sql } = require('../config/db');

exports.getDoctores = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Doctores");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createDoctor = async (req, res) => {
  const { nombre, especialidad, correoElectronico } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("especialidad", sql.VarChar, especialidad)
      .input("correoElectronico", sql.VarChar, correoElectronico)
      .query("INSERT INTO Doctores (nombre, especialidad, correoElectronico) VALUES (@nombre, @especialidad, @correoElectronico)");
    res.status(201).json({ message: "Doctor agregado correctamente" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Doctores WHERE id = @id");
    res.json({ message: "Doctor eliminado correctamente" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};