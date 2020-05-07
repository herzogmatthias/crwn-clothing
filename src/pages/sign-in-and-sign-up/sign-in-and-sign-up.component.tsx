import * as React from "react";
import { SignIn } from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./sign-in-and-sign-up.styles.scss";

export interface ISignInAndSignUpProps {}

export function SignInAndSignUp(props: ISignInAndSignUpProps) {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn></SignIn>
      <SignUp></SignUp>
    </div>
  );
}
