import * as React from "react";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { RootState } from "../../redux/root-reducer";
import { ConnectedProps, connect } from "react-redux";
import { default as CartIcon } from "../cart-icon/cart-icon.container";
import { default as CartDropdown } from "../cart-dropdown/cart-dropdown.container";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { IUserAuth } from "../../IUserAuth";
import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header.styles";
import { useQuery } from "react-apollo";
import { GET_CART_HIDDEN } from "../../graphql/resolvers";

interface ISelectorProps {
  currentUser: null | IUserAuth;
}

type IHeaderProps = ConnectedProps<typeof connector> & {
  hidden?: Boolean;
};

function Header({ currentUser, hidden }: IHeaderProps) {
  /*
  const { loading, data } = useQuery<{ cartHidden: boolean }, {}>(
    GET_CART_HIDDEN
  );
*/
  console.log(hidden);
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
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(Header);
