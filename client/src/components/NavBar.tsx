import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<nav>
			<Link to='/'>Home</Link>
			<Link to='/store'>Store</Link>
		</nav>
	);
}
