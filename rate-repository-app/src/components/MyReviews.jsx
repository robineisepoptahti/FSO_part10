import { GET_ME } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import { format } from "date-fns";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "grey",
  },
});

const ReviewItem = ({ review, deleteReview }) => {
  const navigate = useNavigate();
  const date = format(new Date(review.createdAt), "dd.MM.yyyy");

  const deleteAlert = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Delete", onPress: () => deleteReview(review.id) },
      ]
    );
  };

  return (
    <View style={{ padding: 10 }}>
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
            marginBottom: 0,
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

      <View style={{ flexDirection: "row", padding: 10 }}>
        <Pressable
          style={{
            color: "blue",
            marginLeft: 10,
            marginRight: 10,
            padding: 5,
          }}
          onPress={() => {
            navigate(`/repository/${review.repository.id}`);
          }}
        >
          <Text color="iconPic" style={{ fontWeight: "bold" }}>
            Open repository
          </Text>
        </Pressable>
        <Pressable
          style={{ color: "red", marginLeft: 10, marginRight: 10, padding: 5 }}
          onPress={() => {
            deleteAlert(review.id);
          }}
        >
          <Text
            color="iconPic"
            style={{ fontWeight: "bold", backgroundColor: "red" }}
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const [mutate] = useMutation(DELETE_REVIEW, {
    fetchPolicy: "no-cache",
  });

  const { data, loading, error, refetch } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  const deleteReview = async (id) => {
    try {
      console.log("SEEENT");
      const res = await mutate({ variables: { id } });
      refetch();
    } catch (e) {
      console.log("Delete mutation error:", e);
    }
  };

  if (!data?.me?.reviews) return null;
  return (
    <View>
      <FlatList
        data={data.me.reviews.edges}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem review={item.node} deleteReview={deleteReview} />
        )}
        keyExtractor={({ node }) => node.id}
      />
    </View>
  );
};

export default MyReviews;
