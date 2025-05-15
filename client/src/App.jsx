import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import "./css/App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import React from "react";

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Define errorLink before using it in ApolloClient setup
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED") {
        console.warn("Token expired or invalid. Redirecting to homepage.");
        localStorage.removeItem("id_token");
        window.location.href = "/";
      }
    }
  }

  if (networkError && networkError.statusCode === 401) {
    console.warn("401 Unauthorized. Redirecting.");
    localStorage.removeItem("id_token");
    window.location.href = "/";
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]), // Order matters
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
