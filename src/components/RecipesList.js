import React from "react";
import RecipeItem from "./RecipeItem";

function RecipesList({ recipes }) {
    return (
        <div>
            <h1>Recipes</h1>
            {recipes.map(recipe => (
                <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export default RecipesList;
