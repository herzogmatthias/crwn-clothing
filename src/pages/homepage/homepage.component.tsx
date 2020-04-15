import * as React from "react";
import "./homepage.styles.scss";
import Directory from "../../components/directory/directory.component";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  return (
    <div className="homepage">
      <Directory></Directory>
    </div>
  );
}
