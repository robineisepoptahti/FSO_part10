import { gql } from "@apollo/client";

export const POST_CREDENTIALS = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
