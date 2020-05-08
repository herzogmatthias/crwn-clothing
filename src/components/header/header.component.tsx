import * as React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";
import { auth } from "../../firebase/firebase.utils";
import { RootState } from "../../redux/root-reducer";
import { ConnectedProps, connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

type IHeaderProps = ConnectedProps<typeof connector>;

function Header({ currentUser, hidden }: IHeaderProps) {
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo"></Logo>
      </Link>
      <div className="options">
        <Link to="/shop">SHOP</Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signIn">
            SIGN IN
          </Link>
        )}
        <CartIcon></CartIcon>
      </div>
      {hidden ? null : <CartDropdown></CartDropdown>}
    </div>
  );
}
const mapStateToProps = ({
  user: { currentUser },
  cart: { hidden },
}: RootState) => ({
  currentUser: currentUser,
  hidden: hidden,
});

const connector = connect(mapStateToProps, null);
export default connect(mapStateToProps, null)(Header);
