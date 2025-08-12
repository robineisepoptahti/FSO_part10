import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          language
          reviewCount
          forksCount
          description
          stargazersCount
          ownerAvatarUrl
        }
      }
    }
  }
`;
