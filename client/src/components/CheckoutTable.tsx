import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutTable() {
	const Cart = useContext(CartContext);
	const navigate = useNavigate();

	return (
		<>
			{Cart && Cart.cartItems.length > 0 ?
			<div className="checkout-wrapper center-wrapper-column">
				<h2>Review your purchase</h2>
				<table className="checkout-table">
					<tbody>
						{Cart.cartItems.map((item, index) => (
							<tr key={index}>
								<td>{item.title}</td>
								<td>{item.publisher.name}</td>
								<td>{item.price}€</td>
								<td><button className='remove-button' onClick={() => Cart.removeFromCart(index)}>Remove</button></td>
							</tr>
						))}
						<tr>
							<td></td>
							<td>Total:</td>
							<td id='total-price'>{new Intl.NumberFormat('en-IN', {style: 'currency', currency:'EUR'}).format(Cart.cartItems.reduce((total, item) => {
									return total + item.price;
								},0))}</td>
						</tr>
					</tbody>
				</table> 
				<button className="orange-button" onClick={() => navigate('/checkout/complete')}>Procceed to checkout</button>
			</div> :
			<div className="checkout-wrapper center-wrapper-column">
				<p>There are no items in your cart currently</p>
				<button className="orange-button" onClick={() => navigate('/store')}>Back to the store</button>
			</div>}
		</>
	);
}
