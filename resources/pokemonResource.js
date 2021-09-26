const Pokemon = require('../models/pokemon');

const getPokemonsByIds = (pokemonIds) => Pokemon.find({ _id: { $in: pokemonIds } });

module.exports = {
  getPokemonsByIds,
};
