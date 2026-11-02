const mongoose = require('mongoose');
const { connect } = require('./utils/db');
const Cinema = require('./models/Cinema');
const Movie = require('./models/Movie');

const seedCinemaMovies = async () => {
  try {
    await connect();

    // Obtener las películas
    const movies = await Movie.find();

    // Obtener los cines
    const cinemas = await Cinema.find();

    // Comprobar que existen datos
    if (movies.length === 0 || cinemas.length === 0) {
      throw new Error('No hay películas o cines en la base de datos');
    }

    // Asignar películas a los cines
    for (let i = 0; i < cinemas.length; i++) {
      const cinema = cinemas[i];

      // Cada cine tendrá tres películas de ejemplo
      const assignedMovies = [
        movies[i % movies.length]._id,
        movies[(i + 1) % movies.length]._id,
        movies[(i + 2) % movies.length]._id
      ];

      cinema.movies = assignedMovies;

      await cinema.save();
    }

    console.log(`Se han actualizado ${cinemas.length} cines correctamente.`);
  } catch (error) {
    console.error('Error al relacionar películas y cines:', error);
  } finally {
    await mongoose.connection.close();
  }
};

seedCinemaMovies();