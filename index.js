
const express = require('express');
const { connect } = require('./utils/db');
const Movie = require('./models/Movie');

const PORT = 3000;
const server = express();

server.use(express.json());

// Obtener todas las películas
server.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Obtener una película por su ID
server.get('/movies/id/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json('No movie found by this id');
    }

    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Obtener películas por título
server.get('/movies/title/:title', async (req, res) => {
  try {
    const movie = await Movie.find({ title: req.params.title });
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Obtener películas por género
server.get('/movies/genre/:genre', async (req, res) => {
  try {
    const movies = await Movie.find({ genre: req.params.genre });
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Obtener películas estrenadas a partir de 2010
server.get('/movies/year/:year', async (req, res) => {
  try {
    const year = Number(req.params.year);

    const movies = await Movie.find({
      year: { $gte: year },
    });

    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Iniciar servidor y conectar con MongoDB
const startServer = async () => {
  try {
    await connect();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
