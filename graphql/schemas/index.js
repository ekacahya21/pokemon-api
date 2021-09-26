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
    login(email: String!, password: String!): AuthData! 
  }

  type Mutation {
    catchPokemon(input: PokemonInput): Pokemon
    signUp(input: UserInput): User
    releasePokemon(nickname: String!): Pokemon
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);
