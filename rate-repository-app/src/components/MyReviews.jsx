import { GET_ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "grey",
  },
});

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
        <Text fontWeight="bold">{review.repository.fullName}</Text>
        <Text color="gray">{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });
  if (!data?.me?.reviews) return null;
  return (
    <View>
      <FlatList
        data={data.me.reviews.edges}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item.node} />}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default MyReviews;
