import * as React from "react";
import { IShopItem } from "../../redux/shop/IShopItem";
import CollectionItem from "../collection-item/collection-item.component";
import {
  TitleContainer,
  CollectionPreviewContainer,
  PreviewContainer,
} from "./collection-preview.styles";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface ICollectionPreviewProps extends RouteComponentProps<{}> {
  title: string;
  items: IShopItem[];
  routeName: string;
}

export function CollectionPreview({
  title,
  items,
  routeName,
  history,
  match,
}: ICollectionPreviewProps) {
  return (
    <CollectionPreviewContainer>
      <TitleContainer
        onClick={() => history.push(`${match.path}/${routeName}`)}
      >
        {title.toUpperCase()}
      </TitleContainer>
      <PreviewContainer>
        {items
          .filter((itm, index) => index < 4)
          .map((item) => {
            return <CollectionItem key={item.id} item={item}></CollectionItem>;
          })}
      </PreviewContainer>
    </CollectionPreviewContainer>
  );
}

export default withRouter(CollectionPreview);
