
const express = require('express');
const { connect } = require('./utils/db');
const movieRoutes = require('./routes/movie.routes');
const cinemaRoutes = require('./routes/cinema.routes');

const PORT = 3000;
const server = express();

server.use(express.json());

// Ruta de películas
server.use('/movies', movieRoutes);

// Ruta de cines
server.use('/cinemas', cinemaRoutes);

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
