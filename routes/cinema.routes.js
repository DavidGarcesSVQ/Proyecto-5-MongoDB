
const express = require('express');
const Cinema = require('../models/Cinema');

const router = express.Router();

// GET / - Obtener todos los cines
router.get('/', async (req, res) => {
  try {
    const cinemas = await Cinema.find().populate('movies');
    return res.status(200).json(cinemas);
  } catch (error) {
    return res.status(500).json({
      error: 'Error al obtener los cines'
    });
  }
});


// GET /id/:id - Buscar un cine por su ID
router.get('/id/:id', async (req, res) => {
  try {
    if (!require('mongoose').isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: 'ID de cine no válido'
      });
    }

    const cinema = await Cinema.findById(req.params.id)
      .populate('movies');

    if (!cinema) {
      return res.status(404).json({
        error: 'No se ha encontrado el cine'
      });
    }

    return res.status(200).json(cinema);

  } catch (error) {
    return res.status(500).json({
      error: 'Error al buscar el cine'
    });
  }
});


// GET /city/:city - Buscar cines por ciudad
router.get('/city/:city', async (req, res) => {
  try {
    const city = req.params.city;

    const cinemas = await Cinema.find({
      city: { $regex: new RegExp(`^${city}$`, 'i') }
    }).populate('movies');

    return res.status(200).json(cinemas);

  } catch (error) {
    return res.status(500).json({
      error: 'Error al buscar cines por ciudad'
    });
  }
});

// GET /province/:province - Buscar cines por provincia
router.get('/province/:province', async (req, res) => {
  try {
    const province = req.params.province;

    const cinemas = await Cinema.find({
      province: { $regex: new RegExp(`^${province}$`, 'i') }
    }).populate('movies');

    return res.status(200).json(cinemas);
  } catch (error) {
    return res.status(500).json({
      error: 'Error al buscar cines por provincia'
    });
  }
});

module.exports = router;
