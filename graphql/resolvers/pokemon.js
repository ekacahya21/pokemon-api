const { Types } = require('mongoose');

const Pokemon = require('../../models/pokemon');
const { transformPokemon } = require('../../utils/transformers');
const { getUserById } = require('../../resources/userResource');
const { validateAuth } = require('../../utils/authHelper');

const pokemons = async () => {
  try {
    const fetchPokemon = await Pokemon.find();
    return fetchPokemon.map((pokemon) => transformPokemon(pokemon));
  } catch (error) {
    return error;
  }
};

const catchPokemon = async ({ input }, req) => {
  try {
    await validateAuth(req);

    const { userId } = req;
    const findUser = Types.ObjectId.isValid(userId) && (await getUserById(userId));
    if (!findUser) {
      throw new Error('User is not exists');
    }

    const pokemonExists = await Pokemon.findOne({ nickname: input.nickname.toLowerCase() });
    if (pokemonExists) {
      throw new Error('Pick other nickname!');
    }

    const pokemon = new Pokemon({
      nickname: input.nickname.toLowerCase(),
      refId: input.refId,
      catchedBy: userId,
    });
    const savedPokemon = await pokemon.save();

    // * map with user
    findUser.catchedPokemons.push(pokemon);
    await findUser.save();

    return savedPokemon;
  } catch (error) {
    return error;
  }
};

const releasePokemon = async (args, req) => {
  try {
    await validateAuth(req);

    const pokemon = await Pokemon.findOne({ nickname: args.nickname }).populate('catchedBy');
    if (!pokemon) {
      throw new Error('Pokemon not found!');
    }

    await Pokemon.deleteOne({ nickname: args.nickname });
    return pokemon;
  } catch (error) {
    return error;
  }
};

module.exports = {
  pokemons,
  catchPokemon,
  releasePokemon,
};
