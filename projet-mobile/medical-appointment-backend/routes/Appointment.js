const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Créer un nouveau rendez-vous
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Obtenir tous les rendez-vous
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient').populate('medecin');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Obtenir un rendez-vous par ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patient').populate('medecin');
    if (!appointment) return res.status(404).send('Rendez-vous non trouvé');
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Mettre à jour un rendez-vous
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).send('Rendez-vous non trouvé');
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Supprimer un rendez-vous
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).send('Rendez-vous non trouvé');
    res.status(200).send('Rendez-vous supprimé');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
