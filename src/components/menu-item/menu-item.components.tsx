import * as React from "react";
import "./menu-item.styles.scss";

export interface IMenuItemProps {
  title: string;
  imageUrl: string;
  size?: string;
}

export default function MenuItem({ title, imageUrl, size }: IMenuItemProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className={`${size} menu-item`}
    >
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
}
