import * as React from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import { SignInAndSignUpContainer } from "./sign-in-and-sign-up.styles";

export interface ISignInAndSignUpProps {}

export function SignInAndSignUp(props: ISignInAndSignUpProps) {
  return (
    <SignInAndSignUpContainer>
      <SignIn></SignIn>
      <SignUp></SignUp>
    </SignInAndSignUpContainer>
  );
}
