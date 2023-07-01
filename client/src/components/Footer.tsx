import { NavLink } from "react-router-dom";

export default function Footer() {
	return (
		<footer>
			<div className="footer-links">
				<section className="footer-company-section">
					<h3>About us</h3>
					<NavLink to='/'>Contact us</NavLink>
					<NavLink to='/'>Stores</NavLink>
					<NavLink to='/'>Job Vacancies</NavLink>
					<NavLink to='/'>Company Profile</NavLink>
				</section>
				<section className="footer-useful-information">
					<h3>Useful Information</h3>
					<NavLink to='/'>Delivery & Pick-Up</NavLink>
					<NavLink to='/'>My GamesPlanet Card Application</NavLink>
					<NavLink to='/'>Customer Care</NavLink>
					<NavLink to='/control-panel'>Control Panel</NavLink>
				</section>
				<section className="footer-terms-section">
					<h3>Terms & Policies</h3>
					<NavLink to='/'>Privacy Policy</NavLink>
					<NavLink to='/'>Terms And Conditions</NavLink>
					<NavLink to='/'>Returns And Cancelation Policy</NavLink>
					<NavLink to='/'>Limited Warranty</NavLink>
				</section>
			</div>
		</footer>
	);
}
