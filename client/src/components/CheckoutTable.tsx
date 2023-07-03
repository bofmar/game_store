import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutTable() {
	const Cart = useContext(CartContext);
	const navigate = useNavigate();

	return (
		<>
			{Cart && Cart.cartItems.length > 0 ?
			<div>
				<table className="checkout-table">
					{Cart.cartItems.map((item, index) => (
						<tr key={index}>
							<td>{item.title}</td>
							<td>{item.publisher.name}</td>
							<td>{item.price}€</td>
							<td><button onClick={() => Cart.removeFromCart(index)}>Remove</button></td>
						</tr>
					))}
					<tr>
						<td></td>
						<td>Total:</td>
						<td>{Cart.cartItems.reduce((total, item) => {
								return total + item.price;
							},0)}€</td>
					</tr>
				</table> 
				<button className="orange-button">Procceed to checkout</button>
			</div> :
			<div>
				<p>There are no items in your cart currently</p>
				<button className="orange-button" onClick={() => navigate('/store')}>Back to the store</button>
			</div>}
		</>
	);
}
