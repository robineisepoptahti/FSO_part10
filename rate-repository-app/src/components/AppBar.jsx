import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // ...
  },
  // ...
});

const AppBar = () => {
  console.log("BVDFG");
  return (
    <View style={[styles.container, theme.backgrounds.bar]}>
      <Pressable style={theme.backgrounds.bars}>
        <Text style={{ color: "white", fontWeight: "bold", padding: 8 }}>
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
