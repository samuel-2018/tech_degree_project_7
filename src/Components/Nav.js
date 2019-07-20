import React from "react";
import { NavLink } from "react-router-dom";
const Nav = () => (
  <nav className="main-nav">
    <ul>
      <li>
        <NavLink to="/island">Islands</NavLink>
      </li>
      <li>
        <NavLink to="/sunset">Sunsets</NavLink>
      </li>
      <li>
        <NavLink to="/moon">Waterfalls</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
