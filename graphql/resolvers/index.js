const userResolver = require('./auth');
const pokemonResolver = require('./pokemon');

module.exports = { ...userResolver, ...pokemonResolver };
