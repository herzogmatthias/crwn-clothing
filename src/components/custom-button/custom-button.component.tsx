import * as React from "react";
import "./custom-button.styles.scss";

export interface ICustomButtonProps {
  children: string;
  onClick?(): void;
  type?: "button" | "submit" | "reset" | undefined;
}

export function CustomButton({ children, ...otherProps }: ICustomButtonProps) {
  return (
    <button className="custom-button" {...otherProps}>
      {children}
    </button>
  );
}
