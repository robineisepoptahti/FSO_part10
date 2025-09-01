import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import { POST_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Owner name missing."),
  repositoryName: yup.string().required("Repository's name missing."),
  rating: yup
    .number("Rating nota anumber between 0-100")
    .required()
    .min(0)
    .max(100),
  text: yup.string().optional(),
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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const ReviewFormInputs = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View>
      {/* OWNER NAME */}

      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        style={[
          styles.inputBox,
          formik.touched.ownerName &&
            formik.errors.ownerName && { borderColor: "#d73a4a" },
        ]}
      ></TextInput>
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: "#d73a4a", padding: 10 }}>
          {formik.errors.ownerName}
        </Text>
      )}

      {/* REPO NAME */}
      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        style={[
          styles.inputBox,
          formik.touched.repositoryName &&
            formik.errors.repositoryName && { borderColor: "#d73a4a" },
        ]}
      ></TextInput>
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: "#d73a4a", padding: 10 }}>
          {formik.errors.repositoryName}
        </Text>
      )}

      {/* RATING */}

      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        style={[
          styles.inputBox,
          formik.touched.rating &&
            formik.errors.rating && { borderColor: "#d73a4a" },
        ]}
      ></TextInput>
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: "#d73a4a", padding: 10 }}>
          {formik.errors.rating}
        </Text>
      )}

      {/* TEXT */}

      <TextInput
        multiline={true}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        style={[
          styles.inputBox,
          formik.touched.text &&
            formik.errors.text && { borderColor: "#d73a4a" },
        ]}
      ></TextInput>
      {formik.touched.text && formik.errors.text && (
        <Text style={{ color: "#d73a4a", padding: 10 }}>
          {formik.errors.text}
        </Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [mutate, result] = useMutation(POST_REVIEW, {
    fetchPolicy: "no-cache",
  });

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName: ownerName,
            repositoryName: repositoryName,
            rating: Number(rating),
            text: text,
          },
        },
      });
      if (data && data.createReview && data.createReview.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewFormInputs onSubmit={onSubmit}></ReviewFormInputs>;
};

export default ReviewForm;
