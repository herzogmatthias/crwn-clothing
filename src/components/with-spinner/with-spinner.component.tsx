import * as React from "react";
import Spinner from "../spinner/spinner.component";

export interface IWithSpinnerProps {
  isLoading: boolean;
}

const WithSpinner = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => ({ isLoading, ...otherProps }: IWithSpinnerProps & P) => {
  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <WrappedComponent {...(otherProps as P)} />
  );
};
export default WithSpinner;
