const express = require('express');
const router = express.Router();
const Specialty = require('../models/Specialty');

// Créer une nouvelle spécialité
router.post('/', async (req, res) => {
  try {
    const specialty = new Specialty(req.body);
    await specialty.save();
    res.status(201).send(specialty);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Obtenir toutes les spécialités
router.get('/', async (req, res) => {
  try {
    const specialties = await Specialty.find().populate('medecins');
    res.status(200).json(specialties);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Obtenir une spécialité par ID
router.get('/:id', async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id).populate('medecins');
    if (!specialty) return res.status(404).send('Spécialité non trouvée');
    res.status(200).json(specialty);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Mettre à jour une spécialité
router.put('/:id', async (req, res) => {
  try {
    const specialty = await Specialty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!specialty) return res.status(404).send('Spécialité non trouvée');
    res.status(200).json(specialty);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Supprimer une spécialité
router.delete('/:id', async (req, res) => {
  try {
    const specialty = await Specialty.findByIdAndDelete(req.params.id);
    if (!specialty) return res.status(404).send('Spécialité non trouvée');
    res.status(200).send('Spécialité supprimée');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
