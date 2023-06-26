import { NavLink } from "react-router-dom";
import logo from '../assets/images/logo.png'

export default function NavBar() {
	return (
		<nav>
			<section className="nav-image-section">
				<NavLink to='/'><img src={logo} /></NavLink>
			</section>
			<section className="nav-search-section">
			{/* TODO add functionality to the search bar*/}
				<form className="nav-search-form">
					<input type="text" placeholder="Search..."/>
				</form>
			</section>
			<section className="nav-controls-section">
				<NavLink to='/store'>Store</NavLink>
				<NavLink to='/control-panel'>Control Panel</NavLink>
			</section>
		</nav>
	);
}
