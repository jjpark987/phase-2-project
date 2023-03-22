import React, { useEffect } from "react";
import RecipeItem from "./RecipeItem";

function RecipesList({ recipes, onSetRecipes, onHandleDelete }) {
    useEffect(() => {
        fetch("http://localhost:3000/results")
        .then(r => r.json())
        .then(d => {
          const data = d.map(datum => {
            const { image, title, sourceUrl, servings  } = datum;
            const id = d.indexOf(datum) + 1;
            const titleCapitalized = title.split(" ").map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ");
            const instructions = datum.analyzedInstructions[0].steps.map(s => s.step);
            return { id, image, titleCapitalized, sourceUrl, servings, instructions };
          });
          onSetRecipes(data);
        })
        .catch(e => console.log(e));
      }, []);

    return (
        <div>
            <h1>Recipes</h1>
            {recipes.map(recipe => (
                <RecipeItem key={recipe.id} recipe={recipe} onHandleDelete={onHandleDelete} />
            ))}
        </div>
    );
}

export default RecipesList;
