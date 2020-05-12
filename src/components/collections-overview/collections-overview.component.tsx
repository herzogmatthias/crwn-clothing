import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { ICategory } from "../../redux/shop/ICategory";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";
import { CollectionPreview } from "../preview-collection/collection-preview.component";
import { CollectionOverviewContainer } from "./collection-overview.styles";

interface ISelectorProps {
  collections: ICategory[];
}

type ICollectionsOverviewProps = ConnectedProps<typeof connector>;

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
const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  collections: selectCollectionsForPreview,
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(CollectionsOverview);
