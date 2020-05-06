import * as React from "react";
import "./form-input.styles.scss";

export interface IFormInputProps {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
  label: string;
  value: string;
  name: string;
  type: string;
  required: boolean;
}

export default function FormInput({
  handleChange,
  label,
  ...otherProps
}: IFormInputProps) {
  return (
    <div className="group">
      <input
        className="form-input"
        onChange={handleChange}
        {...otherProps}
      ></input>
      {label ? (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}
