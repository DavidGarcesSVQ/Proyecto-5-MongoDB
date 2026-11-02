
const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

// Obtener una película por su ID
router.get('/id/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ error: 'No se ha encontrado la película' });
    }

    return res.status(200).json(movie);
  } catch (err) {
    return res.status(400).json({ error: 'ID de película no válido' });
  }
});

// Obtener películas por título
router.get('/title/:title', async (req, res) => {
  try {
    const movies = await Movie.find({ title: req.params.title });
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ error: 'Error al buscar por título' });
  }
});

// Obtener películas por género
router.get('/genre/:genre', async (req, res) => {
  try {
    const movies = await Movie.find({ genre: req.params.genre });
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ error: 'Error al buscar por género' });
  }
});

// Obtener películas estrenadas a partir de un año
router.get('/year/:year', async (req, res) => {
  try {
    const year = Number(req.params.year);

    if (!Number.isInteger(year) || year < 1888) {
      return res.status(400).json({ error: 'Año no válido' });
    }

    const movies = await Movie.find({ year: { $gte: year } });
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ error: 'Error al buscar por año' });
  }
});


// Crear una nueva película
router.post('/', async (req, res) => {
  try {
    const { title, director, year, genre } = req.body;

    // Comprobar los campos obligatorios
    if (!title || !director || !genre) {
      return res.status(400).json({
        error: 'El título, el director y el género son obligatorios',
      });
    }

    // Validar el año si se proporciona
    if (year !== undefined && (!Number.isInteger(year) || year < 1888)) {
      return res.status(400).json({
        error: 'El año de estreno no es válido',
      });
    }

    const newMovie = new Movie({
      title,
      director,
      year,
      genre,
    });

    const savedMovie = await newMovie.save();

    return res.status(201).json(savedMovie);
  } catch (err) {
    return res.status(500).json({
      error: 'Error al crear la película',
    });
  }
});


// Modificar una película por su ID
router.put('/id/:id', async (req, res) => {
  try {
    if (!require('mongoose').isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'ID de película no válido' });
    }

    const { title, director, year, genre } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No se han enviado datos para modificar' });
    }

    if (year !== undefined && (!Number.isInteger(year) || year < 1888)) {
      return res.status(400).json({ error: 'El año de estreno no es válido' });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, year, genre },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: 'No se ha encontrado la película' });
    }

    return res.status(200).json(updatedMovie);
  } catch (err) {
    return res.status(400).json({ error: 'Error al modificar la película' });
  }
});


// Eliminar una película por su ID
router.delete('/id/:id', async (req, res) => {
  try {
    if (!require('mongoose').isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'ID de película no válido' });
    }

    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'No se ha encontrado la película' });
    }

    return res.status(200).json({
      message: 'Película eliminada correctamente',
      movie: deletedMovie,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Error al eliminar la película',
    });
  }
});


module.exports = router;

