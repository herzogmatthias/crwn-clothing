import * as React from "react";
import { ISignInInfo } from "./ISignInInfo";
import FormInput from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";
import {
  TitleContainer,
  SignInContainer,
  ButtonsContainer,
} from "./sign-in.styles";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";
import { connect, ConnectedProps } from "react-redux";

type ISignInProps = ConnectedProps<typeof connector>;

function SignIn({ googleSignInStart, emailSignInStart }: ISignInProps) {
  const [signInInfo, setSignInInfo] = React.useState<ISignInInfo>({
    email: "",
    password: "",
  });
  const { email, password } = signInInfo;
  const _handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    emailSignInStart({ email, password });
  };

  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSignInInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <SignInContainer>
      <TitleContainer>I already have an account</TitleContainer>
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
        <ButtonsContainer>
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            isGoogleSignIn
            onClick={googleSignInStart}
          >
            Sign In with Google
          </CustomButton>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

const mapDispatchToProps = {
  googleSignInStart: googleSignInStart,
  emailSignInStart: emailSignInStart,
};

const connector = connect(null, mapDispatchToProps);

export default connect(null, mapDispatchToProps)(SignIn);
