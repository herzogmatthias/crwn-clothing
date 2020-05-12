import * as React from "react";
import { ISignUpInfo } from "./ISignUpInfo";
import FormInput from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { TitleContainer, SignUpContainer } from "./sign-up.styles";

export interface ISignUpProps {}

export default function SignUp(props: ISignUpProps) {
  const [signUpInfo, setSignUpInfo] = React.useState<ISignUpInfo>({
    displayName: "",
    confirmPassword: "",
    email: "",
    password: "",
  });
  const { email, password, displayName, confirmPassword } = signUpInfo;

  const _handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      setSignUpInfo({
        email: "",
        displayName: "",
        confirmPassword: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSignUpInfo((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <SignUpContainer>
      <TitleContainer>I do not have an account</TitleContainer>
      <span>Sign up with your email and password</span>
      <form onSubmit={_handleSubmit}>
        <FormInput
          handleChange={_handleChange}
          type="text"
          name="displayName"
          value={displayName}
          label="Diplay Name"
          required
        ></FormInput>
        <FormInput
          handleChange={_handleChange}
          type="email"
          name="email"
          value={email}
          label="Email"
          required
        ></FormInput>
        <FormInput
          handleChange={_handleChange}
          type="password"
          name="password"
          value={password}
          label="Password"
          required
        ></FormInput>
        <FormInput
          handleChange={_handleChange}
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          label="Confirm Password"
          required
        ></FormInput>
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  );
}
