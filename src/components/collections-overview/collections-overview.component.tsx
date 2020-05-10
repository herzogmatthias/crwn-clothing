import * as React from "react";
import "./collections-overview.styles.scss";
import { connect, ConnectedProps } from "react-redux";
import { ICategory } from "../../redux/shop/ICategory";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { selectShopCollections } from "../../redux/shop/shop.selectors";
import { CollectionPreview } from "../preview-collection/collection-preview.component";
import { ICategoryMap } from "../../redux/shop/ICategoryMap";

interface ISelectorProps {
  collections: ICategoryMap;
}

type ICollectionsOverviewProps = ConnectedProps<typeof connector>;

function CollectionsOverview({ collections }: ICollectionsOverviewProps) {
  return (
    <div className="collections-overview">
      {Object.keys(collections).map((key: string, index: number) => {
        return (
          <CollectionPreview
            key={index}
            {...collections[key]}
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
