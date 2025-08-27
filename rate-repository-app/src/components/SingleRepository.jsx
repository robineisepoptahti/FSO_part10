import { useParams } from "react-router-native";
import { Pressable, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import * as Linking from "expo-linking";
import Text from "./Text";

const SingleRepository = () => {
  const { id, loading, error } = useParams();
  console.log("Item activated!!!!!!!!!!!!!!");
  const { repository } = useRepository(id);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error</Text>;
  }
  if (!repository) {
    return null;
  }
  return (
    <View style={{ flexDirection: "column", gap: 10 }}>
      <RepositoryItem item={repository}></RepositoryItem>
      <View
        style={{
          margin: 30,
          marginTop: 0,
          padding: 10,
          paddingBottom: 15,
          backgroundColor: "blue",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          borderRadius: 4,
        }}
      >
        <Pressable
          onPress={() => {
            console.log("hi");
            Linking.openURL(repository.url);
          }}
        >
          <Text color="iconPic" style={{ fontWeight: "bold" }}>
            Open in GitHub
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SingleRepository;
