import { ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";
console.log("Apollo URI:", Constants.expoConfig.extra.env);
const createApolloClient = () => {
  return new ApolloClient({
    uri: Constants.expoConfig.extra.env,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
