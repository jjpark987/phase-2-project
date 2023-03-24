import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav id="nav">
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/recipes">Recipes</NavLink>
            <NavLink to="/recipes/new">Add Recipe</NavLink>
        </nav>
    );
}

export default NavBar;
