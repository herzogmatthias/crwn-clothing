import * as React from "react";
import "./custom-button.styles.scss";

export interface ICustomButtonProps {
  children: string;
  onClick?(): void;
  type?: "button" | "submit" | "reset" | undefined;
  isGoogleSignIn: boolean;
  inverted: boolean;
}

export function CustomButton({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}: ICustomButtonProps) {
  return (
    <button
      className={`${inverted ? "inverted" : ""} ${
        isGoogleSignIn ? "google-sign-in" : ""
      } custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

CustomButton.defaultProps = {
  isGoogleSignIn: false,
  inverted: false,
} as Partial<ICustomButtonProps>;
