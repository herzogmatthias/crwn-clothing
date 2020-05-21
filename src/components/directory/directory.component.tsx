import * as React from "react";
import MenuItem from "../menu-item/menu-item.components";
import { DirectoryMenuContainer } from "./directory.styles";
import DirectoryContext from "../../contexts/directory/directory.context";

interface IDirectoryProps {}

function Directory(props: IDirectoryProps) {
  const sections = React.useContext(DirectoryContext);
  return (
    <DirectoryMenuContainer>
      {sections.map(({ id, ...sectionProps }) => {
        return <MenuItem key={id} {...sectionProps}></MenuItem>;
      })}
    </DirectoryMenuContainer>
  );
}

export default Directory;
