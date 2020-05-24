import { flowRight } from "lodash";
import { graphql } from "react-apollo";
import { ISection } from "../../graphql/ISection";
import { GET_SECTIONS } from "../../graphql/queries";
import { ApolloCurrentQueryResult } from "apollo-boost";
import Directory from "./directory.component";
import React from "react";
import { ISectionGraphql } from "../../graphql/types";

interface IWithGraphql
  extends ApolloCurrentQueryResult<{ sections: ISectionGraphql[] }> {}

const withGraphql = ({ data }: IWithGraphql) => {
  console.log(data);
  const { sections } = data!;
  return <Directory sections={sections}></Directory>;
};

export default flowRight(
  graphql<{}, { sections: ISectionGraphql[] }>(GET_SECTIONS)
)(withGraphql);
