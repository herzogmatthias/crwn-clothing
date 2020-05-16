import { selectIsCollectionLoaded } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";

interface ISelectorProps {
  isLoading: boolean;
}

const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  isLoading: (state) => !selectIsCollectionLoaded(state),
});

const CollectionPageContainer = compose(
  connect(mapStateToProps, {}),
  WithSpinner
)(CollectionPage);
export default CollectionPageContainer as React.FunctionComponent<any>;
