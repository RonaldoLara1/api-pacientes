const { getConnection, sql } = require('../config/db');

// Crear paciente
exports.createPaciente = async (req, res) => {
  const { nombre, edad } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("edad", sql.Int, edad)
      .query("INSERT INTO pacientes (nombre, edad) VALUES (@nombre, @edad)");

    res.status(201).json({ message: "Paciente agregado correctamente" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener todos los pacientes (ya lo tienes)
exports.getPacientes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM pacientes");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Editar paciente
exports.updatePaciente = async (req, res) => {
  const { id } = req.params;
  const { nombre, edad } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input("id", sql.Int, id)
      .input("nombre", sql.VarChar, nombre)
      .input("edad", sql.Int, edad)
      .query("UPDATE pacientes SET nombre = @nombre, edad = @edad WHERE id = @id");

    res.json({ message: "Paciente actualizado correctamente" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deletePaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM pacientes WHERE id = @id");

    res.json({ message: "Paciente eliminado correctamente" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};