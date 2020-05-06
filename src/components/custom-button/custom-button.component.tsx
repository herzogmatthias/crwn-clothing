import * as React from "react";
import "./custom-button.styles.scss";

export interface ICustomButtonProps {
  children: string;
  onClick?(): void;
  type?: "button" | "submit" | "reset" | undefined;
  isGoogleSignIn: boolean;
}

export function CustomButton({
  children,
  isGoogleSignIn,
  ...otherProps
}: ICustomButtonProps) {
  return (
    <button
      className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

CustomButton.defaultProps = {
  isGoogleSignIn: false,
} as Partial<ICustomButtonProps>;
