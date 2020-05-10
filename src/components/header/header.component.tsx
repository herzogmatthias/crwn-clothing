import * as React from "react";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { RootState } from "../../redux/root-reducer";
import { ConnectedProps, connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { IUserAuth } from "../../IUserAuth";
import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header.styles";

interface ISelectorProps {
  currentUser: null | IUserAuth;
  hidden: boolean;
}

type IHeaderProps = ConnectedProps<typeof connector>;

function Header({ currentUser, hidden }: IHeaderProps) {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo"></Logo>
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signIn">SIGN IN</OptionLink>
        )}
        <CartIcon></CartIcon>
      </OptionsContainer>
      {hidden ? null : <CartDropdown></CartDropdown>}
    </HeaderContainer>
  );
}
const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(Header);
