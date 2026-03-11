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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});