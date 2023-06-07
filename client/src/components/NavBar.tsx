import { NavLink } from "react-router-dom";

export default function NavBar() {
	return (
		<nav>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/store'>Store</NavLink>
			<NavLink to='/control-panel'>Control Panel</NavLink>
		</nav>
	);
}
