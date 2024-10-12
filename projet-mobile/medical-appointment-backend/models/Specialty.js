// models/Specialty.js
const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
  name: { type: String, required: true },
  medecins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medecin' }]
});

module.exports = mongoose.model('Specialty', specialtySchema);
