import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  TitleContainer,
  SubtitleContainer,
} from "./menu-item.styles";

export interface IMenuItemProps extends RouteComponentProps<{}> {
  title: string;
  imageUrl: string;
  linkUrl: string;
  size?: string;
}

export function MenuItem({
  title,
  imageUrl,
  size,
  history,
  linkUrl,
  match,
}: IMenuItemProps) {
  return (
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <BackgroundImageContainer url={imageUrl}></BackgroundImageContainer>
      <ContentContainer className="content">
        <TitleContainer className="title">{title.toUpperCase()}</TitleContainer>
        <SubtitleContainer className="subtitle">SHOP NOW</SubtitleContainer>
      </ContentContainer>
    </MenuItemContainer>
  );
}

export default withRouter(MenuItem);
