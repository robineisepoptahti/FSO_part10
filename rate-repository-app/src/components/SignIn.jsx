import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";

const styles = StyleSheet.create({
  inputBox: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "grey",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 8,
  },
  buttonText: {
    fontWeight: "bold",

    color: "white",
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderRadius: 3,
  },
  button: {
    display: "flex",
    backgroundColor: "blue",
    borderRadius: 3,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <View>
      <TextInput
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={styles.inputBox}
      ></TextInput>

      <TextInput
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        style={styles.inputBox}
      ></TextInput>

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
