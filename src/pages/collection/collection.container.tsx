import React from "react";
import { gql, ApolloCurrentQueryResult } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";
import { Query } from "react-apollo";
import { ICategory } from "../../redux/shop/ICategory";
import Spinner from "../../components/spinner/spinner.component";
import CollectionPage from "./collection.component";

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
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

interface ICollectionPageContainerProps
  extends RouteComponentProps<{ categoryId: string }> {}

const CollectionPageContainer = ({ match }: ICollectionPageContainerProps) => {
  return (
    <Query
      query={GET_COLLECTION_BY_TITLE}
      variables={{ title: match.params.categoryId }}
    >
      {({
        loading,
        data,
      }: ApolloCurrentQueryResult<{ getCollectionsByTitle: ICategory }>) => {
        if (loading) return <Spinner></Spinner>;
        else {
          const { getCollectionsByTitle } = data!;
          return (
            <CollectionPage collection={getCollectionsByTitle}></CollectionPage>
          );
        }
      }}
    </Query>
  );
};

export default CollectionPageContainer;
