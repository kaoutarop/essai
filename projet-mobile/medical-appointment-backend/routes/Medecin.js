const express = require('express');
const router = express.Router();
const Medecin = require('../models/Medecin');

// Créer un nouveau médecin
router.post('/', async (req, res) => {
  try {
    const medecin = new Medecin(req.body);
    await medecin.save();
    res.status(201).send(medecin);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Obtenir tous les médecins
router.get('/', async (req, res) => {
  try {
    const medecins = await Medecin.find();
    res.status(200).json(medecins);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Obtenir un médecin par ID
router.get('/:id', async (req, res) => {
  try {
    const medecin = await Medecin.findById(req.params.id);
    if (!medecin) return res.status(404).send('Médecin non trouvé');
    res.status(200).json(medecin);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Mettre à jour un médecin
router.put('/:id', async (req, res) => {
  try {
    const medecin = await Medecin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medecin) return res.status(404).send('Médecin non trouvé');
    res.status(200).json(medecin);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Supprimer un médecin
router.delete('/:id', async (req, res) => {
  try {
    const medecin = await Medecin.findByIdAndDelete(req.params.id);
    if (!medecin) return res.status(404).send('Médecin non trouvé');
    res.status(200).send('Médecin supprimé');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
