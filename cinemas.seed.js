
const mongoose = require('mongoose');
const { connect } = require('./utils/db');
const Cinema = require('./models/Cinema');

const cinemas = [
  // ANDALUCÍA
  {
    name: 'ARTESIETE Bahía',
    chain: 'ARTESIETE',
    city: 'El Puerto de Santa María',
    province: 'Cádiz'
  },
  {
    name: 'ARTESIETE Holea',
    chain: 'ARTESIETE',
    city: 'Huelva',
    province: 'Huelva'
  },
  {
    name: 'ARTESIETE Lucena',
    chain: 'ARTESIETE',
    city: 'Lucena',
    province: 'Córdoba'
  },
  {
    name: 'ARTESIETE Écija',
    chain: 'ARTESIETE',
    city: 'Écija',
    province: 'Sevilla'
  },
  {
    name: 'Multicines Úbeda',
    chain: 'ARTESIETE',
    city: 'Úbeda',
    province: 'Jaén'
  },
  {
    name: 'ARTESIETE Alhsur',
    chain: 'ARTESIETE',
    city: 'La Zubia',
    province: 'Granada'
  },

  // RESTO DE ESPAÑA
  {
    name: 'ARTESIETE Fan',
    chain: 'ARTESIETE',
    city: 'Palma',
    province: 'Illes Balears'
  },
  {
    name: 'ARTESIETE Las Terrazas',
    chain: 'ARTESIETE',
    city: 'Telde',
    province: 'Las Palmas'
  },
  {
    name: 'ARTESIETE Alfares',
    chain: 'ARTESIETE',
    city: 'Talavera de la Reina',
    province: 'Toledo'
  },
  {
    name: 'ARTESIETE Segovia',
    chain: 'ARTESIETE',
    city: 'Segovia',
    province: 'Segovia'
  },
  {
    name: 'ARTESIETE La Torre',
    chain: 'ARTESIETE',
    city: 'Zaragoza',
    province: 'Zaragoza'
  }
];

const seedCinemas = async () => {
  try {
    await connect();

    await Cinema.deleteMany({});

    const result = await Cinema.insertMany(cinemas);

    console.log(`Se han insertado ${result.length} cines correctamente.`);
  } catch (error) {
    console.error('Error al introducir los cines:', error);
  } finally {
    await mongoose.connection.close();
  }
};

seedCinemas();
