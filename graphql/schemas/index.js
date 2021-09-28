const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    username: String!
    password: String
    catchedPokemons: [Pokemon!]
    createdAt: String!
    updatedAt: String!
  }

  type Ability {
    name: String!
  }

  type PokemonAbility {
    ability: Ability!
  }

  type PokemonDetail {
    name: String!
    abilities: [PokemonAbility!]
  }

  type Pokemon {
    _id: ID!
    nickname: String!
    refId: String!
    catchedBy: User!
    detail: PokemonDetail!
    createdAt: String!
    updatedAt: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    expiredAt: String!
  }

  input UserInput {
    email: String!
    username: String!
    password: String!
  }

  input PokemonInput {
    nickname: String!
    refId: String!
  }

  type Query {
    pokemons: [Pokemon!]!
    users: [User!]!
    getProfile: User!
    login(userID: String!, password: String!): AuthData
  }

  type Mutation {
    signUp(input: UserInput): User
    catchPokemon(input: PokemonInput): Pokemon
    releasePokemon(nickname: String!): Pokemon
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);
