import * as React from "react";
import { ISection } from "../../redux/directory/ISection";
import MenuItem from "../menu-item/menu-item.components";
import "./directory.styles.scss";
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

interface ISelectorProps {
  sections: ISection[];
}

type IDirectoryProps = ConnectedProps<typeof connector>;

function Directory({ sections }: IDirectoryProps) {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...sectionProps }) => {
        return <MenuItem key={id} {...sectionProps}></MenuItem>;
      })}
    </div>
  );
}

const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  sections: selectDirectorySections,
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(Directory);
