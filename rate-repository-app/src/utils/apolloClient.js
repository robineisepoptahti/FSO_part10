import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://10.69.102.250:4000/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
