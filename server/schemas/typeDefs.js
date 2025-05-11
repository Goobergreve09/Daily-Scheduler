const typeDefs = `

scalar DateTime

type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
    savedMovies: [Movie]
    savedWatchlist: [Watchlist]
  }

  type Book {
    _id: ID!
   authors: [String]
   description: String!
   bookId: String!
   image: String
   link: String
   title: String!
   rating: Float
  }

  type Movie {
    _id: ID!
   movieId: String!
   image: String
   title: String!
  movieLength: String!
  }

  type Watchlist {
    _id: ID!
    movieId: String!
    image: String
    title: String!
   movieLength: String
   createdAt: DateTime
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  input MovieInput {
    movieId: String!
    image: String
    movieLength: String
    title: String!
  }

  input WatchlistInput {
    movieId: String!
    image: String
    title: String!
   movieLength: String
   createdAt: DateTime!
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
   login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    resetPassword(email:String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
    saveMovie(movieData: MovieInput!): User
    removeMovie(movieId: ID!): User
    saveWatchlist(movieData: WatchlistInput!): User
    removeWatchlist(movieId: ID!): User
  }
`;

module.exports = typeDefs;