import { POST_CREDENTIALS } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(POST_CREDENTIALS);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    console.log({ username, password });
    const credentials = { username, password };
    const { data } = await mutate({ variables: { credentials } });
    authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    const token = await authStorage.getAccessToken();
    console.log("Got token:", token);
  };
  return [signIn, result];
};
export default useSignIn;
