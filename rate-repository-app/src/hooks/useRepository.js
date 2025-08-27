import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id },
    // Other options
  });

  console.log("useQuery called:", { data, loading, error });
  if (error) {
    console.error("GraphQL Error:", error);
  }

  return {
    repository: data?.repository,
    loading,
    error,
  };
};

export default useRepository;
