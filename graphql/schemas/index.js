const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    username: String!
    password: String
    catchedPokemons: [UserPokemon!]
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
    id: String!
    name: String!
    abilities: [PokemonAbility!]
  }

  type UserPokemon {
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
    userPokemon: [UserPokemon!]!
    pokemons(page: Int!, limit: Int): [PokemonDetail!]!
    users: [User!]!
    getProfile: User!
    login(userID: String!, password: String!): AuthData
  }

  type Mutation {
    signUp(input: UserInput): User
    catchPokemon(input: PokemonInput): UserPokemon
    releasePokemon(nickname: String!): UserPokemon
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);
