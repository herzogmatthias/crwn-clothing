import React from "react";
import { gql, ApolloCurrentQueryResult } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";
import { Query } from "react-apollo";
import { ICategory } from "../../redux/shop/ICategory";
import Spinner from "../../components/spinner/spinner.component";
import CollectionPage from "./collection.component";
import { GET_COLLECTION_BY_TITLE } from "../../graphql/queries";

interface ICollectionPageContainerProps
  extends RouteComponentProps<{ categoryId: string }> {}

const CollectionPageContainer = (props: ICollectionPageContainerProps) => {
  return (
    <Query
      query={GET_COLLECTION_BY_TITLE}
      variables={{ title: props.match.params.categoryId }}
    >
      {({
        loading,
        data,
      }: ApolloCurrentQueryResult<{ getCollectionsByTitle: ICategory }>) => {
        if (loading) return <Spinner></Spinner>;
        else {
          const { getCollectionsByTitle } = data!;
          return (
            <CollectionPage
              {...props}
              collection={getCollectionsByTitle}
            ></CollectionPage>
          );
        }
      }}
    </Query>
  );
};

export default CollectionPageContainer;
