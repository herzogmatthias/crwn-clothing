import * as React from "react";
import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

export interface IWithSpinnerProps {
  isLoading: boolean;
}

const WithSpinner = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => ({ isLoading, ...otherProps }: IWithSpinnerProps & P) => {
  console.log(isLoading);
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer></SpinnerContainer>
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...(otherProps as P)} />
  );
};
export default WithSpinner;
