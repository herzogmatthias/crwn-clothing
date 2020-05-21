import * as React from "react";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { RootState } from "../../redux/root-reducer";
import { ConnectedProps, connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header.styles";
import CurrentUserContext from "../../contexts/current-user/current-user.context";
import { constants } from "os";
import CartContext from "../../contexts/cart/cart.context";

interface ISelectorProps {
  hidden: boolean;
}

type IHeaderProps = ConnectedProps<typeof connector>;

function Header(props: IHeaderProps) {
  const currentUser = React.useContext(CurrentUserContext);

  const [hidden, setHidden] = React.useState(true);

  const toggleHidden = () => {
    setHidden(!hidden);
  };

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
        <CartContext.Provider value={{ hidden, toggleHidden }}>
          <CartIcon></CartIcon>
        </CartContext.Provider>
      </OptionsContainer>
      {hidden ? null : <CartDropdown></CartDropdown>}
    </HeaderContainer>
  );
}
const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  hidden: selectCartHidden,
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(Header);
