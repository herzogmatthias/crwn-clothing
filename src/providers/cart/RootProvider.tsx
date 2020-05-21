import * as React from "react";
import CartProvider from "./cart.provider";

export interface IRootProviderProps {
  children: React.ReactNode;
}

export default function RootProvider({ children }: IRootProviderProps) {
  return (
    <div>
      <CartProvider>{children}</CartProvider>
    </div>
  );
}
