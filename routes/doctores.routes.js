const express = require('express');
const router = express.Router();
const doctoresController = require('../controllers/doctoresController');

router.get('/doctores', doctoresController.getDoctores);
router.post('/doctores', doctoresController.createDoctor);
router.delete('/doctores/:id', doctoresController.deleteDoctor);

module.exports = router;