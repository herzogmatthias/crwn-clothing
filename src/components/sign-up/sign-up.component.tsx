import * as React from "react";
import { ISignUpInfo } from "./ISignUpInfo";
import FormInput from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";
import { TitleContainer, SignUpContainer } from "./sign-up.styles";
import { signUpStart } from "../../redux/user/user.actions";
import { ConnectedProps, connect } from "react-redux";

type ISignUpProps = ConnectedProps<typeof connector>;

export function SignUp({ signUpStart }: ISignUpProps) {
  const [signUpInfo, setSignUpInfo] = React.useState<ISignUpInfo>({
    displayName: "",
    confirmPassword: "",
    email: "",
    password: "",
  });
  const { email, password, displayName, confirmPassword } = signUpInfo;

  const _handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword && password != "") {
      alert("passwords don't match");
      return;
    }
    signUpStart(signUpInfo);
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

const mapDispatchToProps = {
  signUpStart: signUpStart,
};

const connector = connect(null, mapDispatchToProps);

export default connect(null, mapDispatchToProps)(SignUp);
