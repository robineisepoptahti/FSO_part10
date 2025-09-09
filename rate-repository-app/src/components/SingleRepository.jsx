import { useParams } from "react-router-native";
import { Pressable, View, FlatList, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import * as Linking from "expo-linking";
import { format } from "date-fns";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "grey",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
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

const ReviewItem = ({ review }) => {
  // Single review item
  const date = format(new Date(review.createdAt), "dd.MM.yyyy");
  return (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <View
        style={{
          borderColor: "blue",
          height: 40,
          width: 40,
          borderRadius: 20,
          borderWidth: 3,
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <Text fontWeight="bold" color={"blue"}>
          {review.rating}
        </Text>
      </View>
      <View>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="gray">{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const first = 3;
  const { id, loading, error } = useParams();
  console.log("Item activated!!!!!!!!!!!!!!");
  const { repository, fetchMore } = useRepository(id, first);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error</Text>;
  }
  if (!repository) {
    return null;
  }
  const onEndReach = () => {
    fetchMore();
  };
  return (
    <FlatList
      data={repository.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
