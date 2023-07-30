import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar mb-3 border border-dark customNavbar">
			<Link className="navbar-brand" to="/">
				<span className="m-3 fs-2 fw-bold border border-2 border-dark p-2 ps-1 rounded text-dark" style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}>Contact List</span>
			</Link>
			<div className="ms-auto">
				<Link to="/gestionarContacto">
					<button className="btn btn-dark m-3">Add Contacts</button>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar