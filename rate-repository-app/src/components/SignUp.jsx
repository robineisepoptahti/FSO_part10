import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import { POST_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("Owner name missing.").min(5).max(30),
  password: yup.string().required("Repository's name missing.").min(5).max(50),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirmation has to match given password."),
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

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View>
      {/* Username */}

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

      {/* password */}
      <TextInput
        placeholder="pasowrd"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
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

      {/* Confirm password */}

      <TextInput
        placeholder="Confirm password"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
        style={[
          styles.inputBox,
          formik.touched.passwordConfirm &&
            formik.errors.passwordConfirm && { borderColor: "#d73a4a" },
        ]}
      ></TextInput>
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: "#d73a4a", padding: 10 }}>
          {formik.errors.passwordConfirm}
        </Text>
      )}

      {/* TEXT */}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [mutate, result] = useMutation(POST_USER, {
    fetchPolicy: "no-cache",
  });

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await mutate({
        variables: {
          user: {
            username: username,
            password: password,
          },
        },
      });
      if (data?.createUser?.username) {
        await signIn({
          username: data.createUser.username,
          password,
        });
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpForm onSubmit={onSubmit}></SignUpForm>;
};

export default SignUp;
