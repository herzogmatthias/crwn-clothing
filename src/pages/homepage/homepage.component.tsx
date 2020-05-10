import * as React from "react";
import Directory from "../../components/directory/directory.component";
import { HomePageContainer } from "./homepage.styles";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  return (
    <HomePageContainer>
      <Directory></Directory>
    </HomePageContainer>
  );
}
