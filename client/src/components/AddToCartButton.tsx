import { useContext } from "react";
import { IGame } from "../types/types";
import { CartContext } from "./CartContext";

interface IAddToCartButtonProps {
	game: IGame;
}

export default function AddToCartButton({game}: IAddToCartButtonProps) {
	const Cart = useContext(CartContext);

	return <button className="orange-button" onClick={() => Cart?.addToCart(game)}>Add To Cart</button>
}
