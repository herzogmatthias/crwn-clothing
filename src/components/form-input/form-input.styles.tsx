import styled, { css } from "styled-components";

interface IFormInputLabelContainerProps {
  length: number;
}
interface IFormInputContainerProps {
  type: string;
}

const mainColor = `black`;
const subColor = `grey`;
const shrinkLabelMixin = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: 45px 0;
`;
export const FormInputLabelContainer = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${(props: IFormInputLabelContainerProps) =>
    props.length ? shrinkLabelMixin : ""}
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;
  ${(props: IFormInputContainerProps) =>
    props.type === "password" ? "letter-spacing: 0.3em;" : null}

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabelContainer} {
    ${shrinkLabelMixin}
  }
`;
