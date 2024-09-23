import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" end activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/countries" activeClassName="active">
            Countries
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
