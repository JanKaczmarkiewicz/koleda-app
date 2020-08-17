import { ApolloClient, InMemoryCache } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "@apollo/react-hooks";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
