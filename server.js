const express = require('express');
const cors = require('cors');
const { getConnection, sql } = require('./config/db'); 

const app = express();
app.use(cors());
app.use(express.json());

app.get('/pacientes', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Pacientes'); 
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});
app.post('/pacientes', async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('edad', sql.Int, edad)
      .query('INSERT INTO Pacientes (nombre, edad) VALUES (@nombre, @edad)');
    res.status(201).json({ message: 'Paciente agregado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar paciente' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});