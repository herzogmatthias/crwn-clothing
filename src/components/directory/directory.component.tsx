import * as React from "react";
import { ISection } from "../../graphql/ISection";
import MenuItem from "../menu-item/menu-item.components";
import { DirectoryMenuContainer } from "./directory.styles";
import { useQuery } from "react-apollo";
import { GET_SECTIONS } from "../../graphql/queries";

interface IDirectoryProps {
  sections?: ISection[];
}

function Directory(props: IDirectoryProps) {
  const { data } = useQuery<{ sections: ISection[] }, {}>(GET_SECTIONS);
  return (
    <DirectoryMenuContainer>
      {data!.sections.map(({ id, ...sectionProps }) => {
        return <MenuItem key={id} {...sectionProps}></MenuItem>;
      })}
    </DirectoryMenuContainer>
  );
}

export default Directory;
