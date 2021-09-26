const { formatDate } = require('./generalHelper');
const { getUserById } = require('../resources/userResource');
const { getPokemonsByIds } = require('../resources/pokemonResource');
const { getDetail } = require('../resources/pokedex');

const transformPokemon = (pokemon) => ({
  ...pokemon._doc,
  detail: getDetail.bind(this, 'pokemon', pokemon._doc.refId),
  createdAt: formatDate(pokemon.createdAt),
  updatedAt: formatDate(pokemon.updatedAt),
  catchedBy: getUserById.bind(this, pokemon._doc.catchedBy),
});

const transformUser = (user) => ({
  ...user._doc,
  createdAt: formatDate(user.createdAt),
  updatedAt: formatDate(user.updatedAt),
  catchedPokemons: getPokemonsByIds.bind(this, user._doc.catchedPokemons),
});

module.exports = {
  transformPokemon,
  transformUser,
};
