import { createContext } from "react";
import { IGame } from "../types/types";

interface ICartContextProviderProps {
	children: React.ReactNode;
}

const cartItems: Array<IGame> = [];
const CartContext = createContext(cartItems)

export const CartContextProvider = ({children}: ICartContextProviderProps) => {
	return <CartContext.Provider value={cartItems}>{children}</CartContext.Provider>
}
