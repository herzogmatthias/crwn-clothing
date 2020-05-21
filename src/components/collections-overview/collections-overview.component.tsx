import * as React from "react";
import { CollectionPreview } from "../preview-collection/collection-preview.component";
import { CollectionOverviewContainer } from "./collection-overview.styles";
import CollectionsContext from "../../contexts/collections/collections.context";
import { ICategory } from "../../contexts/collections/ICategory";

interface ICollectionsOverviewProps {}

function CollectionsOverview(props: ICollectionsOverviewProps) {
  const collectionsMap = React.useContext(CollectionsContext);
  const collections = Object.keys(collectionsMap).map(
    (key) => collectionsMap[key]
  );

  return (
    <CollectionOverviewContainer>
      {collections.map(({ id, ...otherCollectionProps }: ICategory) => {
        return (
          <CollectionPreview
            key={id}
            {...otherCollectionProps}
          ></CollectionPreview>
        );
      })}
    </CollectionOverviewContainer>
  );
}

export default CollectionsOverview;
