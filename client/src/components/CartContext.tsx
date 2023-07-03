import { createContext, useState } from "react";
import { IGame } from "../types/types";

interface ICartContextProviderProps {
	children: React.ReactNode;
}

interface ICartContext {
	cartItems: Array<IGame>;
	addToCart: (game: IGame) => void; 
	removeFromCart: (position: number) => void;
}

export const CartContext = createContext<ICartContext | null>(null);

export const CartContextProvider = ({children}: ICartContextProviderProps) => {
	const [cartItems, setCartItems] = useState<Array<IGame>>([]);

	const addToCart = (game: IGame) => {
		setCartItems(prev => [...prev, game]);
	}

	const removeFromCart = (position: number) => {
		if (cartItems.length === 0) {
			return;
		}

		const newItems = [...cartItems];
		newItems.splice(position, 1);
		setCartItems(newItems);
	}

	return <CartContext.Provider value={{cartItems, addToCart, removeFromCart}}>{children}</CartContext.Provider>
}
