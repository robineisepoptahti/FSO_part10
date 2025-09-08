import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // ...
  },
  // ...
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });
  console.log(data);
  const signOut = async () => {
    console.log("Sign out started");
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return (
    <View
      style={{
        ...styles.container,
        ...theme.backgrounds.bar,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ScrollView horizontal>
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
          {data && data.me ? (
            <Pressable onPress={() => signOut()}>
              <Text style={{ color: "white", fontWeight: "bold", padding: 8 }}>
                Sign out
              </Text>
            </Pressable>
          ) : (
            <Link to="/signin">
              <Text style={{ color: "white", fontWeight: "bold", padding: 8 }}>
                Sign in
              </Text>
            </Link>
          )}
        </View>
        {data && data.me ? (
          <View style={[(display = "flex"), (flexDirection = "column")]}>
            <Pressable style={theme.backgrounds.bar}>
              <Link to="/createreview">
                <Text
                  style={{ color: "white", fontWeight: "bold", padding: 8 }}
                >
                  Create review
                </Text>
              </Link>
            </Pressable>
          </View>
        ) : null}

        {data && data.me ? (
          <View style={[(display = "flex"), (flexDirection = "column")]}>
            <Pressable style={theme.backgrounds.bar}>
              <Link to="/myreviews">
                <Text
                  style={{ color: "white", fontWeight: "bold", padding: 8 }}
                >
                  My reviews
                </Text>
              </Link>
            </Pressable>
          </View>
        ) : null}

        {data?.me ? null : (
          <View style={[(display = "flex"), (flexDirection = "column")]}>
            <Pressable style={theme.backgrounds.bar}>
              <Link to="/signup">
                <Text
                  style={{ color: "white", fontWeight: "bold", padding: 8 }}
                >
                  Sign up
                </Text>
              </Link>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
