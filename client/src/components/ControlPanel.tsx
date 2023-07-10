import { NavLink, Outlet } from "react-router-dom";

export default function ControlPanel() {
	return (
		<div>
			<nav>
				<h1>Control Panel</h1>
				<NavLink to='games'>Manage Games</NavLink>
				<NavLink to='genres'>Manage Genres</NavLink>
				<NavLink to='publishers'>Manage Publishers</NavLink>
				<NavLink to='consoles'>Manage Consoles</NavLink>
			</nav>
			<Outlet />
		</div>
	);
}
