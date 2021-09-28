const Pokemon = require('../models/pokemon');
const { formatDate } = require('../utils/generalHelper');
const { getDetail } = require('./pokedex');
const { getUserById } = require('./userResource');

const getPokemonsByIds = async (pokemonIds) => {
  try {
    const pokemons = await Pokemon.find({ _id: { $in: pokemonIds } });
    return pokemons.map((pokemon) => ({
      ...pokemon._doc,
      detail: getDetail.bind(this, 'pokemon', pokemon._doc.refId),
      createdAt: formatDate(pokemon.createdAt),
      updatedAt: formatDate(pokemon.updatedAt),
      catchedBy: getUserById.bind(this, pokemon._doc.catchedBy),
    }));
  } catch (error) {
    return error;
  }
};

module.exports = {
  getPokemonsByIds,
};
