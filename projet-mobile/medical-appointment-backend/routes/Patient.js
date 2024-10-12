const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Créer un nouveau patient
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Obtenir tous les patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Obtenir un patient par ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).send('Patient not found');
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Mettre à jour un patient
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).send('Patient not found');
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Supprimer un patient
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).send('Patient not found');
    res.status(200).send('Patient deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
