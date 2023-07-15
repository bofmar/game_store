import { FormEvent, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SERVER_URI } from "../constats";
import logo from '../assets/images/logo.png'
import cart from '../assets/images/shopping-cart-svgrepo-com.svg'
import useFetch from "../hooks/useFetch";
import { CartContext } from "./CartContext";

export default function NavBar() {
	const url = `${SERVER_URI}catalog/games-names`;
	const {data: games} = useFetch<Array<{_id: string, title: string}>>(url);
	const [searchString, setSearchString] = useState('');
	const navigate = useNavigate();
	const Cart = useContext(CartContext);

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		navigate({pathname: '/store', search: `?title=${searchString}`});
	}

	return (
		<nav>
			<section className="nav-image-section center-wrapper">
				<NavLink to='/'><img src={logo} alt='gamesplanet logo' /></NavLink>
			</section>
			<section className="nav-search-section">
				<form className="nav-search-form" onSubmit={e => handleSearch(e)}>
					<input type="search" placeholder="Search..." list="game-titles" value={searchString} onChange={e => setSearchString(e.target.value)}/>
					<datalist id="game-titles">
						{games && games.map(game => <option key={game._id} value={game.title}></option>)}
					</datalist>
				</form>
			</section>
			<section className="nav-controls-section center-wrapper">
				<NavLink to='/store'>Store</NavLink>
				<NavLink to='/checkout' id="nav-cart-link">
					<img src={cart} alt='shopping cart' className="cart-icon" />
					{Cart && Cart.cartItems.length > 0 && <div className="item-count center-wrapper">{Cart?.cartItems.length}</div>}
				</NavLink>
			</section>
		</nav>
	);
}
