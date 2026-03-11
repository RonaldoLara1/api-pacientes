const express = require('express');
const router = express.Router();
const controller = require('../controllers/pacientes.controller');

router.get('/', controller.getPacientes);

module.exports = router;