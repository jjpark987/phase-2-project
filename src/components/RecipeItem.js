import React from "react";
import { Link } from "react-router-dom";

function RecipeItem({ recipe, onHandleDelete }) {
    return (
        <div>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.titleCapitalized}</h3>
            <Link to={`/recipes/${recipe.id}`}>See details</Link>
            <button type="button" onClick={() => onHandleDelete(recipe.id)}>Delete recipe</button>
        </div>
    );
}

export default RecipeItem;
