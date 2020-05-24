import * as React from "react";
import {
  TitleContainer,
  CollectionPageContainer,
  ItemsContainer,
  CollectionItemContainer,
} from "./collection.styles";
import { ICategory } from "../../graphql/ICategory";
import { useQuery } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { GET_COLLECTION_BY_TITLE } from "../../graphql/queries";
import Spinner from "../../components/spinner/spinner.component";

interface ICollectionPageProps
  extends RouteComponentProps<{ categoryId: string }> {
  collection?: ICategory;
}

function CollectionPage({ match }: ICollectionPageProps) {
  const { data, loading } = useQuery<
    { getCollectionsByTitle: ICategory },
    { title: string }
  >(GET_COLLECTION_BY_TITLE, { variables: { title: match.params.categoryId } });

  if (loading) {
    return <Spinner></Spinner>;
  } else {
    console.log(data);
    const {
      getCollectionsByTitle: { title, items },
    } = data!;
    return (
      <CollectionPageContainer>
        <TitleContainer>{title}</TitleContainer>
        <ItemsContainer>
          {items.map((item) => (
            <CollectionItemContainer
              key={item.id}
              item={item}
            ></CollectionItemContainer>
          ))}
        </ItemsContainer>
      </CollectionPageContainer>
    );
  }
}

export default CollectionPage;
