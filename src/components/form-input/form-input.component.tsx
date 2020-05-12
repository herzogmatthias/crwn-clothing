import * as React from "react";
import {
  GroupContainer,
  FormInputContainer,
  FormInputLabelContainer,
} from "./form-input.styles";

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
    <GroupContainer>
      <FormInputContainer
        onChange={handleChange}
        {...otherProps}
      ></FormInputContainer>
      {label ? (
        <FormInputLabelContainer length={otherProps.value.length}>
          {label}
        </FormInputLabelContainer>
      ) : null}
    </GroupContainer>
  );
}
