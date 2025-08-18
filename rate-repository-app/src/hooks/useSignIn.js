import { POST_CREDENTIALS } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(POST_CREDENTIALS);

  const signIn = async ({ username, password }) => {
    console.log({ username, password });
    const credentials = { username, password };
    const results = await mutate({ variables: { credentials } });
    return results;
  };
  return [signIn, result];
};
export default useSignIn;
