import React from "react";
import { Link } from "react-router-dom";

function RecipeItem({ recipe }) {
    return (
        <div>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.titleCapitalized}</h3>
            <a href={recipe.sourceUrl}>Go to the recipe website!</a>
            <br/>
            <Link to={`/recipes/${recipe.id}`}>See details</Link>
        </div>
    );
}

export default RecipeItem;
