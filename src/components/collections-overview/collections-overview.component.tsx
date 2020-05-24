import * as React from "react";
import { ICategory } from "../../graphql/ICategory";
import CollectionPreview from "../preview-collection/collection-preview.component";
import { CollectionOverviewContainer } from "./collections-overview.styles";

interface ICollectionsOverviewProps {
  collections: ICategory[];
}

function CollectionsOverview({ collections }: ICollectionsOverviewProps) {
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
