import React, { ErrorInfo, ReactNode } from "react";
import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from "./error-boundary.styles";

interface IErrorBoundaryState {
  hasError: boolean;
}
interface IErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(info);
  }
  public render() {
    if (this.state.hasError) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer
            imageUrl={"https://i.imgur.com/DWO5Hzg.png"}
          ></ErrorImageContainer>
          <ErrorImageText>Sorry this page is wrong!</ErrorImageText>
        </ErrorImageOverlay>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
