import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import authStorage from "../utils/authStorage";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username missing."),
  password: yup.string().required("Password missing."),
});

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
    validationSchema,
    onSubmit,
  });
  return (
    <View>
      <TextInput
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={[
          styles.inputBox,
          formik.touched.username &&
            formik.errors.username && { borderColor: "#d73a4a" },
        ]}
      ></TextInput>
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "#d73a4a", padding: 10 }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        style={[
          styles.inputBox,
          formik.touched.password &&
            formik.errors.password && { borderColor: "#d73a4a" },
        ]}
      ></TextInput>
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "#d73a4a", padding: 10 }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      if (data) {
        const user = new authStorage("auth");
        //Just demonstrating how token is stored and removed
        user.setAccessToken(data.authenticate.accessToken);
        const token = await user.getAccessToken();
        console.log(token);
        await user.removeAccessToken();
        const emptyToken = await user.getAccessToken();
        console.log(emptyToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
