import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";
import { connect } from "react-redux";
import { compose } from "redux";

interface ISelectorProps {
  isLoading: boolean;
}

const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  isLoading: selectIsCollectionFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps, {}),
  WithSpinner
)(CollectionsOverview);
export default CollectionsOverviewContainer as React.FunctionComponent<any>;
