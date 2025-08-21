import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import Constants from "expo-constants";
import { setContext } from "@apollo/client/link/context";
import { connectApolloClientToVSCodeDevTools } from "@apollo/client-devtools-vscode";

const httpLink = createHttpLink({
  uri: Constants.expoConfig.extra.env,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken
            ? `Bearer ${accessToken.replace(/"/g, "")}`
            : "",
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
  if (process.env.NODE_ENV === "development") {
    const devtoolsRegistration = connectApolloClientToVSCodeDevTools(
      client,
      "ws://10.69.102.250:7095"
    );
  }
  return client;
};

export default createApolloClient;
