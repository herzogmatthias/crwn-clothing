import * as React from "react";
import "./collections-overview.styles.scss";
import { connect, ConnectedProps } from "react-redux";
import { ICategory } from "../../redux/shop/ICategory";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { selectShopCollections } from "../../redux/shop/shop.selectors";
import { CollectionPreview } from "../preview-collection/collection-preview.component";

interface ISelectorProps {
  collections: ICategory[];
}

type ICollectionsOverviewProps = ConnectedProps<typeof connector>;

function CollectionsOverview({ collections }: ICollectionsOverviewProps) {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }: ICategory) => {
        return (
          <CollectionPreview
            key={id}
            {...otherCollectionProps}
          ></CollectionPreview>
        );
      })}
    </div>
  );
}
const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  collections: selectShopCollections,
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(CollectionsOverview);
