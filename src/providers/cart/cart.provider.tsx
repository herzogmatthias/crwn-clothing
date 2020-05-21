import React, { createContext, useEffect } from "react";
import { ICartProvider } from "./ICartProvider";
import { ICartItem } from "../../redux/cart/ICartItem";
import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
  getTotalPrice,
} from "../../redux/cart/cart.utils";
import { IShopItem } from "../../redux/shop/IShopItem";

export const CartContext = createContext<ICartProvider>({
  hidden: true,
  total: 0,
  cartItems: [],
  cartItemsCount: 0,
  toggleHidden: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
});

interface ICartProviderProps {
  children: React.ReactNode;
}

const CartProvider = ({ children }: ICartProviderProps) => {
  const [hidden, setHidden] = React.useState(true);

  const [cartItems, setCartItems] = React.useState<ICartItem[]>([]);
  const [cartItemsCount, setCartItemsCount] = React.useState(0);

  const [total, setTotal] = React.useState(0);

  const toggleHidden = () => {
    setHidden(!hidden);
  };

  const addItem = (item: IShopItem) =>
    setCartItems(addItemToCart(cartItems, item));

  const removeItem = (item: ICartItem) =>
    setCartItems(removeItemFromCart(cartItems, item));
  const clearItemFromCart = (item: ICartItem) =>
    setCartItems(filterItemFromCart(cartItems, item));

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setTotal(getTotalPrice(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        total,
        addItem,
        hidden,
        toggleHidden,
        cartItems,
        cartItemsCount,
        removeItem,
        clearItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
