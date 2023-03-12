import React from "react";
import Recipe from "./Recipe";

function RecipesList({ recipes }) {
    return (
        <div>
            <h1>Recipes</h1>
            {recipes.map(recipe => (
                <Recipe key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export default RecipesList;
