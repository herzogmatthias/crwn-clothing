import * as React from "react";
import { CustomButtonContainer } from "./custom-button.styles";

export interface ICustomButtonProps {
  children: string;
  onClick?(): void;
  type?: "button" | "submit" | "reset" | undefined;
  isGoogleSignIn: boolean;
  inverted: boolean;
}

export function CustomButton(props: ICustomButtonProps) {
  return (
    <CustomButtonContainer {...props}>{props.children}</CustomButtonContainer>
  );
}

CustomButton.defaultProps = {
  isGoogleSignIn: false,
  inverted: false,
} as Partial<ICustomButtonProps>;
