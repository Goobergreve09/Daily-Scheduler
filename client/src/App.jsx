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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        console.warn("Token expired or invalid.");
        localStorage.removeItem("id_token");

        // Dispatch custom event for React to listen to
        window.dispatchEvent(new Event("token-expired"));
      }
    }
  }

  if (networkError && networkError.statusCode === 401) {
    console.warn("401 Unauthorized.");
    localStorage.removeItem("id_token");
    window.dispatchEvent(new Event("token-expired"));
  }
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]), // Order matters
  cache: new InMemoryCache(),
});

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenExpired = () => {
      navigate("/"); // or navigate("/login") depending on your app
    };

    window.addEventListener("token-expired", handleTokenExpired);
    return () => {
      window.removeEventListener("token-expired", handleTokenExpired);
    };
  }, [navigate]);

  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
