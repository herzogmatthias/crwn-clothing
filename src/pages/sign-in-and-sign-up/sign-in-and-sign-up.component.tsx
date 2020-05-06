import * as React from "react";
import { SignIn } from "../../components/sign-in/sign-in.component";

export interface ISignInAndSignUpProps {}

export function SignInAndSignUp(props: ISignInAndSignUpProps) {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn></SignIn>
    </div>
  );
}
