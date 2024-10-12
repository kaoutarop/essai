// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  medecin: { type: mongoose.Schema.Types.ObjectId, ref: 'Medecin', required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },
  notes: { type: String }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
