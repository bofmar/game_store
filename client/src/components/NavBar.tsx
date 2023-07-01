import { NavLink } from "react-router-dom";
import logo from '../assets/images/logo.png'
import cart from '../assets/images/shopping-cart-svgrepo-com.svg'

export default function NavBar() {
	return (
		<nav>
			<section className="nav-image-section">
				<NavLink to='/'><img src={logo} alt='gamesplanet logo' /></NavLink>
			</section>
			<section className="nav-search-section">
			{/* TODO add functionality to the search bar*/}
				<form className="nav-search-form">
					<input type="text" placeholder="Search..."/>
				</form>
			</section>
			<section className="nav-controls-section">
				<NavLink to='/store'>Store</NavLink>
				<NavLink to='/'><img src={cart} alt='shopping cart' className="cart-icon" /></NavLink>
			</section>
		</nav>
	);
}
