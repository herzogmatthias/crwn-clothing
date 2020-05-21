import * as React from "react";
import "./spinner.styles.scss";

export interface ISpinnerProps {}

export default function Spinner(props: ISpinnerProps) {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container" />
    </div>
  );
}
