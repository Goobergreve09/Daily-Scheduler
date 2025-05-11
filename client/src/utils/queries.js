import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedBooks
      savedMovies
      savedWatchlist
    }
  }
`;

export const QUERY_MOVIE = gql`
  query movie {
    me {
      _id
      username
      email
      savedMovies {
        movieId
        title
        image
        movieLength
      }
    }
  }
`;

export const QUERY_WATCHLIST = gql`
  query watchlist {
    me {
      _id
      username
      email
      savedWatchlist {
        movieId
        image
        title
        movieLength
        createdAt
      }
    }
  }
`;