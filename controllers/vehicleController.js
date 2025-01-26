const Vehicle = require('../models/Vehicle');

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.send(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al consultar todos los vehículos');
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).send({ error: 'Vehículo no encontrado' });
    }
    res.send(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error del servidor' });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle({
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      status: req.body.status,
      createdBy: req.body.createdBy,
      updatedBy: req.body.createdBy,
    });
    const savedVehicle = await newVehicle.save();
    res.status(201).send(savedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error creando el vehículo' });
  }
};

exports.updateVehicleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).send({ error: 'Vehículo no encontrado' });
    }
    vehicle.status = req.body.status;
    vehicle.updatedBy = req.body.updatedBy;
    vehicle.updatedAt = new Date();
    const updatedVehicle = await vehicle.save();
    res.send(updatedVehicle);
  } catch (error) {
    console.error('Error actualizando el vehículo:', error);
    res.status(500).send({ error: 'Error actualizando el vehículo' });
  }
};
