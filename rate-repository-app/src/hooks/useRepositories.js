import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    // Other options
  });

  console.log("useQuery called:", { data, loading, error });
  if (error) {
    console.error("GraphQL Error:", error);
  }

  return {
    repositories: data?.repositories,
    loading,
    error,
  };
};

export default useRepositories;
