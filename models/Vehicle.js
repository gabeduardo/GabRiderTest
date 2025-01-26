const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'La marca es obligatoria'],
      trim: true, // Remove leading and trailing spaces
    },
    model: {
      type: String,
      required: [true, 'El modelo es obligatorio'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'El año es obligatorio'],
      min: [1886, 'El año debe ser posterior a la invención del automóvil'], // Minimum allowed year
    },
    status: {
      type: String,
      enum: {
        values: ['disponible', 'en mantenimiento', 'en servicio'],
        message:
          'El estado debe ser: disponible, en mantenimiento o en servicio',
      },
      default: 'disponible',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El campo creado por es obligatorio'],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;
