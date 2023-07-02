import { NavLink } from "react-router-dom";
import logo from '../assets/images/logo.png'
import cart from '../assets/images/shopping-cart-svgrepo-com.svg'
import useFetch from "../hooks/useFetch";
import { IGame } from "../types/types";
import { SERVER_URI } from "../constats";

export default function NavBar() {
	const url = `${SERVER_URI}catalog/games`;
	const {data: games} = useFetch<Array<IGame>>(url);

	return (
		<nav>
			<section className="nav-image-section">
				<NavLink to='/'><img src={logo} alt='gamesplanet logo' /></NavLink>
			</section>
			<section className="nav-search-section">
			{/* TODO add functionality to the search bar*/}
				<form className="nav-search-form">
					<input type="text" placeholder="Search..." list="game-titles"/>
					<datalist id="game-titles">
						{games && games.map(game => <option key={game._id} value={game.title}></option>)}
					</datalist>
				</form>
			</section>
			<section className="nav-controls-section">
				<NavLink to='/store'>Store</NavLink>
				<NavLink to='/'><img src={cart} alt='shopping cart' className="cart-icon" /></NavLink>
			</section>
		</nav>
	);
}
