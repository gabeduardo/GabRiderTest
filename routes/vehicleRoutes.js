const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Obtener todos los vehículos
router.get('/vehicles', vehicleController.getAllVehicles);

// Obtener un vehículo por ID
router.get('/vehicles/:id', vehicleController.getVehicleById);

// Crear un nuevo vehículo
router.post('/vehicles', vehicleController.createVehicle);

// Actualizar el estado de un vehículo
router.put('/vehicles/:id/status', vehicleController.updateVehicleStatus);

module.exports = router;
