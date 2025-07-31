import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

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
    <View
      style={{
        ...styles.container,
        ...theme.backgrounds.bar,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View style={[(display = "flex"), (flexDirection = "column")]}>
        <Pressable style={theme.backgrounds.bar}>
          <Link to="/">
            <Text style={{ color: "white", fontWeight: "bold", padding: 8 }}>
              Repositories
            </Text>
          </Link>
        </Pressable>
      </View>
      <View style={[(display = "flex"), (flexDirection = "column")]}>
        <Pressable style={theme.backgrounds.bar}>
          <Link to="/signin">
            <Text style={{ color: "white", fontWeight: "bold", padding: 8 }}>
              Sign in
            </Text>
          </Link>
        </Pressable>
      </View>
    </View>
  );
};

export default AppBar;
