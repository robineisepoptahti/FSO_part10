import { SignInForm } from "../components/SignIn";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        render(<SignInForm onSubmit={onSubmit}></SignInForm>);
        fireEvent.changeText(screen.getByPlaceholderText("username"), "kalle");
        fireEvent.changeText(
          screen.getByPlaceholderText("password"),
          "password"
        );
        fireEvent.press(screen.getByText("Sign in"));
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
