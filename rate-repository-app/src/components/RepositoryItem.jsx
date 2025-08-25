import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  flexContColumn: {
    flexDirection: "column",
    flex: 1,
    gap: 10,
  },
});

const shorten = (number) => {
  return number >= 1000 ? `${(number / 1000).toFixed(1)} k` : number;
};

const RepositoryItem = (props) => {
  const { item } = props;
  return (
    <View
      testID="repositoryItem"
      style={{ ...styles.flexContColumn, padding: 15 }}
    >
      <View style={styles.flexContRow}>
        <View>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View>
          <Text fontWeight="bold"> {item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text color="iconPic">{item.language}</Text>
        </View>
      </View>
      <View
        style={{
          ...styles.flexContRow,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <Text style={styles.flexContRow} fontWeight="bold">
            {shorten(item.stargazersCount)}
          </Text>
          <Text style={styles.flexContRow}>Stars </Text>
        </View>
        <View style={{ flexGrow: 1 }}>
          <Text style={styles.flexContRow} fontWeight="bold">
            {" "}
            {shorten(item.forksCount)}
          </Text>
          <Text style={styles.flexContRow}>Forks </Text>
        </View>
        <View style={{ flexGrow: 1 }}>
          <Text style={styles.flexContRow} fontWeight="bold">
            {shorten(item.reviewCount)}
          </Text>
          <Text style={styles.flexContRow}>Reviews</Text>
        </View>
        <View style={{ flexGrow: 1 }}>
          <Text style={styles.flexContRow} fontWeight="bold">
            {shorten(item.ratingAverage)}
          </Text>
          <Text style={styles.flexContRow}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
