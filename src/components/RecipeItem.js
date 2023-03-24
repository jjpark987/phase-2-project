import React from "react";
import { Link } from "react-router-dom";

function RecipeItem({ recipe }) {
    return (
        <div className="item">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.titleCapitalized}</h3>
            <Link to={`/recipes/${recipe.id}`}>See details</Link>
        </div>
    );
}

export default RecipeItem;
