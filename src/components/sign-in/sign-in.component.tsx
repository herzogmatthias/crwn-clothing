import * as React from "react";
import { ISignInInfo } from "./ISignInInfo";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import { CustomButton } from "../custom-button/custom-button.component";
import { signInWithGoogle, auth } from "../../firebase/firebase.utils";

export interface ISignInProps {}

export function SignIn(props: ISignInProps) {
  const [signInInfo, setSignInInfo] = React.useState<ISignInInfo>({
    email: "",
    password: "",
  });
  const { email, password } = signInInfo;
  const _handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setSignInInfo({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSignInInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={_handleSubmit}>
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={email}
          handleChange={_handleChange}
          required
        ></FormInput>
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          handleChange={_handleChange}
          required
        ></FormInput>
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton isGoogleSignIn onClick={() => signInWithGoogle()}>
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
