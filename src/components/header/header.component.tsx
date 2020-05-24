import * as React from "react";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { default as CartIcon } from "../cart-icon/cart-icon.component";
import { default as CartDropdown } from "../cart-dropdown/cart-dropdown.component";
import { IUserAuth } from "../../IUserAuth";
import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header.styles";
import { useQuery } from "react-apollo";
import { GET_CART_HIDDEN, GET_CURRENT_USER } from "../../graphql/queries";

interface IHeaderProps {
  hidden?: Boolean;
  currentUser?: IUserAuth | null;
}

function Header(props: IHeaderProps) {
  const { cartHidden } = useQuery<{ cartHidden: boolean }, {}>(
    GET_CART_HIDDEN
  ).data!;
  const { currentUser } = useQuery<{ currentUser: IUserAuth | null }, {}>(
    GET_CURRENT_USER
  ).data!;

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
      {cartHidden ? null : <CartDropdown></CartDropdown>}
    </HeaderContainer>
  );
}

export default Header;
