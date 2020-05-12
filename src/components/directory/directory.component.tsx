import * as React from "react";
import { ISection } from "../../redux/directory/ISection";
import MenuItem from "../menu-item/menu-item.components";
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import { DirectoryMenuContainer } from "./directory.styles";

interface ISelectorProps {
  sections: ISection[];
}

type IDirectoryProps = ConnectedProps<typeof connector>;

function Directory({ sections }: IDirectoryProps) {
  return (
    <DirectoryMenuContainer>
      {sections.map(({ id, ...sectionProps }) => {
        return <MenuItem key={id} {...sectionProps}></MenuItem>;
      })}
    </DirectoryMenuContainer>
  );
}

const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  sections: selectDirectorySections,
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(Directory);
