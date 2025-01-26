const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['disponible', 'en mantenimiento', 'en servicio'],
      default: 'disponible',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
