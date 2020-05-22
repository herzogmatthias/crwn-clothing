import React from "react";
import { gql, ApolloCurrentQueryResult } from "apollo-boost";
import { Query } from "react-apollo";
import Spinner from "../spinner/spinner.component";
import { ISection } from "../../redux/directory/ISection";
import { ICategory } from "../../redux/shop/ICategory";
import CollectionsOverview from "./collections-overview.component";

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => {
  return (
    <Query query={GET_COLLECTIONS}>
      {({
        loading,
        error,
        data,
      }: ApolloCurrentQueryResult<{ collections: ICategory[] }>) => {
        if (loading) return <Spinner></Spinner>;
        else {
          const collections = data!.collections;
          return (
            <CollectionsOverview
              collections={collections}
            ></CollectionsOverview>
          );
        }
      }}
    </Query>
  );
};

export default CollectionsOverviewContainer;
