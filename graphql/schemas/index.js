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

  type PokemonDetail {
    name: String!
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
  }

  type Mutation {
    catchPokemon(input: PokemonInput): Pokemon
    registerUser(input: UserInput): User
    releasePokemon(nickname: String!): Pokemon
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);
