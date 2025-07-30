import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import RepositoriyList from "./RepositoryList";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoriyList></RepositoriyList>
    </View>
  );
};

export default Main;
