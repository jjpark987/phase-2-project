import React from "react";
import { Link } from "react-router-dom";

function Recipe({ recipe }) {
    return (
        <div>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>{recipe.sourceUrl}</p>
            <Link to={`/recipes/${recipe.id}`}>See details</Link>
        </div>
    );
}

export default Recipe;
